export type ThemeType = "cyber" | "ember" | "teal" | "white";

export type RiskLevel = "Low" | "Medium" | "High";

export interface Prediction {
  label: string;
  is_fraud: boolean;
  risk_level: RiskLevel;
  confidence: number;
  signals: string[];
  inference_ms: number;
}

export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  border: string;
  bg: string;
  input: string;
  button: string;
  isDark?: boolean;
}
