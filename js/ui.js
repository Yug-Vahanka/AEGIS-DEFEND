/* ============================================================
   AEGIS DEFEND — ui.js
   UI Rendering, Background Animations, Custom Cursor, Helpers
   ============================================================ */

/* ============================================================
   BACKGROUND: ANIMATED HEX GRID + PARTICLES
   ============================================================ */
(function () {
  // Grid canvas
  const gc = document.getElementById('grid-canvas');
  const gctx = gc.getContext('2d');

  function resizeGrid() {
    gc.width = window.innerWidth;
    gc.height = window.innerHeight;
  }
  resizeGrid();
  window.addEventListener('resize', resizeGrid);

  let gridOffset = 0;
  function drawGrid() {
    gctx.clearRect(0, 0, gc.width, gc.height);
    const size = 44;
    gctx.strokeStyle = 'rgba(0,200,255,0.07)';
    gctx.lineWidth = 0.5;
    gridOffset = (gridOffset + 0.15) % size;

    for (let x = -size + (gridOffset % size); x < gc.width + size; x += size) {
      gctx.beginPath(); gctx.moveTo(x, 0); gctx.lineTo(x, gc.height); gctx.stroke();
    }
    for (let y = -size + (gridOffset % size); y < gc.height + size; y += size) {
      gctx.beginPath(); gctx.moveTo(0, y); gctx.lineTo(gc.width, y); gctx.stroke();
    }
    // Diagonal lines
    gctx.strokeStyle = 'rgba(0,200,255,0.03)';
    for (let x = -gc.height; x < gc.width + gc.height; x += size * 3) {
      gctx.beginPath();
      gctx.moveTo(x + gridOffset, 0);
      gctx.lineTo(x + gridOffset + gc.height, gc.height);
      gctx.stroke();
    }
    requestAnimationFrame(drawGrid);
  }
  drawGrid();

  // Hex particle canvas
  const hc = document.getElementById('hex-canvas');
  const hctx = hc.getContext('2d');

  function resizeHex() {
    hc.width = window.innerWidth;
    hc.height = window.innerHeight;
  }
  resizeHex();
  window.addEventListener('resize', resizeHex);

  const particles = Array.from({ length: 28 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: 4 + Math.random() * 12,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    alpha: 0.1 + Math.random() * 0.3,
    color: Math.random() > 0.6 ? '#00ff9d' : '#00c8ff',
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.01 + Math.random() * 0.02
  }));

  function hexPath(ctx, x, y, r) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      i === 0
        ? ctx.moveTo(x + r * Math.cos(a), y + r * Math.sin(a))
        : ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
    }
    ctx.closePath();
  }

  function drawHexFixed() {
    hctx.clearRect(0, 0, hc.width, hc.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.pulse += p.pulseSpeed;
      if (p.x < -20) p.x = hc.width + 20;
      if (p.x > hc.width + 20) p.x = -20;
      if (p.y < -20) p.y = hc.height + 20;
      if (p.y > hc.height + 20) p.y = -20;
      const alpha = p.alpha * (0.5 + 0.5 * Math.sin(p.pulse));
      const isGreen = p.color === '#00ff9d';
      hctx.strokeStyle = isGreen
        ? `rgba(0,255,157,${alpha})`
        : `rgba(0,200,255,${alpha})`;
      hctx.lineWidth = 0.8;
      hexPath(hctx, p.x, p.y, p.r);
      hctx.stroke();
    });
    requestAnimationFrame(drawHexFixed);
  }
  drawHexFixed();
})();

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
(function () {
  const cursor = document.getElementById('cursor');
  const dot = document.getElementById('cursor-dot');
  let mx = 0, my = 0, cx = 0, cy = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function moveCursor() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cursor.style.left = cx + 'px';
    cursor.style.top = cy + 'px';
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
    requestAnimationFrame(moveCursor);
  }
  moveCursor();

  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(0.7)';
  });
  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
  });
})();

/* ============================================================
   RENDER RESULT
   ============================================================ */
