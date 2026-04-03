"use client";

import { darkThemes, lightThemes, themeColors, themeDisplayLabels } from "./theme";
import { ThemeType } from "./types";

interface DashboardHeaderProps {
  theme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
}

export function DashboardHeader({ theme, onThemeChange }: DashboardHeaderProps) {
  return (
    <header
      className="mb-8 overflow-hidden rounded-2xl border px-6 py-6 shadow-2xl"
      style={{
        background: themeColors[theme].isDark
          ? "linear-gradient(135deg, rgb(15,23,42) 0%, rgb(30,41,59) 100%)"
          : "linear-gradient(135deg, rgb(248,250,252) 0%, rgb(241,245,249) 100%)",
        borderColor: themeColors[theme].accent + "30",
        boxShadow: `0 10px 30px ${themeColors[theme].accent}20`,
      }}
    >
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div
            className="rounded-xl border p-3 backdrop-blur-sm"
            style={{
              background: `linear-gradient(135deg, ${themeColors[theme].accent}33 0%, ${themeColors[theme].accent}19 100%)`,
              borderColor: themeColors[theme].accent + "4D",
            }}
          >
            <span className="text-4xl leading-none">🛡️</span>
          </div>
          <div>
            <h1
              className="font-[var(--font-heading),Bahnschrift,sans-serif] text-3xl font-bold tracking-[-0.02em]"
              style={{ color: themeColors[theme].isDark ? "white" : "#0f172a" }}
            >
              Fraud Detection
            </h1>
            <p
              className="mt-1 text-sm font-semibold uppercase tracking-[0.1em]"
              style={{ color: themeColors[theme].accent + "B3" }}
            >
              Transaction Security Dashboard
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 sm:flex-row sm:items-center">
          <div
            className="flex items-center gap-1 rounded-lg border p-1 backdrop-blur"
            style={{
              background: themeColors[theme].isDark ? "rgba(30,41,59,0.5)" : "rgba(248,250,252,0.5)",
              borderColor: themeColors[theme].accent + "40",
            }}
          >
            {darkThemes.map((t) => (
              <button
                key={t}
                onClick={() => onThemeChange(t)}
                className="rounded-md px-2.5 py-1.5 text-xs font-bold uppercase tracking-[0.08em] transition"
                style={{
                  background: theme === t ? themeColors[t].accent : "transparent",
                  color: theme === t ? "#ffffff" : themeColors[theme].isDark ? "#9ca3af" : "#64748b",
                  boxShadow: theme === t ? `0 0 15px ${themeColors[t].accent}66` : "none",
                }}
                title={`${themeDisplayLabels[t]} Theme`}
              >
                {themeDisplayLabels[t]}
              </button>
            ))}

            <div className="mx-1 h-6 w-px" style={{ background: themeColors[theme].accent + "40" }} />

            {lightThemes.map((t) => (
              <button
                key={t}
                onClick={() => onThemeChange(t)}
                className="rounded-md px-2.5 py-1.5 text-xs font-bold uppercase tracking-[0.08em] transition"
                style={{
                  background: theme === t ? themeColors[t].accent : "transparent",
                  color: theme === t ? "#ffffff" : themeColors[theme].isDark ? "#9ca3af" : "#64748b",
                  boxShadow: theme === t ? `0 0 15px ${themeColors[t].accent}66` : "none",
                }}
                title={`${themeDisplayLabels[t]} Theme`}
              >
                {themeDisplayLabels[t]}
              </button>
            ))}
          </div>

          <div
            className="flex items-center gap-3 rounded-xl border px-4 py-3 backdrop-blur"
            style={{
              background: themeColors[theme].isDark ? "rgba(30,41,59,0.5)" : "rgba(248,250,252,0.5)",
              borderColor: themeColors[theme].accent + "40",
            }}
          >
            <span
              className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50"
              aria-hidden="true"
            />
            <span
              className="text-xs font-bold uppercase tracking-[0.08em]"
              style={{ color: themeColors[theme].accent }}
            >
              Live & Active
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
