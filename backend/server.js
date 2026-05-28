/* ============================================================
   AEGIS DEFEND — backend/server.js
   Express REST API server
   ============================================================ */

const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB, saveScan, getScans, getStats } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

/* ---- Middleware ---- */
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '..')));

/* ---- Connect to MongoDB ---- */
connectDB();

/* ============================================================
   ROUTES
   ============================================================ */

/**
 * POST /api/scan
 * Save a completed scan result to the database.
 * Body: { text, msgType, label, confidence, rfScore, nbScore, indicators }
 */
app.post('/api/scan', async (req, res) => {
  try {
    const { text, msgType, label, confidence, rfScore, nbScore, indicators } = req.body;
    if (!text || label === undefined) {
      return res.status(400).json({ error: 'text and label are required' });
    }
    const scan = await saveScan({ text, msgType, label, confidence, rfScore, nbScore, indicators });
    res.status(201).json({ success: true, scan });
  } catch (err) {
    console.error('[POST /api/scan]', err);
    res.status(500).json({ error: 'Failed to save scan' });
  }
});

/**
 * GET /api/scans
 * Retrieve the most recent scan records.
 * Query: ?limit=50
 */
app.get('/api/scans', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const scans = await getScans(limit);
    res.json({ success: true, scans });
  } catch (err) {
    console.error('[GET /api/scans]', err);
    res.status(500).json({ error: 'Failed to fetch scans' });
  }
});

/**
 * GET /api/stats
 * Return aggregate statistics: total scanned, threats, clean.
 */
app.get('/api/stats', async (req, res) => {
  try {
    const stats = await getStats();
    res.json({ success: true, stats });
  } catch (err) {
    console.error('[GET /api/stats]', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

/* ---- Catch-all: serve index.html for SPA routing ---- */
app.get('/{*path}', (req, res) => {
  
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

/* ---- Start server ---- */
app.listen(PORT, () => {
  console.log(`[AEGIS DEFEND] Server running on http://localhost:${PORT}`);
});

module.exports = app;
