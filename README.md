# AEGIS DEFEND
### AI Social Engineering Defense System v2.0

A browser-based threat detection tool that classifies messages (email, SMS, social, chat) using an ensemble of **Random Forest** and **Naive Bayes** ML models — all running client-side with no external API.

---

## Folder Structure

```
AEGIS-DEFEND/
│
├── index.html          ← Main HTML entry point
├── css/
│   └── style.css       ← All styles (dark cyberpunk theme)
│
├── js/
│   ├── app.js          ← Global state (msgType, stats, threatLog)
│   ├── data.js         ← FEATURES vocabulary, TRAINING data, SAMPLES
│   ├── models.js       ← NaiveBayes class + randomForestClassify()
│   ├── scan.js         ← runScan(), animateScan(), extractIndicators()
│   └── ui.js           ← Rendering, cursor, canvas backgrounds, helpers
│
├── images/             ← Static assets (icons, screenshots)
│
├── backend/
│   ├── server.js       ← Express REST API (Node.js)
│   └── database.js     ← MongoDB connection + data access layer
│
└── README.md
```

---

## Running the Frontend (no backend needed)

Just open `index.html` in a browser — all ML logic runs in-browser via vanilla JS.

```bash
# Option 1: simple local server
npx serve .

# Option 2: Python
python3 -m http.server 8080
```

---

## Running the Full Stack (with MongoDB)

### Prerequisites
- Node.js ≥ 18
- MongoDB (local or Atlas)

### Install dependencies

```bash
cd backend
npm init -y
npm install express cors mongodb dotenv
```

### Configure environment

Create a `.env` file in the project root:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017
```

### Start the server

```bash
node backend/server.js
```

Open `http://localhost:3000` in your browser.

---

## API Endpoints

| Method | Route        | Description                        |
|--------|--------------|------------------------------------|
| POST   | /api/scan    | Save a scan result to MongoDB      |
| GET    | /api/scans   | Retrieve recent scans (`?limit=N`) |
| GET    | /api/stats   | Aggregate threat statistics        |

---

## ML Models

| Model         | Role      | Weight | Description                                      |
|---------------|-----------|--------|--------------------------------------------------|
| Random Forest | Primary   | 0.65   | 20-tree ensemble with TF-IDF feature vectors     |
| Naive Bayes   | Secondary | 0.35   | Multinomial NB with Laplace smoothing (α = 1)   |
| Ensemble      | Fusion    | —      | Weighted vote; final confidence capped at 99%    |

### Labels
- `0` — CLEAN
- `1` — PHISHING
- `2` — SPAM
- `3` — SOCIAL ENGINEERING

---

## Tech Stack

- **Frontend:** Vanilla JS, HTML5 Canvas, CSS custom properties
- **Fonts:** Orbitron, JetBrains Mono (Google Fonts)
- **Backend:** Node.js, Express
- **Database:** MongoDB (mongoose-free, native driver)

---

## Keyboard Shortcut

`Ctrl + Enter` (or `Cmd + Enter`) triggers a scan from anywhere on the page.

---

## License

MIT — free to use, modify, and distribute.
