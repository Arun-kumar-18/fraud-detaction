"use client";

import { appearDelay, themeColors } from "./theme";
import { Prediction, ThemeType } from "./types";

interface AccuracyFlowChartProps {
  theme: ThemeType;
  prediction: Prediction;
  resultVersion: number;
}

export function AccuracyFlowChart({ theme, prediction, resultVersion }: AccuracyFlowChartProps) {
  const riskColor =
    prediction.risk_level === "High"
      ? "#dc2626"
      : prediction.risk_level === "Medium"
        ? "#ea580c"
        : themeColors[theme].accent;

  const confidenceLabel = `${prediction.confidence}%`;
  const outputLabel =
    prediction.label ||
    (prediction.risk_level === "High"
      ? "Fraud Detected"
      : prediction.risk_level === "Medium"
        ? "Needs Review"
        : "Legit");
  const stageItems = [
    `Output: ${outputLabel}`,
    `Risk Level: ${prediction.risk_level}`,
    `Confidence: ${confidenceLabel}`,
    prediction.risk_level === "High"
      ? "Recommended Action: Block"
      : prediction.risk_level === "Medium"
        ? "Recommended Action: Review"
        : "Recommended Action: Approve",
  ];

  const flowReadings =
    prediction.confidence === 0
      ? [0, 0, 0, 0, 0, 0, 0, 0]
      : [
          0,
          Math.max(prediction.confidence * 0.14, 4),
          Math.max(prediction.confidence * 0.06, 2),
          Math.max(prediction.confidence * 0.42, 12),
          Math.max(prediction.confidence * 0.2, 6),
          Math.max(prediction.confidence * 0.7, 18),
          Math.max(prediction.confidence * 0.34, 8),
          prediction.confidence,
        ];

  const chartWidth = 420;
  const chartHeight = 132;
  const chartPadding = 14;
  const flowCoords = flowReadings.map((reading, index) => {
    const x = chartPadding + (index * (chartWidth - chartPadding * 2)) / (flowReadings.length - 1);
    const normalized = Math.max(0, Math.min(100, reading));
    const y = chartHeight - chartPadding - (normalized / 100) * (chartHeight - chartPadding * 2);
    return { x, y };
  });
  const chartPoints = flowCoords.map((point) => `${point.x},${point.y}`).join(" ");
  const areaPoints = `${chartPadding},${chartHeight - chartPadding} ${chartPoints} ${chartWidth - chartPadding},${chartHeight - chartPadding}`;
  const lastPoint = flowCoords[flowCoords.length - 1];

  return (
    <article
      key={`flow-${resultVersion}`}
      className="relative overflow-hidden rounded-[28px] border shadow-2xl backdrop-blur-sm"
      style={{
        background: themeColors[theme].isDark
          ? "linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(30,41,59,0.6) 100%)"
          : "linear-gradient(145deg, rgba(255,255,255,0.92) 0%, rgba(248,250,252,0.98) 100%)",
        borderColor: themeColors[theme].accent + "40",
        boxShadow: `0 16px 38px ${themeColors[theme].accent}1A`,
        animation: "slideUpIn 500ms ease forwards",
        animationDelay: appearDelay(3),
      }}
    >
      <div
        className="pointer-events-none absolute -right-8 top-0 h-24 w-24 rounded-full blur-3xl"
        style={{ background: riskColor + "16" }}
      />

      <div className="border-b px-6 py-4" style={{ borderColor: themeColors[theme].accent + "30" }}>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.1em]" style={{ color: themeColors[theme].accent }}>
              Accuracy Flow Chart
            </p>
            <h3
              className="mt-1 font-[var(--font-heading),Bahnschrift,sans-serif] text-2xl font-bold tracking-[-0.02em]"
              style={{ color: themeColors[theme].isDark ? "#f8fafc" : "#0f172a" }}
            >
              Score Pulse Timeline
            </h3>
            <p className="mt-1 text-sm" style={{ color: themeColors[theme].isDark ? "#94a3b8" : "#64748b" }}>
              A heartbeat-style view of the final output confidence and fraud risk level.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div
              className="rounded-2xl border px-3 py-2"
              style={{ borderColor: themeColors[theme].accent + "35", background: themeColors[theme].accent + "10" }}
            >
              <p
                className="text-[0.55rem] font-bold uppercase tracking-[0.12em]"
                style={{ color: themeColors[theme].accent + "B3" }}
              >
                Start
              </p>
              <p
                className="mt-1 text-sm font-extrabold"
                style={{ color: themeColors[theme].isDark ? "#e2e8f0" : "#0f172a" }}
              >
                0%
              </p>
            </div>
            <div
              className="rounded-2xl border px-3 py-2"
              style={{ borderColor: riskColor + "35", background: riskColor + "10" }}
            >
              <p className="text-[0.55rem] font-bold uppercase tracking-[0.12em]" style={{ color: riskColor }}>
                Final
              </p>
              <p className="mt-1 text-sm font-extrabold" style={{ color: riskColor }}>
                {confidenceLabel}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-5">
        <div
          className="rounded-[22px] border px-4 py-4"
          style={{ borderColor: themeColors[theme].accent + "30", background: themeColors[theme].accent + "08" }}
        >
          <div
            className="mb-3 flex items-center justify-between text-[0.62rem] font-bold uppercase tracking-[0.12em]"
            style={{ color: themeColors[theme].accent + "B3" }}
          >
            <span>Result pulse</span>
            <span>{outputLabel} confidence</span>
          </div>

          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="h-36 w-full overflow-visible">
            <defs>
              <linearGradient id="riskFlowStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={themeColors[theme].accent} stopOpacity="0.35" />
                <stop offset="100%" stopColor={riskColor} stopOpacity="1" />
              </linearGradient>
              <linearGradient id="riskFlowArea" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={riskColor} stopOpacity="0.18" />
                <stop offset="100%" stopColor={riskColor} stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {[0, 25, 50, 75, 100].map((mark) => {
              const y = chartHeight - chartPadding - (mark / 100) * (chartHeight - chartPadding * 2);
              return (
                <line
                  key={mark}
                  x1={chartPadding}
                  x2={chartWidth - chartPadding}
                  y1={y}
                  y2={y}
                  stroke={themeColors[theme].accent + "22"}
                  strokeDasharray="4 6"
                />
              );
            })}

            <polygon points={areaPoints} fill="url(#riskFlowArea)" />
            <polyline
              fill="none"
              stroke="url(#riskFlowStroke)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={chartPoints}
            />
            {flowCoords.map((point, index) => (
              <circle
                key={`${point.x}-${point.y}-${index}`}
                cx={point.x}
                cy={point.y}
                r={index === flowCoords.length - 1 ? 4.5 : 2.5}
                fill={index === flowCoords.length - 1 ? riskColor : themeColors[theme].accent}
              />
            ))}
            <circle cx={lastPoint.x} cy={lastPoint.y} r="7" fill={riskColor + "22"} />
            <circle cx={lastPoint.x} cy={lastPoint.y} r="4" fill={riskColor} />
          </svg>

          <div className="mt-4 flex flex-wrap gap-2">
            {stageItems.map((item) => (
              <span
                key={item}
                className="rounded-full border px-2.5 py-1 text-[0.62rem] font-black uppercase tracking-[0.1em]"
                style={{
                  borderColor: themeColors[theme].accent + "45",
                  background: themeColors[theme].accent + "10",
                  color: themeColors[theme].isDark ? "#e2e8f0" : "#0f172a",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
