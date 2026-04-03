"use client";

import { appearDelay, themeColors } from "./theme";
import { Prediction, ThemeType } from "./types";
import { RingMeter } from "./ringMeter";

interface ResultsPanelProps {
  theme: ThemeType;
  prediction: Prediction;
  chipClass: string;
  chipStyle?: React.CSSProperties;
  resultVersion: number;
  error: string | null;
}

export function ResultsPanel({ theme, prediction, chipClass, chipStyle, resultVersion, error }: ResultsPanelProps) {
  const verdictLabel = prediction.is_fraud ? "Fraud" : "Legit";
  const confidenceLabel = `${prediction.confidence}%`;
  const riskColor =
    prediction.risk_level === "High"
      ? "#dc2626"
      : prediction.risk_level === "Medium"
        ? "#ea580c"
        : themeColors[theme].accent;
  const verdictColor = riskColor;
  const verdictTextColor = prediction.is_fraud ? "#dc2626" : riskColor;

  const signalIcon = (signal: string): string => {
    const lower = signal.toLowerCase();
    if (lower.includes("amount") || lower.includes("velocity")) return "📈";
    if (lower.includes("device") || lower.includes("fingerprint")) return "🧬";
    if (lower.includes("country") || lower.includes("geo") || lower.includes("cross")) return "🌍";
    if (lower.includes("network") || lower.includes("graph") || lower.includes("neighbor")) return "🕸️";
    return "⚠️";
  };

  const signalType = (
    signal: string,
  ): { label: string; tone: string; bg: string; surface: string; borderStyle: "solid" | "dashed"; stripe: string } => {
    const lower = signal.toLowerCase();
    if (lower.includes("amount") || lower.includes("velocity")) {
      return {
        label: "Behavior",
        tone: "#f59e0b",
        bg: "#f59e0b1A",
        surface: "linear-gradient(140deg, rgba(245,158,11,0.13) 0%, rgba(245,158,11,0.04) 100%)",
        borderStyle: "solid",
        stripe: "#f59e0b",
      };
    }
    if (lower.includes("device") || lower.includes("fingerprint")) {
      return {
        label: "Device",
        tone: "#8b5cf6",
        bg: "#8b5cf61A",
        surface: "linear-gradient(140deg, rgba(139,92,246,0.13) 0%, rgba(139,92,246,0.04) 100%)",
        borderStyle: "dashed",
        stripe: "#8b5cf6",
      };
    }
    if (lower.includes("country") || lower.includes("geo") || lower.includes("cross")) {
      return {
        label: "Geo",
        tone: "#0ea5e9",
        bg: "#0ea5e91A",
        surface: "linear-gradient(140deg, rgba(14,165,233,0.13) 0%, rgba(14,165,233,0.04) 100%)",
        borderStyle: "solid",
        stripe: "#0ea5e9",
      };
    }
    if (lower.includes("network") || lower.includes("graph") || lower.includes("neighbor")) {
      return {
        label: "Network",
        tone: "#ef4444",
        bg: "#ef44441A",
        surface: "linear-gradient(140deg, rgba(239,68,68,0.13) 0%, rgba(239,68,68,0.04) 100%)",
        borderStyle: "dashed",
        stripe: "#ef4444",
      };
    }
    return {
      label: "Risk",
      tone: themeColors[theme].accent,
      bg: themeColors[theme].accent + "1A",
      surface: `linear-gradient(140deg, ${themeColors[theme].accent}1F 0%, ${themeColors[theme].accent}08 100%)`,
      borderStyle: "solid",
      stripe: themeColors[theme].accent,
    };
  };

  return (
    <div key={resultVersion} className="grid gap-5">
      <article
        className="overflow-hidden rounded-2xl border shadow-2xl"
        style={{
          background: themeColors[theme].isDark
            ? "linear-gradient(135deg, rgba(15,23,42,0.82) 0%, rgba(30,41,59,0.64) 100%)"
            : "linear-gradient(145deg, rgba(255,255,255,0.94) 0%, rgba(241,245,249,0.97) 100%)",
          borderColor: themeColors[theme].accent + "40",
          boxShadow: `0 18px 42px ${themeColors[theme].accent}1F`,
          animation: "slideUpIn 500ms ease forwards",
        }}
      >
        <div className="border-b px-6 py-5" style={{ borderColor: themeColors[theme].accent + "30" }}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p
                className="text-[0.64rem] font-bold uppercase tracking-[0.14em]"
                style={{ color: themeColors[theme].accent + "B3" }}
              >
                Analysis Verdict
              </p>
              <h3
                className="mt-1 font-[var(--font-heading),Bahnschrift,sans-serif] text-4xl font-extrabold tracking-[-0.03em]"
                style={{ color: verdictTextColor }}
              >
                {verdictLabel}
              </h3>
            </div>
            <span
              className="rounded-full border px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.13em]"
              style={{ borderColor: verdictColor + "55", color: verdictColor, background: verdictColor + "14" }}
            >
              {prediction.is_fraud ? "Fraud Detected" : "Cleared"}
            </span>
          </div>
        </div>

        <div className="space-y-4 px-6 py-5">
          <div className="flex items-center justify-between gap-4">
            <RingMeter value={prediction.confidence} level={prediction.risk_level} theme={theme} />
            <div className={chipClass} style={chipStyle}>
              {prediction.label}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div
              className="rounded-lg border px-3 py-2"
              style={{ borderColor: themeColors[theme].accent + "30", background: themeColors[theme].accent + "08" }}
            >
              <p
                className="text-[0.6rem] font-bold uppercase tracking-[0.12em]"
                style={{ color: themeColors[theme].accent + "B3" }}
              >
                Confidence
              </p>
              <p
                className="mt-1 text-lg font-extrabold"
                style={{ color: themeColors[theme].isDark ? "#e2e8f0" : "#0f172a" }}
              >
                {confidenceLabel}
              </p>
            </div>
            <div
              className="rounded-lg border px-3 py-2"
              style={{ borderColor: themeColors[theme].accent + "30", background: themeColors[theme].accent + "08" }}
            >
              <p
                className="text-[0.6rem] font-bold uppercase tracking-[0.12em]"
                style={{ color: themeColors[theme].accent + "B3" }}
              >
                Risk Level
              </p>
              <p className="mt-1 text-lg font-extrabold" style={{ color: verdictColor }}>
                {prediction.risk_level}
              </p>
            </div>
            <div
              className="rounded-lg border px-3 py-2"
              style={{ borderColor: themeColors[theme].accent + "30", background: themeColors[theme].accent + "08" }}
            >
              <p
                className="text-[0.6rem] font-bold uppercase tracking-[0.12em]"
                style={{ color: themeColors[theme].accent + "B3" }}
              >
                Inference
              </p>
              <p
                className="mt-1 text-lg font-extrabold"
                style={{ color: themeColors[theme].isDark ? "#e2e8f0" : "#0f172a" }}
              >
                {prediction.inference_ms} ms
              </p>
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

      <article
        className="overflow-hidden rounded-2xl border shadow-2xl"
        style={{
          background: themeColors[theme].isDark
            ? "linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(30,41,59,0.6) 100%)"
            : "linear-gradient(145deg, rgba(255,255,255,0.92) 0%, rgba(248,250,252,0.98) 100%)",
          borderColor: themeColors[theme].accent + "40",
          boxShadow: `0 16px 38px ${themeColors[theme].accent}1A`,
          animation: "slideUpIn 500ms ease forwards",
          animationDelay: appearDelay(2),
        }}
      >
        <div className="border-b px-6 py-4" style={{ borderColor: themeColors[theme].accent + "30" }}>
          <p className="text-xs font-bold uppercase tracking-[0.1em]" style={{ color: themeColors[theme].accent }}>
            Detected Risk Signals
          </p>
        </div>

        <div className="grid gap-2.5 px-6 py-5">
          {prediction.signals.length > 0 ? (
            prediction.signals.map((signal, index) => {
              const type = signalType(signal);

              return (
                <div
                  key={signal}
                  className="flex items-center gap-3 rounded-lg border px-3 py-2.5"
                  style={{
                    background: type.surface,
                    borderColor: type.tone + "66",
                    borderStyle: type.borderStyle,
                    boxShadow: `inset 3px 0 0 ${type.stripe}`,
                    animation: "slideUpIn 500ms ease forwards",
                    animationDelay: appearDelay(index + 3),
                  }}
                >
                  <span
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-sm"
                    style={{ background: type.bg, color: type.tone }}
                  >
                    {signalIcon(signal)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className="truncate text-sm font-semibold"
                      style={{ color: themeColors[theme].isDark ? "#e2e8f0" : "#111827" }}
                    >
                      {signal}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <p
                        className="text-[0.62rem] font-bold uppercase tracking-[0.12em]"
                        style={{ color: themeColors[theme].isDark ? "#94a3b8" : "#64748b" }}
                      >
                        Model Trigger
                      </p>
                      <span
                        className="rounded-full border px-2 py-0.5 text-[0.55rem] font-black uppercase tracking-[0.11em]"
                        style={{ color: type.tone, borderColor: type.tone + "80", background: type.bg }}
                      >
                        {type.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <span className="text-xs" style={{ color: themeColors[theme].isDark ? "#94a3b8" : "#64748b" }}>
              No signals detected
            </span>
          )}
        </div>
      </article>
    </div>
  );
}
