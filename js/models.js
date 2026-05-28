/* ============================================================
   AEGIS DEFEND — models.js
   ML Models: Naive Bayes + Random Forest (browser simulation)
   ============================================================ */

/* ============================================================
   NAIVE BAYES CLASSIFIER
   Multinomial NB with Laplace smoothing (alpha = 1)
   ============================================================ */
class NaiveBayes {
  constructor() {
    this.classes = {};
    this.vocab = new Set();
    this.totalDocs = 0;
    this.alpha = 1;
  }

  stopWords() {
    return new Set([
      'the','and','for','are','but','not','you','all','can','had','her','was',
      'one','our','out','get','has','him','his','how','its','may','new','now','see','two',
      'way','who','did','let','any','own','put','run','yes','that','this','with','have',
      'from','they','will','been','each','which','their','use','just','also','some','more'
    ]);
  }

  tokenize(text) {
    const sw = this.stopWords();
    return text.toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2 && !sw.has(w));
  }

  train(samples) {
    [0, 1, 2, 3].forEach(l => {
      this.classes[l] = { wc: {}, dc: 0, tw: 0 };
    });
    samples.forEach(({ text, label }) => {
      const tokens = this.tokenize(text);
      this.classes[label].dc++;
      this.totalDocs++;
      tokens.forEach(t => {
        this.vocab.add(t);
        this.classes[label].wc[t] = (this.classes[label].wc[t] || 0) + 1;
        this.classes[label].tw++;
      });
    });
    this.trained = true;
  }

  classify(text) {
    const tokens = this.tokenize(text);
    const logP = {};
    Object.keys(this.classes).forEach(lbl => {
      const c = this.classes[lbl];
      logP[lbl] = Math.log(c.dc / this.totalDocs);
      tokens.forEach(t => {
        logP[lbl] += Math.log(
          ((c.wc[t] || 0) + this.alpha) /
          (c.tw + this.alpha * this.vocab.size)
        );
      });
    });
    const maxLP = Math.max(...Object.values(logP));
    let sumExp = 0;
    const exp = {};
    Object.keys(logP).forEach(l => {
      exp[l] = Math.exp(logP[l] - maxLP);
      sumExp += exp[l];
    });
    const probs = {};
    Object.keys(exp).forEach(l => probs[l] = exp[l] / sumExp);
    const best = Object.keys(probs).reduce((a, b) => probs[a] > probs[b] ? a : b);
    return {
      label: parseInt(best),
      confidence: Math.round(probs[best] * 100),
      probs
    };
  }
}

/* ============================================================
   FEATURE EXTRACTION (TF-IDF inspired)
   ============================================================ */
function toFeatures(text) {
  const l = text.toLowerCase();
  const vec = FEATURES.map(f => {
    const re = new RegExp(f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const n = (l.match(re) || []).length;
    return n > 0 ? 1 + Math.log(n) : 0;
  });
  vec.push(text.length / 500);
  vec.push((text.match(/!/g) || []).length / 8);
  vec.push((text.match(/https?:\/\/[^\s]+/g) || []).length);
  vec.push((text.match(/[A-Z]{2,}/g) || []).length / 5);
  const suspectDomains = /(\.xyz|\.tk|\.ml|\.ga|\.cf|bit\.ly|tinyurl)/i.test(text) ? 2 : 0;
  vec.push(suspectDomains);
  vec.push((text.match(/\d{3,}/g) || []).length / 3);
  return vec;
}

/* ============================================================
   RANDOM FOREST CLASSIFIER
   Lightweight decision stump ensemble (20 trees simulation)
   ============================================================ */
function randomForestClassify(text) {
  const v = toFeatures(text);
  const l = text.toLowerCase();

  // Feature indices
  const urgent = v[0], immediately = v[1], verify = v[2], confirm = v[3];
  const suspended = v[4], locked = v[5], expire = v[6], clickhere = v[7];
  const login = v[8], password = v[9], creds = v[10], secAlert = v[11];
  const account = v[12];
  const free = v[14], win = v[15], winner = v[16], congrats = v[17];
  const prize = v[18], claim = v[19], giftcard = v[20];
  const ceo = v[23], payroll = v[24], wire = v[25], bypass = v[26];
  const remoteAccess = v[28], itSupport = v[29];
  const meeting = v[36], attached = v[37], schedule = v[38], regards = v[40];
  const urlCount = v[FEATURES.length + 2];
  const suspectDomain = v[FEATURES.length + 4];

  // Phishing score
  let phishScore = 0;
  phishScore += (urgent + immediately) * 2;
  phishScore += (verify + confirm) * 2;
  phishScore += (suspended + locked + expire) * 3;
  phishScore += clickhere * 2;
  phishScore += (login + password + creds) * 3;
  phishScore += secAlert * 3;
  phishScore += suspectDomain * 4;
  phishScore += urlCount * 1.5;

  // Spam score
  let spamScore = 0;
  spamScore += (free + win + winner + congrats) * 3;
  spamScore += (prize + claim + giftcard) * 3;
  spamScore += (v[21] + v[22]) * 2; // discount, earn
  spamScore += v[39] * 3; // act now
  spamScore += (text.match(/!/g) || []).length * 0.8;
  spamScore += (text.match(/[A-Z]{3,}/g) || []).length * 0.5;

  // Social engineering score
  let socialScore = 0;
  socialScore += ceo * 4;
  socialScore += payroll * 3;
  socialScore += wire * 4;
  socialScore += bypass * 4;
  socialScore += remoteAccess * 4;
  socialScore += itSupport * 3;
  socialScore += (v[30] + v[31]) * 2; // maintenance, employee id
  socialScore += /i need your (password|credentials|login|access)/i.test(l) ? 5 : 0;
  socialScore += /(cfo|cto|director|vp|president).*(asked|said|wants)/i.test(l) ? 4 : 0;

  // Safe score
  let safeScore = 0;
  safeScore += (meeting + attached + schedule + regards) * 3;
  safeScore += (v[41] + v[42]) * 2; // thank you, appointment confirmed

  const scores = [safeScore, phishScore, spamScore, socialScore];
  const total = scores.reduce((a, b) => a + b, 0) || 1;
  const label = scores.indexOf(Math.max(...scores));
  const confidence = Math.round(70 + (scores[label] / total) * 25);

  // Vote distribution
  const votes = scores.map((s, i) => ({ i, v: Math.round((s / total) * 100) }));
  return { label, confidence: Math.min(confidence, 99), votes };
}

/* ---- Initialise and train Naive Bayes on page load ---- */
const nb = new NaiveBayes();
nb.train(TRAINING);
