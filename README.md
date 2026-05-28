# 🛡️ AEGIS DEFEND

## AI-Powered Social Engineering Defense System

<div align="center">

<img width="1886" height="849" alt="Screenshot 2026-05-28 145142" src="https://github.com/user-attachments/assets/902cc6d5-b651-4848-ad01-e5cb97a0f63a" />
<img width="1908" height="545" alt="Screenshot 2026-05-28 145159" src="https://github.com/user-attachments/assets/26dc22c8-9094-4cab-98c3-c86eee520079" />
<img width="1913" height="848" alt="Screenshot 2026-05-28 145329" src="https://github.com/user-attachments/assets/b443a6ae-fcd1-4adc-b66f-4dee63b913bd" />
<img width="1898" height="861" alt="Screenshot 2026-05-28 145652" src="https://github.com/user-attachments/assets/9c965c8b-e2f2-46e0-a64d-85c08e673ed7" />
<img width="1895" height="498" alt="Screenshot 2026-05-28 145406" src="https://github.com/user-attachments/assets/27c88d2e-04bb-421f-9391-d13a77df12f8" />
<img width="1911" height="529" alt="Screenshot 2026-05-28 145717" src="https://github.com/user-attachments/assets/2899aeb9-317f-49d7-ba2c-09e8a2e9e300" />
<img width="1907" height="850" alt="Screenshot 2026-05-28 145609" src="https://github.com/user-attachments/assets/a861ecdf-5d8b-4372-8939-2d73def90396" />
<img width="1919" height="88" alt="Screenshot 2026-05-28 145231" src="https://github.com/user-attachments/assets/bf316607-ba09-466b-8ea8-a091cbbaa194" />
<img width="1919" height="87" alt="Screenshot 2026-05-28 145246" src="https://github.com/user-attachments/assets/0abbdedd-d0a8-4c3c-9686-556dfcdc60a6" />


<br><br>

### 🚨 Detect Phishing • Spam • Social Engineering in Real-Time

An advanced AI-powered cyber defense platform designed to identify malicious communication using an ensemble Machine Learning architecture built with:

🧠 Random Forest
🧠 Naive Bayes
⚡ TF-IDF Vectorization
🌐 Real-Time Browser Analysis
💾 MongoDB Threat Logging

<br>

> "Defending humans against manipulation-driven cyber attacks."

</div>

---

# 📸 System Preview

## 🔥 Main Dashboard

<img width="100%" src="https://github.com/user-attachments/assets/d4fca7fc-d2e8-4478-b700-b30c6a5e206a"/>

---

## 🧠 AI Threat Classification

<img width="100%" src="https://github.com/user-attachments/assets/bfb5982e-e01a-458a-a4d5-7e11603716c1"/>

---

## 📊 Analytics & Threat Monitoring

<img width="100%" src="https://github.com/user-attachments/assets/e7eb2fac-dcfc-4c5a-980a-8152bb63cd59"/>

---

# ✨ Core Features

## 🤖 AI-Powered Detection Engine

* Random Forest Classifier (20 Trees)
* Naive Bayes Probability Analysis
* Weighted Ensemble Scoring
* TF-IDF Feature Extraction
* Confidence Probability Bars

---

## ⚡ Real-Time Threat Analysis

* Instant message scanning
* Animated cyber scan overlay
* Live threat classification
* Threat level indication
* Detection explanation engine

---

## 🎯 Threat Categories

| Threat Type           | Description                   | Risk   |
| --------------------- | ----------------------------- | ------ |
| 🎣 Phishing           | Credential theft attempts     | HIGH   |
| 📢 Spam               | Deceptive promotional attacks | MEDIUM |
| 🎭 Social Engineering | Human manipulation attacks    | HIGH   |
| 🛡️ Clean             | Safe communication            | SAFE   |

---

## 📊 Live Monitoring System

* Session-based threat logs
* Real-time analytics dashboard
* Threat statistics tracking
* Scan history management
* MongoDB cloud/local storage

---

## 🌐 Multi-Platform Detection

Supports:

* 📧 Email Messages
* 📱 SMS Messages
* 💬 Chat Platforms
* 🌍 Social Media Messages

---

# 🧠 AI Architecture

