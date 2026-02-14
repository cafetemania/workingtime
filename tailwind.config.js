/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f5ff",
          100: "#e0ebff",
          200: "#c7d9fe",
          300: "#a4c0fd",
          400: "#7a9ff9",
          500: "#5a7ef2",
          600: "#007aff", // iOS Blue
          700: "#0063d1",
          800: "#0050aa",
          900: "#003d85",
        },
        apple: {
          bg: "#f2f2f7",       // iOS system background
          card: "#ffffff",
          groupedBg: "#f2f2f7",
          separator: "rgba(60,60,67,0.12)",
          label: "#000000",
          secondaryLabel: "#3c3c43",
          tertiaryLabel: "#8e8e93",
          red: "#ff3b30",
          orange: "#ff9500",
          yellow: "#ffcc00",
          green: "#34c759",
          teal: "#5ac8fa",
          blue: "#007aff",
          indigo: "#5856d6",
          purple: "#af52de",
          pink: "#ff2d55",
          gray: "#8e8e93",
          gray2: "#aeaeb2",
          gray3: "#c7c7cc",
          gray4: "#d1d1d6",
          gray5: "#e5e5ea",
          gray6: "#f2f2f7",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Helvetica Neue",
          "Hiragino Sans",
          "Hiragino Kaku Gothic ProN",
          "sans-serif",
        ],
      },
      borderRadius: {
        "apple": "12px",
        "apple-lg": "16px",
        "apple-xl": "20px",
      },
      boxShadow: {
        "apple": "0 0.5px 0 0 rgba(0,0,0,0.05)",
        "apple-card": "0 2px 12px rgba(0,0,0,0.08)",
        "apple-elevated": "0 8px 32px rgba(0,0,0,0.12)",
        "apple-modal": "0 20px 60px rgba(0,0,0,0.3)",
      },
      backdropBlur: {
        "apple": "20px",
      },
    },
  },
  plugins: [],
};
