"use client";

import { themeColors } from "./theme";
import { Prediction, ThemeType } from "./types";
import { RingMeter } from "./ringMeter";

interface ResultsPanelProps {
  theme: ThemeType;
  prediction: Prediction;
  chipClass: string;
  chipStyle?: React.CSSProperties;
  resultVersion: number;
  error: string | null;
  amount: string;
  country: string;
  deviceType: string;
  merchantCategory: string;
}

export function ResultsPanel({
  theme,
  prediction,
  chipClass,
  chipStyle,
  resultVersion,
  error,
  amount,
  country,
  deviceType,
  merchantCategory,
}: ResultsPanelProps) {
  const verdictLabel =
    prediction.risk_level === "High" ? "Fraud Detected" : prediction.risk_level === "Medium" ? "Needs Review" : "Legit";
  const confidenceLabel = `${prediction.confidence}%`;
  const riskColor =
    prediction.risk_level === "High"
      ? "#dc2626"
      : prediction.risk_level === "Medium"
        ? "#ea580c"
        : themeColors[theme].accent;
  const verdictTextColor = prediction.risk_level === "High" ? "#dc2626" : riskColor;

  const prettifyValue = (value: string): string => {
    if (!value) return "—";
    return value.replace(/[_-]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const detailItems = [
    { label: "Amount", value: amount ? `₹${Number(amount).toLocaleString()}` : "—" },
    { label: "Country", value: prettifyValue(country) },
    { label: "Device", value: prettifyValue(deviceType) },
    { label: "Merchant", value: prettifyValue(merchantCategory) },
  ];

  const metricItems = [
    { label: "Confidence", value: confidenceLabel, tone: themeColors[theme].isDark ? "#e2e8f0" : "#0f172a" },
    { label: "Risk Level", value: prediction.risk_level, tone: riskColor },
    {
      label: "Inference",
      value: `${prediction.inference_ms} ms`,
      tone: themeColors[theme].isDark ? "#e2e8f0" : "#0f172a",
    },
    { label: "Status", value: verdictLabel, tone: riskColor },
  ];

  const resultSummaryTitle =
    prediction.risk_level === "High"
      ? "High Fraud Confidence"
      : prediction.risk_level === "Medium"
        ? "Review Recommended Confidence"
        : "Low-Risk Legit Confidence";

  const resultSummaryText =
    prediction.risk_level === "High"
      ? "The final output strongly indicates fraudulent activity. This transaction should be blocked or reviewed immediately."
      : prediction.risk_level === "Medium"
        ? "The final output shows suspicious behavior and should stay in manual review before approval."
        : "The final output indicates a stable low-risk legitimate transaction with good confidence.";

  const resultBadges = [`Verdict: ${verdictLabel}`, `Risk: ${prediction.risk_level}`, `Confidence: ${confidenceLabel}`];

  return (
    <article
      key={resultVersion}
      className="relative flex h-full flex-col overflow-hidden rounded-[28px] border shadow-2xl backdrop-blur-sm"
      style={{
        background: themeColors[theme].isDark
          ? "linear-gradient(135deg, rgba(15,23,42,0.86) 0%, rgba(30,41,59,0.7) 100%)"
          : "linear-gradient(145deg, rgba(255,255,255,0.96) 0%, rgba(241,245,249,0.98) 100%)",
        borderColor: themeColors[theme].accent + "40",
        boxShadow: `0 22px 52px ${themeColors[theme].accent}1F`,
        animation: "slideUpIn 500ms ease forwards",
      }}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl"
        style={{ background: themeColors[theme].accent + "18" }}
      />

      <div className="border-b px-6 py-5" style={{ borderColor: themeColors[theme].accent + "30" }}>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p
                className="text-[0.64rem] font-bold uppercase tracking-[0.14em]"
                style={{ color: themeColors[theme].accent + "B3" }}
              >
                Analysis Verdict
              </p>
              <span
                className="rounded-full border px-2.5 py-1 text-[0.55rem] font-black uppercase tracking-[0.12em]"
                style={{
                  borderColor: themeColors[theme].accent + "40",
                  color: themeColors[theme].accent,
                  background: themeColors[theme].accent + "12",
                }}
              >
                Live Profile Scan
              </span>
            </div>
            <h3
              className="mt-1 font-[var(--font-heading),Bahnschrift,sans-serif] text-4xl font-extrabold tracking-[-0.03em]"
              style={{ color: verdictTextColor }}
            >
              {verdictLabel}
            </h3>
            <p className="mt-1 text-sm" style={{ color: themeColors[theme].isDark ? "#94a3b8" : "#64748b" }}>
              Summary of the live fraud decision for this transaction.
            </p>
          </div>
          <span
            className="rounded-full border px-3 py-1.5 text-[0.62rem] font-black uppercase tracking-[0.13em]"
            style={{ borderColor: riskColor + "55", color: riskColor, background: riskColor + "14" }}
          >
            {verdictLabel}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col  space-y-4 px-6 py-5">
        <p className="mt-1 text-sm" style={{ color: themeColors[theme].isDark ? "#e2e8f0" : "#0f172a" }}>
          Summary
        </p>
        <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
          <div
            className="rounded-xl border px-4 py-4"
            style={{ borderColor: themeColors[theme].accent + "30", background: themeColors[theme].accent + "08" }}
          >
            <p
              className="text-[0.62rem] font-bold uppercase tracking-[0.12em]"
              style={{ color: themeColors[theme].accent + "B3" }}
            >
              Transaction Details
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {detailItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border px-3 py-2.5"
                  style={{
                    borderColor: themeColors[theme].accent + "24",
                    background: themeColors[theme].isDark ? "rgba(15,23,42,0.34)" : "rgba(255,255,255,0.72)",
                  }}
                >
                  <p
                    className="text-[0.58rem] font-bold uppercase tracking-[0.12em]"
                    style={{ color: themeColors[theme].accent + "A6" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="mt-1 text-[0.7rem] font-extrabold"
                    style={{ color: themeColors[theme].isDark ? "#e2e8f0" : "#0f172a" }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-xl border px-4 py-4"
            style={{ borderColor: themeColors[theme].accent + "30", background: themeColors[theme].accent + "08" }}
          >
            <div className="flex items-center justify-between gap-4">
              <RingMeter value={prediction.confidence} level={prediction.risk_level} theme={theme} />
              <div className={chipClass} style={chipStyle}>
                {verdictLabel}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {metricItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border px-3 py-2.5"
                  style={{
                    borderColor: themeColors[theme].accent + "24",
                    background: themeColors[theme].isDark ? "rgba(15,23,42,0.34)" : "rgba(255,255,255,0.72)",
                  }}
                >
                  <p
                    className="text-[0.50rem] font-bold uppercase tracking-[0.12em]"
                    style={{ color: themeColors[theme].accent + "A6" }}
                  >
                    {item.label}
                  </p>
                  <p className="mt-1 text-[0.7rem] font-extrabold" style={{ color: item.tone }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="rounded-lg border px-3 py-3"
          style={{ borderColor: themeColors[theme].accent + "30", background: themeColors[theme].accent + "08" }}
        >
          <p
            className="text-[0.6rem] font-bold uppercase tracking-[0.12em]"
            style={{ color: themeColors[theme].accent + "B3" }}
          >
            Result Accuracy Level
          </p>
          <h4
            className="mt-1 text-base font-extrabold"
            style={{ color: themeColors[theme].isDark ? "#f8fafc" : "#0f172a" }}
          >
            {resultSummaryTitle}
          </h4>
          <p className="mt-2 text-sm leading-6" style={{ color: themeColors[theme].isDark ? "#94a3b8" : "#64748b" }}>
            {resultSummaryText}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {resultBadges.map((item) => (
              <span
                key={item}
                className="rounded-full border px-2.5 py-1 text-[0.62rem] font-black uppercase tracking-[0.1em]"
                style={{
                  borderColor: themeColors[theme].accent + "55",
                  color: themeColors[theme].isDark ? "#e2e8f0" : "#0f172a",
                  background: themeColors[theme].accent + "14",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {error ? (
          <p
            className="rounded-lg px-3 py-2 text-sm font-semibold"
            style={{
              background: themeColors[theme].isDark ? "#bf050515" : "#bf05050a",
              borderColor: "#bf050540",
              border: "1px solid",
              color: "#bf0505",
            }}
          >
            {error}
          </p>
        ) : null}
      </div>
    </article>
  );
}