```text
                ┌─────────────────────┐
                │ User Input Message  │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │ Feature Extraction  │
                │ TF-IDF + Indicators │
                └──────────┬──────────┘
                           │
          ┌────────────────┴────────────────┐
          ▼                                 ▼

 ┌───────────────────┐           ┌───────────────────┐
 │   Naive Bayes     │           │   Random Forest   │
 │ Laplace Smoothing │           │   20 Decision     │
 │ Word Probability  │           │      Trees        │
 └─────────┬─────────┘           └─────────┬─────────┘
           │                               │
           └──────────────┬────────────────┘
                          ▼

             ┌────────────────────────┐
             │ Weighted Ensemble Vote │
             └────────────┬───────────┘
                          ▼

              ┌──────────────────────┐
              │ Final Classification │
              │ CLEAN / PHISHING /   │
              │ SPAM / SOCIAL ENG    │
              └────────────┬─────────┘
                           ▼

                  MongoDB Threat Logs
```

---

# 🗂️ Project Structure

```bash
AEGIS-DEFEND/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   ├── data.js
│   ├── models.js
│   ├── scan.js
│   └── ui.js
│
├── images/
│
├── backend/
│   ├── server.js
│   ├── database.js
│   ├── routes/
│   ├── controllers/
│   └── models/
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

# 🚀 Installation Guide

# 1️⃣ Clone Repository

```bash
git clone https://github.com/Yug-Vahanka/AEGIS-DEFEND.git
cd AEGIS-DEFEND
```

---

# 2️⃣ Install Backend Dependencies

```bash
cd backend

npm install express mongodb cors dotenv
```

---

# 3️⃣ Configure Environment Variables

Create a `.env` file inside `/backend`

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/aegis_defend
```

---

# 4️⃣ Start MongoDB

## Windows

```bash
net start MongoDB
```

## Manual Start

```bash
mongod --dbpath D:\MongoDB\data\db
```

---

# 5️⃣ Run Server

```bash
node server.js
```

---

# 6️⃣ Open Application

```text
http://localhost:3000
```

---

# 📡 API Endpoints

| Method | Endpoint     | Description           |
| ------ | ------------ | --------------------- |
| POST   | `/api/scan`  | Save threat scan      |
| GET    | `/api/scans` | Fetch scan history    |
| GET    | `/api/stats` | Fetch analytics stats |

---

# 📦 Example API Request

## POST `/api/scan`

```json
{
  "text": "URGENT: Verify your account now",
  "msgType": "email",
  "label": "PHISHING",
  "confidence": 94,
  "rfScore": 91,
  "nbScore": 78,
  "indicators": [
    "urgent language",
    "suspicious link",
    "fear tactic"
  ]
}
```

---

# 🧪 Sample Threat Messages

## 🎣 Phishing

```text
URGENT: Your bank account will be suspended.
Verify immediately:
secure-bank-login.xyz
```

---

## 📢 Spam

```text
YOU WON a FREE iPhone 16!!!
Claim your reward now!!
```

---

## 🎭 Social Engineering

```text
Hello this is IT Support.
We detected suspicious activity.
Send your employee ID and VPN password immediately.
```

---

# 🛠️ Technology Stack

| Layer         | Technology                      |
| ------------- | ------------------------------- |
| Frontend      | HTML5, CSS3, Vanilla JavaScript |
| AI Models     | Random Forest, Naive Bayes      |
| Backend       | Node.js, Express.js             |
| Database      | MongoDB                         |
| Styling       | Cyberpunk UI + Canvas Effects   |
| Visualization | HTML5 Canvas                    |

---

# 🔒 Security Features

* Threat indicator extraction
* Link suspicion analysis
* Urgency keyword detection
* Credential request identification
* Social manipulation pattern matching

---

# 📈 Future Improvements

* 🧠 Deep Learning Integration
* 🌍 Real-time URL Reputation API
* 📧 Email Header Analysis
* ☁️ Cloud Deployment
* 📱 Mobile App Version
* 🔔 Browser Extension
* 🤖 GPT-assisted Threat Explanation
* 🌐 Multi-language Detection

---

# 🤝 Contributing

Contributions are welcome!

```bash
# Fork the repository

# Create feature branch
git checkout -b feature/NewFeature

# Commit changes
git commit -m "Added New Feature"

# Push branch
git push origin feature/NewFeature
```

Then open a Pull Request 🚀

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

## Yug Vahanka

🌐 GitHub:
https://github.com/Yug-Vahanka

---

# ⭐ Support The Project

If you found this project useful:

⭐ Star the repository
🍴 Fork the project
🛡️ Share with cybersecurity enthusiasts

---

<div align="center">

# ⚡ AEGIS DEFEND

### "AI Protecting Humans from Human Manipulation"

</div>