function renderResult(label, rf, nb, ensConf, indicators, text) {
  const verdicts = [
    { title: 'CLEAN',              icon: '🛡️', cls: 'verdict-safe',     threat: 'NONE',   msg: 'No social engineering indicators detected.' },
    { title: 'PHISHING',           icon: '🎣', cls: 'verdict-phishing', threat: 'HIGH',   msg: 'Credential harvesting / identity theft attempt.' },
    { title: 'SPAM',               icon: '📢', cls: 'verdict-spam',     threat: 'MEDIUM', msg: 'Unsolicited bulk message with deceptive content.' },
    { title: 'SOCIAL ENGINEERING', icon: '🎭', cls: 'verdict-social',   threat: 'HIGH',   msg: 'Human manipulation attack detected.' },
  ];
  const v = verdicts[label];
  const barClass = ['bar-green', 'bar-red', 'bar-orange', 'bar-yellow'][label];
  const rfConf = rf.confidence;
  const nbConf = nb.confidence;

  const indHTML = indicators.map((ind, i) =>
    `<div class="ind-chip ${ind.safe ? 'safe' : ''}" style="animation-delay:${i * 0.08}s">${ind.safe ? '✓' : '⚠'} ${ind.name}</div>`
  ).join('');

  document.getElementById('resultPanel').innerHTML = `
    <div class="verdict-badge ${v.cls}">
      <div class="verdict-icon">${v.icon}</div>
      <div class="verdict-text">
        <h2>${v.title}</h2>
        <p>Threat Level: ${v.threat} — ${v.msg}</p>
      </div>
    </div>

    <div class="model-scores">
      <div class="model-row">
        <div class="model-header">
          <span class="model-name">Random Forest (20 trees)</span>
          <span class="model-val">${rfConf}%</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill ${barClass}" id="rfBar" style="width:0%"></div>
        </div>
      </div>
      <div class="model-row">
        <div class="model-header">
          <span class="model-name">Naive Bayes (Laplace α=1)</span>
          <span class="model-val">${nbConf}%</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill ${barClass}" id="nbBar" style="width:0%"></div>
        </div>
      </div>
      <div class="ensemble-row">
        <span class="ensemble-label">Ensemble Confidence</span>
        <span class="ensemble-val">${ensConf}% — ${v.title}</span>
      </div>
    </div>

    <div class="indicators-wrap">
      <div class="ind-title">Detected Indicators</div>
      <div class="ind-chips">${indHTML || '<span style="color:var(--c-muted);font-size:10px">No specific indicators flagged</span>'}</div>
    </div>
  `;

  // Animate bars
  setTimeout(() => {
    document.getElementById('rfBar').style.width = rfConf + '%';
    document.getElementById('nbBar').style.width = nbConf + '%';
  }, 100);
}

/* ============================================================
   THREAT LOG
   ============================================================ */
function addLog(label, preview) {
  const now = new Date();
  const t = now.getHours().toString().padStart(2, '0') + ':' +
            now.getMinutes().toString().padStart(2, '0') + ':' +
            now.getSeconds().toString().padStart(2, '0');
  const labels = ['SAFE', 'PHISHING', 'SPAM', 'SOCIAL ENG'];
  const dotCls = ['dot-green', 'dot-red', 'dot-orange', 'dot-yellow'];
  const txtCls = ['num-green', 'num-red', 'num-yellow', 'num-yellow'];
  threatLog.unshift({ t, label, preview });

  const html = threatLog.slice(0, 12).map(e => `
    <div class="log-entry">
      <span class="log-time">${e.t}</span>
      <span class="log-dot ${dotCls[e.label]}"></span>
      <span class="log-verdict ${txtCls[e.label]}">${labels[e.label]}</span>
      <span class="log-msg">${e.preview}…</span>
    </div>
  `).join('');

  document.getElementById('logWrap').innerHTML = html;
}

/* ============================================================
   UI HELPERS
   ============================================================ */
function setType(btn, t) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  msgType = t;
}

function loadSample(key) {
  const s = SAMPLES[key];
  document.getElementById('msgInput').value = s.text;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const tabMap = { email: 0, sms: 1, social: 2, chat: 3 };
  document.querySelectorAll('.tab-btn')[tabMap[s.type] || 0].classList.add('active');
  msgType = s.type;
  updateCharCount();
}

document.getElementById('msgInput').addEventListener('input', updateCharCount);

function updateCharCount() {
  const n = document.getElementById('msgInput').value.length;
  document.getElementById('charCount').textContent = n + ' chars';
}

function showAlert(msg, type) {
  const el = document.getElementById('alertFlash');
  el.textContent = msg;
  el.className = 'show alert-' + type;
  setTimeout(() => el.classList.remove('show'), 3200);
}

function updateStats() {
  document.getElementById('stat-scanned').textContent = stats.scanned;
  document.getElementById('stat-threats').textContent = stats.threats;
  document.getElementById('stat-safe').textContent = stats.safe;
  document.getElementById('headerThreatCount').textContent = stats.threats + ' THREATS DETECTED';
}
