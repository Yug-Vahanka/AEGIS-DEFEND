/* ============================================================
   AEGIS DEFEND — backend/database.js
   MongoDB connection and data access layer
   ============================================================ */

const { MongoClient, ServerApiVersion } = require('mongodb');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME   = 'aegis_defend';
const COLLECTION = 'scans';

let db = null;

/* ============================================================
   CONNECTION
   ============================================================ */
async function connectDB() {
  if (db) return db;

  try {
    const client = new MongoClient(MONGO_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    db = client.db(DB_NAME);
    console.log(`[DB] Connected to MongoDB — database: "${DB_NAME}"`);

    // Ensure indexes
    await db.collection(COLLECTION).createIndex({ createdAt: -1 });
    await db.collection(COLLECTION).createIndex({ label: 1 });

    return db;
  } catch (err) {
    console.error('[DB] Connection failed:', err.message);
    process.exit(1);
  }
}

function getCollection() {
  if (!db) throw new Error('Database not connected. Call connectDB() first.');
  return db.collection(COLLECTION);
}

/* ============================================================
   DATA ACCESS FUNCTIONS
   ============================================================ */

/**
 * Save a scan result document.
 * @param {Object} data - { text, msgType, label, confidence, rfScore, nbScore, indicators }
 * @returns {Object} Inserted document with _id
 */
async function saveScan(data) {
  const col = getCollection();
  const doc = {
    text:        data.text,
    msgType:     data.msgType || 'unknown',
    label:       data.label,           // 0=clean, 1=phishing, 2=spam, 3=social-eng
    labelName:   ['CLEAN', 'PHISHING', 'SPAM', 'SOCIAL_ENG'][data.label] || 'UNKNOWN',
    confidence:  data.confidence,
    rfScore:     data.rfScore,
    nbScore:     data.nbScore,
    indicators:  data.indicators || [],
    createdAt:   new Date(),
  };
  const result = await col.insertOne(doc);
  return { ...doc, _id: result.insertedId };
}

/**
 * Retrieve recent scan records.
 * @param {number} limit - Max records to return (default 50)
 * @returns {Array} Array of scan documents
 */
async function getScans(limit = 50) {
  const col = getCollection();
  return col
    .find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();
}

/**
 * Get aggregate statistics across all scans.
 * @returns {Object} { total, threats, clean, byLabel }
 */
async function getStats() {
  const col = getCollection();

  const [total, threats, clean, byLabel] = await Promise.all([
    col.countDocuments(),
    col.countDocuments({ label: { $in: [1, 2, 3] } }),
    col.countDocuments({ label: 0 }),
    col.aggregate([
      { $group: { _id: '$labelName', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]).toArray(),
  ]);

  return { total, threats, clean, byLabel };
}

module.exports = { connectDB, saveScan, getScans, getStats };
