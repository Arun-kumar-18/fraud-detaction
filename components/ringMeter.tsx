"use client";

import { RiskLevel, ThemeType } from "./types";
import { themeColors } from "./theme";

const RING_R = 52;
const RING_C = 2 * Math.PI * RING_R;

export function RingMeter({ value, level, theme }: { value: number; level: RiskLevel; theme: ThemeType }) {
  const filled = (value / 100) * RING_C;
  const isLightTheme = !themeColors[theme].isDark;
  const color = isLightTheme
    ? level === "High"
      ? "#dc2626"
      : level === "Medium"
        ? "#ea580c"
        : themeColors[theme].accent
    : level === "High"
      ? "#ff6b6b"
      : level === "Medium"
        ? "#f59e0b"
        : themeColors[theme].accent;
  const ringTrackColor = themeColors[theme].accent + "33";
  const labelColor =
    level === "High"
      ? "#dc2626"
      : level === "Medium"
        ? "#ea580c"
        : themeColors[theme].accent + "CC";

  return (
    <div className="relative h-[152px] w-[152px]">
      <svg width="152" height="152" viewBox="0 0 152 152">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx="76" cy="76" r={RING_R} fill="none" stroke={ringTrackColor} strokeWidth="12" filter="url(#glow)" />
        <circle
          cx="76"
          cy="76"
          r={RING_R}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${RING_C - filled}`}
          strokeDashoffset={RING_C * 0.25}
          filter="url(#glow)"
          style={{ transition: "stroke-dasharray 700ms ease", opacity: 0.95 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
        <span
          className="font-[var(--font-heading),Bahnschrift,sans-serif] text-3xl font-extrabold leading-none tracking-[-0.03em]"
          style={{ color }}
        >
          {value}%
        </span>
        <span className="text-[0.65rem] font-bold uppercase tracking-[0.1em]" style={{ color: labelColor }}>
          confidence
        </span>
      </div>
    </div>
  );
}
