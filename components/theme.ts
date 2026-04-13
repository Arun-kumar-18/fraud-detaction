import { Prediction, ThemeConfig, ThemeType } from "./types";

export const themeColors: Record<ThemeType, ThemeConfig> = {
  cyber: {
    primary: "cyan",
    secondary: "blue",
    accent: "#06b6d4",
    text: "slate-300",
    border: "cyan-500",
    bg: "from-cyan-500/5 to-blue-500/5",
    input: "border-cyan-600/30 bg-slate-900/50 focus:border-cyan-500 focus:ring-cyan-500",
    button: "from-cyan-600 to-blue-600 hover:shadow-cyan-500/40",
    isDark: true,
  },

  ember: {
    primary: "amber",
    secondary: "orange",
    accent: "#ea580c",
    text: "amber-100",
    border: "orange-500",
    bg: "from-amber-500/5 to-orange-500/5",
    input: "border-orange-500/30 bg-slate-900/55 focus:border-orange-400 focus:ring-orange-400",
    button: "from-orange-600 to-amber-600 hover:shadow-orange-500/40",
    isDark: true,
  },
  teal: {
    primary: "teal",
    secondary: "cyan",
    accent: "#0f766e",
    text: "teal-900",
    border: "teal-300",
    bg: "from-teal-50 to-cyan-50",
    input: "border-teal-300 bg-white focus:border-teal-500 focus:ring-teal-200",
    button: "from-teal-600 to-cyan-600 hover:shadow-teal-400/40",
    isDark: false,
  },
  white: {
    primary: "white",
    secondary: "sky",
    accent: "#0369a1",
    text: "slate-700",
    border: "sky-300",
    bg: "from-white to-sky-100",
    input: "border-sky-300 bg-white focus:border-sky-500 focus:ring-sky-200",
    button: "from-sky-700 to-blue-700 hover:shadow-sky-400/40",
    isDark: false,
  },
};

export const initialPrediction: Prediction = {
  label: "Legit",
  is_fraud: false,
  risk_level: "Low",
  confidence: 0,
  signals: [],
  inference_ms: 0,
};

export const countries = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "MX", name: "Mexico" },
  { code: "BR", name: "Brazil" },
  { code: "AR", name: "Argentina" },
  { code: "GB", name: "United Kingdom" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "NL", name: "Netherlands" },
  { code: "SE", name: "Sweden" },
  { code: "NO", name: "Norway" },
  { code: "CH", name: "Switzerland" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "IN", name: "India" },
  { code: "PK", name: "Pakistan" },
  { code: "BD", name: "Bangladesh" },
  { code: "CN", name: "China" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" },
  { code: "SG", name: "Singapore" },
  { code: "AU", name: "Australia" },
  { code: "NZ", name: "New Zealand" },
  { code: "ZA", name: "South Africa" },
  { code: "RU", name: "Russia" },
  { code: "IR", name: "Iran" },
  { code: "SY", name: "Syria" },
  { code: "KP", name: "North Korea" },
];

export function appearDelay(index: number): string {
  const delay = Math.min(index, 6) * 70;
  return `${delay}ms`;
}

export const darkThemes: ThemeType[] = ["cyber", "ember"];
export const lightThemes: ThemeType[] = ["teal", "white"];

export const themeDisplayLabels: Record<ThemeType, string> = {
  cyber: "Cyber",
  ember: "Ember",
  teal: "Teal",
  white: "White",
};
