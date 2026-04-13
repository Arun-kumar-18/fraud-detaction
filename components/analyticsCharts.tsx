"use client";

import { themeColors } from "./theme";
import { Prediction, ThemeType } from "./types";

interface AnalyticsChartsProps {
  theme: ThemeType;
  prediction: Prediction;
  resultVersion: number;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function AnalyticsCharts({ theme, prediction, resultVersion }: AnalyticsChartsProps) {
  const palette = themeColors[theme];
  const confidence = clamp(Math.round(prediction.confidence || 0), 0, 100);
  const fraudShare = confidence;
  const legitShare = 100 - fraudShare;

  const fallbackBreakdown = [
    { label: "Amount", value: Math.max(6, Math.round(confidence * 0.34)) },
    { label: "Country", value: Math.max(4, Math.round(confidence * 0.2)) },
    { label: "Device", value: Math.max(3, Math.round(confidence * 0.16)) },
    { label: "Merchant", value: Math.max(5, Math.round(confidence * 0.22)) },
  ];

  const breakdown = prediction.breakdown?.length ? prediction.breakdown : fallbackBreakdown;
  const totalBreakdown = breakdown.reduce((sum, item) => sum + item.value, 0) || 1;

  let running = 0;
  const pulseSteps = [
    { label: "Start", score: 0, note: "Baseline" },
    ...breakdown.map((item) => {
      running += item.value;
      return {
        label: item.label,
        score: clamp(Math.round((running / totalBreakdown) * confidence), 0, 100),
        note: `+${Math.round(item.value)}%`,
      };
    }),
    { label: "Final", score: confidence, note: prediction.risk_level },
  ];

  const trendValues = [0.34, 0.46, 0.42, 0.58, 0.68, 0.82, 1].map((factor, index) => {
    const lift = prediction.risk_level === "High" ? index * 3 : prediction.risk_level === "Medium" ? index * 2 : index;
    return clamp(Math.round(confidence * factor + lift + (prediction.is_fraud ? 4 : 0)), 4, 100);
  });
  trendValues[trendValues.length - 1] = confidence;

  const svgWidth = 320;
  const svgHeight = 140;
  const paddingX = 14;
  const paddingBottom = 14;
  const usableHeight = svgHeight - 28;

  const coordinates = trendValues.map((value, index) => {
    const x = paddingX + (index / (trendValues.length - 1)) * (svgWidth - paddingX * 2);
    const y = svgHeight - paddingBottom - (value / 100) * usableHeight;
    return { x, y, value };
  });

  const linePath = coordinates.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const areaPath = `${linePath} L ${svgWidth - paddingX} ${svgHeight - paddingBottom} L ${paddingX} ${svgHeight - paddingBottom} Z`;

  const barItems = [
    {
      label: "Low",
      value:
        prediction.risk_level === "Low"
          ? 100
          : prediction.risk_level === "Medium"
            ? clamp(72 + Math.round(confidence * 0.12), 74, 96)
            : clamp(56 + Math.round(confidence * 0.18), 62, 92),
      color: "#10b981",
    },
    {
      label: "Medium",
      value:
        prediction.risk_level === "Low"
          ? 0
          : prediction.risk_level === "Medium"
            ? clamp(48 + Math.round(confidence * 0.4), 52, 90)
            : clamp(62 + Math.round(confidence * 0.24), 66, 94),
      color: "#f59e0b",
    },
    {
      label: "High",
      value: prediction.risk_level === "High" ? clamp(70 + Math.round(confidence * 0.24), 76, 100) : 0,
      color: "#ef4444",
    },
  ];

  const cardStyle = {
    borderColor: palette.accent + "30",
    background: palette.isDark ? "rgba(15,23,42,0.52)" : "rgba(255,255,255,0.88)",
  };

  const textTone = palette.isDark ? "#e2e8f0" : "#0f172a";
  const mutedTone = palette.isDark ? "#94a3b8" : "#64748b";

  return (
    <section
      key={resultVersion}
      className="grid gap-6 xl:grid-cols-2"
      style={{ animation: "slideUpIn 480ms ease forwards" }}
    >
      <article className="rounded-[24px] border p-5 shadow-xl backdrop-blur-sm" style={cardStyle}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p
              className="text-[0.62rem] font-bold uppercase tracking-[0.14em]"
              style={{ color: palette.accent + "B3" }}
            >
              Score Pulse Timeline
            </p>
            <h3 className="mt-1 text-lg font-extrabold" style={{ color: textTone }}>
              Risk score journey
            </h3>
          </div>
          <span
            className="rounded-full border px-3 py-1 text-[0.6rem] font-black uppercase tracking-[0.12em]"
            style={{ borderColor: palette.accent + "45", color: palette.accent, background: palette.accent + "12" }}
          >
            {confidence}% final
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {pulseSteps.map((step, index) => (
            <div key={`${step.label}-${index}`} className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
              <span
                className="h-3 w-3 rounded-full"
                style={{
                  background: index === pulseSteps.length - 1 ? "#ef4444" : palette.accent,
                  boxShadow: `0 0 0 4px ${palette.accent}1F`,
                }}
              />
              <div>
                <div
                  className="flex items-center justify-between gap-3 text-sm font-semibold"
                  style={{ color: textTone }}
                >
                  <span>{step.label}</span>
                  <span style={{ color: mutedTone }}>{step.note}</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full" style={{ background: palette.accent + "14" }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${step.score}%`,
                      background:
                        index === pulseSteps.length - 1
                          ? "linear-gradient(90deg, #fb7185 0%, #ef4444 100%)"
                          : `linear-gradient(90deg, ${palette.accent}99 0%, ${palette.accent} 100%)`,
                    }}
                  />
                </div>
              </div>
              <span className="text-xs font-black" style={{ color: textTone }}>
                {step.score}%
              </span>
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-[24px] border p-5 shadow-xl backdrop-blur-sm" style={cardStyle}>
        <div>
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em]" style={{ color: palette.accent + "B3" }}>
            Pie Chart
          </p>
          <h3 className="mt-1 text-lg font-extrabold" style={{ color: textTone }}>
            Fraud vs Legit split
          </h3>
        </div>

        <div className="mt-4 flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div
            className="relative h-36 w-36 rounded-full border"
            style={{
              borderColor: palette.accent + "30",
              background: `conic-gradient(#ef4444 0 ${fraudShare}%, ${palette.accent} ${fraudShare}% 100%)`,
            }}
          >
            <div
              className="absolute inset-5 flex items-center justify-center rounded-full border text-center"
              style={{
                borderColor: palette.accent + "26",
                background: palette.isDark ? "rgba(15,23,42,0.88)" : "rgba(255,255,255,0.95)",
                color: textTone,
              }}
            >
              <div>
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.12em]" style={{ color: mutedTone }}>
                  Fraud share
                </p>
                <p className="text-2xl font-black">{fraudShare}%</p>
              </div>
            </div>
          </div>

          <div className="w-full max-w-[230px] space-y-3">
            {[
              { label: "Fraud", value: fraudShare, color: "#ef4444" },
              { label: "Legit", value: legitShare, color: palette.accent },
            ].map((item) => (
              <div key={item.label}>
                <div
                  className="mb-1 flex items-center justify-between text-sm font-semibold"
                  style={{ color: textTone }}
                >
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
                    {item.label}
                  </span>
                  <span>{item.value}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full" style={{ background: palette.accent + "14" }}>
                  <div className="h-full rounded-full" style={{ width: `${item.value}%`, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      <article className="rounded-[24px] border p-5 shadow-xl backdrop-blur-sm" style={cardStyle}>
        <div>
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em]" style={{ color: palette.accent + "B3" }}>
            Line Chart
          </p>
          <h3 className="mt-1 text-lg font-extrabold" style={{ color: textTone }}>
            Transactions trend
          </h3>
        </div>

        <div className="mt-4">
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="h-40 w-full overflow-visible">
            <path d={areaPath} fill={palette.accent + "1A"} />
            <path d={linePath} fill="none" stroke={palette.accent} strokeWidth="3" strokeLinecap="round" />
            {coordinates.map((point, index) => (
              <g key={`${point.x}-${point.y}-${index}`}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="4.5"
                  fill={index === coordinates.length - 1 ? "#ef4444" : palette.accent}
                />
              </g>
            ))}
          </svg>

          <div
            className="mt-2 grid grid-cols-7 gap-2 text-center text-[0.65rem] font-bold"
            style={{ color: mutedTone }}
          >
            {["T-6", "T-5", "T-4", "T-3", "T-2", "T-1", "Now"].map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>
      </article>

      <article className="rounded-[24px] border p-5 shadow-xl backdrop-blur-sm" style={cardStyle}>
        <div>
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em]" style={{ color: palette.accent + "B3" }}>
            Bar Chart
          </p>
          <h3 className="mt-1 text-lg font-extrabold" style={{ color: textTone }}>
            Risk level intensity
          </h3>
        </div>

        <div className="mt-4 space-y-4">
          {barItems.map((item) => (
            <div key={item.label}>
              <div className="mb-1 flex items-center justify-between text-sm font-semibold" style={{ color: textTone }}>
                <span>{item.label}</span>
                <span>{item.value}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full" style={{ background: palette.accent + "14" }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${item.value}%`,
                    background: `linear-gradient(90deg, ${item.color}CC 0%, ${item.color} 100%)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
