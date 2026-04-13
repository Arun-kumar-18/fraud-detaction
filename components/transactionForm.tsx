"use client";

import { countries, themeColors } from "./theme";
import { ThemeType } from "./types";

const labelClass = "grid gap-1.5 font-semibold text-slate-300";
const fieldLabelClass = "text-[0.74rem] font-bold uppercase tracking-[0.08em] text-cyan-400/80";

interface TransactionFormProps {
  theme: ThemeType;
  amount: string;
  country: string;
  deviceType: string;
  merchantCategory: string;
  loading: boolean;
  formError: string | null;
  onAmountChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  onDeviceTypeChange: (value: string) => void;
  onMerchantCategoryChange: (value: string) => void;
  onSubmit: () => void;
}

export function TransactionForm({
  theme,
  amount,
  country,
  deviceType,
  merchantCategory,
  loading,
  formError,
  onAmountChange,
  onCountryChange,
  onDeviceTypeChange,
  onMerchantCategoryChange,
  onSubmit,
}: TransactionFormProps) {
  const panelBackground = themeColors[theme].isDark
    ? "linear-gradient(135deg, rgba(15,23,42,0.78) 0%, rgba(30,41,59,0.58) 100%)"
    : "linear-gradient(135deg, rgba(247,250,252,0.9) 0%, rgba(241,245,249,0.95) 100%)";

  const inputBackground = themeColors[theme].isDark ? "rgba(2,6,23,0.45)" : "rgba(255,255,255,0.9)";

  return (
    <article
      className="relative flex h-full flex-col overflow-hidden rounded-[28px] border shadow-2xl backdrop-blur-sm"
      style={{
        background: panelBackground,
        borderColor: themeColors[theme].accent + "40",
        boxShadow: `0 20px 48px ${themeColors[theme].accent}1F`,
      }}
    >
      <div
        className="pointer-events-none absolute -left-8 top-0 h-24 w-24 rounded-full blur-3xl"
        style={{ background: themeColors[theme].accent + "18" }}
      />

      <div
        className="border-b px-6 py-5"
        style={{
          background: themeColors[theme].isDark
            ? "linear-gradient(to right, rgba(30,41,59,0.72) 0%, rgba(51,65,85,0.5) 100%)"
            : "linear-gradient(to right, rgba(255,255,255,0.75) 0%, rgba(241,245,249,0.68) 100%)",
          borderColor: themeColors[theme].accent + "30",
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-2xl">📈</span>
            <div>
              <h2
                className="font-[var(--font-heading),Bahnschrift,sans-serif] text-2xl font-bold tracking-[-0.02em]"
                style={{ color: themeColors[theme].isDark ? "white" : "#0f172a" }}
              >
                Transaction Details
              </h2>
              <p className="mt-1 text-sm" style={{ color: themeColors[theme].accent + "B3" }}>
                Analyze individual entry points against the global fraud graph.
              </p>
            </div>
          </div>

          <div
            className="rounded-2xl border px-3 py-2 text-center"
            style={{
              borderColor: themeColors[theme].accent + "30",
              background: themeColors[theme].accent + "10",
            }}
          >
            <p
              className="text-[0.55rem] font-bold uppercase tracking-[0.12em]"
              style={{ color: themeColors[theme].accent + "B3" }}
            >
              Intake
            </p>
            <p className="mt-1 text-xs" style={{ color: themeColors[theme].isDark ? "#e2e8f0" : "#0f172a" }}>
              Live Ready
            </p>
          </div>
        </div>
      </div>

      <div
        className="grid grid-cols-3 gap-3 border-b px-6 py-4"
        style={{ borderColor: themeColors[theme].accent + "26" }}
      >
        {[
          { label: "Model", value: "Adaptive Graph" },
          { label: "Latency", value: "~15 ms" },
          { label: "Status", value: "Profile-aware" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-lg border px-3 py-2"
            style={{
              borderColor: themeColors[theme].accent + "2E",
              background: themeColors[theme].isDark ? "rgba(15,23,42,0.4)" : "rgba(255,255,255,0.58)",
            }}
          >
            <p
              className="text-[0.62rem] font-bold uppercase tracking-[0.12em]"
              style={{ color: themeColors[theme].accent + "B3" }}
            >
              {item.label}
            </p>
            <p className="mt-1 text-xs font-bold" style={{ color: themeColors[theme].isDark ? "#e2e8f0" : "#0f172a" }}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <form
        className="flex flex-1 flex-col gap-4 px-6 py-6"
        action="#"
        method="get"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <label className={labelClass}>
          <span className={fieldLabelClass} style={{ color: themeColors[theme].accent }}>
            Transaction Amount (USD)
          </span>
          <input
            className="w-full rounded-xl border px-4 py-3 text-sm shadow-md transition focus:outline-none focus:ring-2"
            style={
              {
                borderColor: themeColors[theme].accent + "4D",
                background: inputBackground,
                color: themeColors[theme].isDark ? "#e2e8f0" : "#0f172a",
                boxShadow: `0 8px 18px ${themeColors[theme].accent}14`,
                "--tw-ring-color": themeColors[theme].accent + "4D",
              } as React.CSSProperties
            }
            type="number"
            value={amount}
            onChange={(event) => onAmountChange(event.target.value)}
            placeholder="Enter amount"
            min="1"
          />
        </label>

        <label className={labelClass}>
          <span className={fieldLabelClass} style={{ color: themeColors[theme].accent }}>
            Country
          </span>
          <select
            className="w-full rounded-xl border px-4 py-3 text-sm shadow-md transition focus:outline-none focus:ring-2"
            style={
              {
                borderColor: themeColors[theme].accent + "4D",
                background: inputBackground,
                color:
                  country === ""
                    ? themeColors[theme].isDark
                      ? "#94a3b8"
                      : "#cbd5e1"
                    : themeColors[theme].isDark
                      ? "#e2e8f0"
                      : "#0f172a",
                boxShadow: `0 8px 18px ${themeColors[theme].accent}14`,
                "--tw-ring-color": themeColors[theme].accent + "4D",
              } as React.CSSProperties
            }
            value={country}
            onChange={(event) => onCountryChange(event.target.value)}
          >
            <option value="" disabled>
              Select country
            </option>
            {countries.map((item) => (
              <option key={item.code} value={item.code}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        <label className={labelClass}>
          <span className={fieldLabelClass} style={{ color: themeColors[theme].accent }}>
            Device Type
          </span>
          <select
            className="w-full rounded-xl border px-4 py-3 text-sm shadow-md transition focus:outline-none focus:ring-2"
            style={
              {
                borderColor: themeColors[theme].accent + "4D",
                background: inputBackground,
                color:
                  deviceType === ""
                    ? themeColors[theme].isDark
                      ? "#94a3b8"
                      : "#cbd5e1"
                    : themeColors[theme].isDark
                      ? "#e2e8f0"
                      : "#0f172a",
                boxShadow: `0 8px 18px ${themeColors[theme].accent}14`,
                "--tw-ring-color": themeColors[theme].accent + "4D",
              } as React.CSSProperties
            }
            value={deviceType}
            onChange={(event) => onDeviceTypeChange(event.target.value)}
          >
            <option value="" disabled>
              Select device type
            </option>
            <option>Mobile</option>
            <option>Desktop</option>
            <option>Tablet</option>
            <option>Emulator</option>
            <option>Others</option>
          </select>
        </label>

        <label className={labelClass}>
          <span className={fieldLabelClass} style={{ color: themeColors[theme].accent }}>
            Merchant Category
          </span>
          <select
            className="w-full rounded-xl border px-4 py-3 text-sm shadow-md transition focus:outline-none focus:ring-2"
            style={
              {
                borderColor: themeColors[theme].accent + "4D",
                background: inputBackground,
                color:
                  merchantCategory === ""
                    ? themeColors[theme].isDark
                      ? "#94a3b8"
                      : "#cbd5e1"
                    : themeColors[theme].isDark
                      ? "#e2e8f0"
                      : "#0f172a",
                boxShadow: `0 8px 18px ${themeColors[theme].accent}14`,
                "--tw-ring-color": themeColors[theme].accent + "4D",
              } as React.CSSProperties
            }
            value={merchantCategory}
            onChange={(event) => onMerchantCategoryChange(event.target.value)}
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="ecommerce">Ecommerce</option>
            <option value="grocery">Grocery</option>
            <option value="travel">Travel &amp; Airlines</option>
            <option value="entertainment">Entertainment</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="utilities">Utilities</option>
            <option value="restaurant">Restaurant &amp; Food</option>
            <option value="retail">Retail &amp; Fashion</option>
            <option value="electronics">Electronics</option>
            <option value="crypto">Crypto Exchange</option>
            <option value="gift">Gift Cards</option>
            <option value="gambling">Gambling</option>
            <option value="forex">Forex &amp; Trading</option>
            <option value="vpn">VPN &amp; Privacy Services</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3.5 text-base font-bold text-white shadow-lg transition enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            background: `linear-gradient(135deg, ${themeColors[theme].accent}E6 0%, ${themeColors[theme].accent}B3 100%)`,
            borderColor: themeColors[theme].accent + "4D",
            boxShadow: `0 12px 28px ${themeColors[theme].accent}3D`,
          }}
        >
          {loading ? (
            <>
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <span>🛡️</span>
              <span>Check Transaction</span>
            </>
          )}
        </button>

        <div className="mt-auto space-y-2 pt-1">
          <p
            className="text-center text-[0.7rem] font-medium"
            style={{ color: themeColors[theme].isDark ? "#94a3b8" : "#64748b" }}
          >
            Tip: high amount + unfamiliar device + cross-border route usually increases risk score.
          </p>

          <p
            className={`min-h-5 text-center text-sm font-semibold text-red-400 transition-opacity ${formError ? "opacity-100" : "opacity-0"}`}
            aria-live="polite"
          >
            {formError ?? ""}
          </p>
        </div>
      </form>
    </article>
  );
}
