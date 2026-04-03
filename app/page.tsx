"use client";

import { useState, useEffect } from "react";
import { ParticleBackground } from "../components/particles";
import { DashboardHeader } from "../components/dashboardHeader";
import { ResultsPanel } from "../components/resultsPanel";
import { TransactionForm } from "../components/transactionForm";
import { initialPrediction, themeColors } from "../components/theme";
import { Prediction, ThemeType } from "../components/types";

export default function Home() {
  const [amount, setAmount] = useState("");
  const [country, setCountry] = useState("");
  const [deviceType, setDeviceType] = useState("");
  const [merchantCategory, setMerchantCategory] = useState("");
  const [prediction, setPrediction] = useState<Prediction>(initialPrediction);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [resultVersion, setResultVersion] = useState(0);
  const [theme, setTheme] = useState<ThemeType>("white");

  useEffect(() => {
    const savedTheme = localStorage.getItem("fraudDashboardTheme") as ThemeType;
    if (savedTheme && themeColors[savedTheme]) {
      setTheme(savedTheme);
    }
  }, []);

  const saveTheme = (newTheme: ThemeType) => {
    setTheme(newTheme);
    localStorage.setItem("fraudDashboardTheme", newTheme);
  };

  const isDarkTheme = Boolean(themeColors[theme].isDark);

  const chipClass =
    prediction.risk_level === "High"
      ? isDarkTheme
        ? "w-fit rounded-full border border-red-400/60 bg-gradient-to-r from-red-500/30 to-rose-500/25 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.1em] text-red-100 shadow-lg shadow-red-500/25"
        : "w-fit rounded-full border border-red-500/70 bg-gradient-to-r from-red-200 to-rose-100 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.1em] text-red-800 shadow-sm"
      : prediction.risk_level === "Medium"
        ? isDarkTheme
          ? "w-fit rounded-full border border-amber-400/60 bg-gradient-to-r from-amber-500/30 to-orange-500/20 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.1em] text-amber-100 shadow-lg shadow-amber-500/20"
          : "w-fit rounded-full border border-amber-500/70 bg-gradient-to-r from-amber-200 to-orange-100 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.1em] text-amber-900 shadow-sm"
        : isDarkTheme
          ? "w-fit rounded-full border px-4 py-2 text-xs font-extrabold uppercase tracking-[0.1em] shadow-lg"
          : "w-fit rounded-full border px-4 py-2 text-xs font-extrabold uppercase tracking-[0.1em] shadow-sm";

  const safeChipStyle: React.CSSProperties = isDarkTheme
    ? {
        borderColor: themeColors[theme].accent + "99",
        background: `linear-gradient(to right, ${themeColors[theme].accent}3A, ${themeColors[theme].accent}24)`,
        color: "#f8fafc",
        boxShadow: `0 8px 18px ${themeColors[theme].accent}3D`,
      }
    : {
        borderColor: themeColors[theme].accent + "B3",
        background: `linear-gradient(to right, ${themeColors[theme].accent}33, ${themeColors[theme].accent}1F)`,
        color: "#0f172a",
      };

  const chipStyle = prediction.risk_level === "Low" ? safeChipStyle : undefined;

  async function onEvaluateRisk() {
    const missingFields: string[] = [];

    if (!amount || Number(amount) <= 0) {
      missingFields.push("Transaction Amount");
    }
    if (!country) {
      missingFields.push("Country");
    }
    if (!deviceType) {
      missingFields.push("Device Type");
    }
    if (!merchantCategory) {
      missingFields.push("Merchant Category");
    }

    if (missingFields.length > 0) {
      const msg = `Required fields: ${missingFields.join(", ")}`;
      setFormError(msg);
      return;
    }

    setFormError(null);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(amount || 0),
          country,
          device_type: deviceType,
          merchant_category: merchantCategory,
        }),
      });

      const payload = (await response.json()) as Prediction | { error: string };

      if (!response.ok || "error" in payload) {
        throw new Error("error" in payload ? payload.error : "Prediction request failed");
      }

      setPrediction(payload);
      setResultVersion((prev) => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to connect backend");
      setResultVersion((prev) => prev + 1);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ParticleBackground />

      <main className="relative z-10 mx-auto min-h-screen w-[min(1100px,92vw)] py-8 pb-16">
        <DashboardHeader theme={theme} onThemeChange={saveTheme} />

        <section className="grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
          <TransactionForm
            theme={theme}
            amount={amount}
            country={country}
            deviceType={deviceType}
            merchantCategory={merchantCategory}
            loading={loading}
            formError={formError}
            onAmountChange={setAmount}
            onCountryChange={setCountry}
            onDeviceTypeChange={setDeviceType}
            onMerchantCategoryChange={setMerchantCategory}
            onSubmit={() => {
              void onEvaluateRisk();
            }}
          />

          <ResultsPanel
            theme={theme}
            prediction={prediction}
            chipClass={chipClass}
            chipStyle={chipStyle}
            resultVersion={resultVersion}
            error={error}
          />
        </section>
      </main>
    </>
  );
}
