async function animateScan() {
  const overlay = document.getElementById('scanOverlay');
  overlay.classList.add('active');
  const steps = ['step1','step2','step3','step4','step5'];
  for (let i = 0; i < steps.length; i++) {
    if (i > 0) document.getElementById(steps[i-1]).className = 'scan-step done';
    document.getElementById(steps[i]).className = 'scan-step active';
    await sleep(320);
  }
  await sleep(300);
  document.getElementById(steps[steps.length-1]).className = 'scan-step done';
  await sleep(200);
  overlay.classList.remove('active');
  steps.forEach(s => { document.getElementById(s).className = 'scan-step'; });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function extractIndicators(text, label) {
  const l = text.toLowerCase();
  const found = [];
  const dangerPatterns = [
    ['urgent / immediately', '/(urgent|immediately|right now|asap)/i'],
    ['suspicious URL', '/https?:\\/\\/[^\\s]+(xyz|tk|ml|click|link|net\\/login)/i'],
    ['shortened link', '/bit\\.ly|tinyurl|goo\\.gl/i'],
    ['credential request', '/(password|credentials|ssn|bank account|credit card)/i'],
    ['impersonation', '/(ceo|cfo|cto|it support|microsoft|apple|amazon|paypal|irs)/i'],
    ['fear / deadline', '/(suspend|expire|close|terminate|locked|24 hour|48 hour)/i'],
    ['money request', '/(wire transfer|gift card|purchase|send.{0,20}money)/i'],
    ['urgency pressure', '/(limited time|act now|before.{0,10}expire|last chance)/i'],
    ['prize / reward', '/(winner|won|prize|reward|gift card|selected|congratulation)/i'],
    ['caps / spam style', '/[A-Z]{4,}/'],
  ];
  dangerPatterns.forEach(([name, regStr]) => {
    try {
      const re = eval(regStr);
      if (re.test(l) || re.test(text)) found.push({ name, safe: false });
    } catch(e) {}
  });
  if (label === 0) {
    [['professional tone', /(regards|sincerely|thank you|looking forward)/i],
     ['legitimate sender', /(appointment|confirmed|shipped|delivery)/i],
     ['no suspicious links', true]
    ].forEach(([n, r]) => {
      if (r === true || r.test(l)) found.push({ name: n, safe: true });
    });
  }
  return found.slice(0, 6);
}

async function saveScanToBackend(text, finalLabel, ensembleConf, rfResult, nbResult, indicators) {
  try {
    const res = await fetch('http://localhost:3000/api/scan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        msgType,
        label:      finalLabel,
        confidence: Math.min(ensembleConf, 99),
        rfScore:    rfResult.confidence,
        nbScore:    nbResult.confidence,
        indicators: indicators.map(i => i.name),
      }),
    });
    console.log('[AEGIS] Scan saved to MongoDB ✓');
  } catch(err) {
    console.warn('[AEGIS] Backend not reachable:', err.message);
  }
}

async function runScan() {
  const text = document.getElementById('msgInput').value.trim();
  if (!text) { showAlert('⚠ PASTE A MESSAGE FIRST', 'danger'); return; }

  const btn = document.getElementById('scanBtn');
  btn.disabled = true;
  btn.classList.add('scanning');
  btn.textContent = '◌ SCANNING...';

  const scanPromise = animateScan();

  const nbResult = nb.classify(text);
  const rfResult = randomForestClassify(text);

  const labelScores = { 0:0, 1:0, 2:0, 3:0 };
  labelScores[rfResult.label] += 0.65 * rfResult.confidence;
  labelScores[nbResult.label] += 0.35 * nbResult.confidence;
  const finalLabel = parseInt(Object.keys(labelScores).reduce((a,b) => labelScores[a] > labelScores[b] ? a : b));
  const ensembleConf = Math.round(Math.max(rfResult.confidence * 0.65 + nbResult.confidence * 0.35, labelScores[finalLabel]));

  const indicators = extractIndicators(text, finalLabel);

  await scanPromise;

  stats.scanned++;
  if (finalLabel !== 0) stats.threats++; else stats.safe++;
  updateStats();

  renderResult(finalLabel, rfResult, nbResult, Math.min(ensembleConf, 99), indicators, text);
  addLog(finalLabel, text.slice(0, 50));

  const labels = ['CLEAN','PHISHING','SPAM','SOCIAL ENG'];
  if (finalLabel !== 0) {
    showAlert('🚨 THREAT DETECTED: ' + labels[finalLabel], 'danger');
  } else {
    showAlert('✓ MESSAGE CLEAN — NO THREATS', 'safe');
  }

  await saveScanToBackend(text, finalLabel, ensembleConf, rfResult, nbResult, indicators);

  btn.disabled = false;
  btn.classList.remove('scanning');
  btn.textContent = '⬡ INITIATE THREAT SCAN';
}

document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') runScan();
});
