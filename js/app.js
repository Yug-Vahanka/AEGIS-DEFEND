/* ============================================================
   AEGIS DEFEND — app.js
   Application entry point and global state
   ============================================================ */

/* ---- Global State ---- */
let msgType = 'email';
let stats = { scanned: 0, threats: 0, safe: 0 };
let threatLog = [];

/*
  Script load order (defined in index.html):
    1. data.js    — FEATURES, TRAINING, SAMPLES
    2. models.js  — NaiveBayes, randomForestClassify, nb instance
    3. ui.js      — renderResult, addLog, showAlert, updateStats, cursor, backgrounds
    4. scan.js    — runScan, animateScan, extractIndicators
    5. app.js     — state (this file, loaded last)

  All modules rely on the globals defined here (msgType, stats, threatLog).
  No bundler is used; scripts are plain ES5-compatible for maximum browser support.
*/
