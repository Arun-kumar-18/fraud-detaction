"use client";

import { appearDelay, themeColors } from "./theme";
import { Prediction, ThemeType } from "./types";

interface RiskSignalsPanelProps {
  theme: ThemeType;
  prediction: Prediction;
  resultVersion: number;
}

export function RiskSignalsPanel({ theme, prediction, resultVersion }: RiskSignalsPanelProps) {
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

  const signalCount = prediction.signals.length;

  return (
    <article
      key={`signals-${resultVersion}`}
      className="relative overflow-hidden rounded-[28px] border shadow-2xl backdrop-blur-sm"
      style={{
        background: themeColors[theme].isDark
          ? "linear-gradient(135deg, rgba(15,23,42,0.82) 0%, rgba(30,41,59,0.64) 100%)"
          : "linear-gradient(145deg, rgba(255,255,255,0.94) 0%, rgba(248,250,252,0.98) 100%)",
        borderColor: themeColors[theme].accent + "40",
        boxShadow: `0 18px 42px ${themeColors[theme].accent}1A`,
        animation: "slideUpIn 500ms ease forwards",
        animationDelay: appearDelay(2),
      }}
    >
      <div
        className="pointer-events-none absolute -left-8 top-0 h-24 w-24 rounded-full blur-3xl"
        style={{ background: themeColors[theme].accent + "16" }}
      />

      <div className="border-b px-6 py-4" style={{ borderColor: themeColors[theme].accent + "30" }}>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.1em]" style={{ color: themeColors[theme].accent }}>
              Detected Risk Signals
            </p>
            <h3
              className="mt-1 font-[var(--font-heading),Bahnschrift,sans-serif] text-2xl font-bold tracking-[-0.02em]"
              style={{ color: themeColors[theme].isDark ? "#f8fafc" : "#0f172a" }}
            >
              Triggered Patterns
            </h3>
            <p className="mt-1 text-sm" style={{ color: themeColors[theme].isDark ? "#94a3b8" : "#64748b" }}>
              Clean explanation cards showing the strongest fraud reasons picked by the model.
            </p>
          </div>

          <div
            className="rounded-2xl border px-4 py-2.5"
            style={{
              borderColor: themeColors[theme].accent + "35",
              background: themeColors[theme].accent + "10",
            }}
          >
            <p
              className="text-[0.58rem] font-bold uppercase tracking-[0.12em]"
              style={{ color: themeColors[theme].accent + "B3" }}
            >
              Active signals
            </p>
            <p
              className="mt-1 text-right text-lg font-extrabold"
              style={{ color: themeColors[theme].isDark ? "#e2e8f0" : "#0f172a" }}
            >
              {signalCount}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 px-6 py-5 md:grid-cols-2">
        {prediction.signals.length > 0 ? (
          prediction.signals.map((signal, index) => {
            const type = signalType(signal);

            return (
              <div
                key={`${signal}-${index}`}
                className="group flex h-full items-start gap-3 rounded-xl border px-4 py-3 transition duration-200 hover:-translate-y-0.5"
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
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base"
                  style={{ background: type.bg, color: type.tone }}
                >
                  {signalIcon(signal)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className="text-sm font-semibold"
                      style={{ color: themeColors[theme].isDark ? "#e2e8f0" : "#111827" }}
                    >
                      {signal}
                    </p>
                    <span
                      className="rounded-full border px-2 py-0.5 text-[0.55rem] font-black uppercase tracking-[0.11em]"
                      style={{ color: type.tone, borderColor: type.tone + "80", background: type.bg }}
                    >
                      {type.label}
                    </span>
                  </div>
                  <p
                    className="mt-1 text-[0.72rem]"
                    style={{ color: themeColors[theme].isDark ? "#94a3b8" : "#64748b" }}
                  >
                    Model trigger highlighted for this transaction profile.
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div
            className="col-span-full rounded-xl border border-dashed px-4 py-6 text-center"
            style={{
              borderColor: themeColors[theme].accent + "35",
              background: themeColors[theme].accent + "08",
            }}
          >
            <p className="text-sm font-semibold" style={{ color: themeColors[theme].isDark ? "#e2e8f0" : "#0f172a" }}>
              No signals yet
            </p>
            <p className="mt-1 text-xs" style={{ color: themeColors[theme].isDark ? "#94a3b8" : "#64748b" }}>
              Run a check to populate the risk trigger cards here.
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
