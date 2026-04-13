# 🚀 Multimodal Fraud Detection Using Graph Neural Networks and Transactional Behavior Profiling

This project presents an advanced fraud detection system that goes beyond traditional rule-based approaches by combining transactional data with relationship-aware graph modeling. The system analyzes attributes such as transaction amount, country, device type, and merchant category, along with hidden connections between entities to identify complex fraud patterns.

---

## 🧠 Key Innovation

Unlike conventional models, this platform leverages **Graph Neural Networks (GNNs)** to learn relationships between:

- Users
- Devices
- Merchants
- Transaction behaviors

By capturing these interconnected patterns, the system can detect **subtle and coordinated fraud activities** that are often missed by standard machine learning techniques.

---

## ⚙️ Core Features

- 🔍 Multimodal Fraud Detection (transaction + relationship data)
- 🧠 Graph Neural Network-based modeling
- 📊 Real-time Risk Scoring & Fraud Probability (0–100%)
- 💡 Explainable AI (risk factors and insights)
- 📈 Interactive Dashboard with Analytics & Charts
- ⚡ Live Transaction Monitoring

---

## 💻 Application Interface

The project includes a modern **Next.js-based dashboard** where users can:

- Enter transaction details
- Send data to the backend fraud detection engine
- View real-time predictions
- Analyze fraud probability and risk levels
- Understand decisions through explainable risk signals
- Explore insights via chart-based visualizations

---

## 🎯 Purpose

This platform is designed to:

- Demonstrate advanced fraud detection techniques
- Provide an interactive and user-friendly interface
- Help users understand complex AI-driven decisions
- Showcase real-world, production-level system design

---

## 🔄 Project Evolution

### 👉 Improved Version (Better Branding)

- **AI-Powered Real-Time Fraud Detection System**
- Risk scoring with `Low / Medium / High` classification
- Alerts-style risk signals and explanation cards
- Analytics dashboard layout with premium UI styling
- Dark/light mode toggle
- Real-time transaction monitoring experience
- Accuracy flow chart and confidence visualizations

---

## 🧰 Frontend Tech Stack

- `Next.js 14.2.12`
- `React 18.3.1`
- `Tailwind CSS 3.4.14`
- `TypeScript 5.6.2`

---

## ✨ Current Frontend Features

- Modern fraud analytics dashboard built with `Next.js` and `Tailwind CSS`
- Transaction input form for:
  - `amount`
  - `country`
  - `device type`
  - `merchant category`
- Live prediction result with:
  - Fraud output
  - Confidence score
  - Risk level
- Explainable AI panels showing risk signals and result details
- Separate **Detected Risk Signals** section for readable fraud explanations
- Separate **Accuracy Flow Chart** with heartbeat-style score flow

### 📊 Analytics Visualizations

- `Score Pulse Timeline`
- `Pie Chart (Fraud vs Legit)`
- `Line Chart (Transactions Trend)`
- `Bar Chart (Risk Levels)`

- Responsive admin-style layout for demo and presentation use

---

## Run Locally

1. Open a terminal in this folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000`

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Troubleshooting

- If you see `Cannot find module ...\\frontend\\dev`, you likely ran `node dev` by mistake.
- Use `npm run dev` (or `npx next dev`) from this folder.

## Backend Link

The frontend is now connected to the backend folder:

- API route: `app/api/predict/route.ts`
- Backend script invoked by that route: `../[backend-folder]/src/fraud_gnn/cli.py`

When you click **Check transaction**, the Next.js API route runs the Python backend script and returns live prediction output to the UI.

If your Python executable is not `python`, set this env var before starting frontend:

- PowerShell: `$env:FRAUD_BACKEND_PYTHON="py"`

If your backend is stored in a **user-defined folder**, set:

- PowerShell: `$env:FRAUD_BACKEND_DIR="C:/path/to/[backend-folder]"`
