# Frontend Layout

This Next.js + Tailwind app provides the project layout UI for:

Multimodal Fraud Detection Using Graph Neural Networks and Transactional Behavior Profiling. The platform combines transactional attributes (amount, country, device type, and merchant category) with relationship-aware graph modeling to identify suspicious patterns that are difficult to detect with rule-based checks alone. Graph Neural Networks learn connections between users, devices, merchants, and transaction behavior, enabling stronger risk scoring, fraud probability estimation, and explainable risk signals in real time through this dashboard.

## Run Locally

1. Open a terminal in this folder.
2. Install dependencies:
   npm install
3. Start development server:
   npm run dev
4. Open http://localhost:3000

## Troubleshooting

- If you see `Cannot find module ...\\frontend\\dev`, you likely ran `node dev` by mistake.
- Use `npm run dev` (or `npx next dev`) from this folder.

## Backend Link

The frontend is now connected to the backend folder:

- API route: `app/api/predict/route.ts`
- Backend script invoked by that route: `../multimodal fraud detection/src/fraud_gnn/cli.py`

When you click **Check transaction**, the Next.js API route runs the Python backend script and returns live prediction output to the UI.

If your Python executable is not `python`, set this env var before starting frontend:

- PowerShell: `$env:FRAUD_BACKEND_PYTHON="py"`

If backend path is different, set:

- PowerShell: `$env:FRAUD_BACKEND_DIR="C:/path/to/multimodal fraud detection"`

## Main Files

- app/page.tsx: project details page layout
- app/globals.css: visual style system, responsive layout, colors, and components
- app/layout.tsx: root layout and typography setup
