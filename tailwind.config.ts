import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FFFFFF",
        fg: "#0A0A0B",
        muted: "#6B6B70",
        border: "#E6E6E9",
        surface: "#F4F4F6",
        surface2: "#ECECEF",
        accent: "#0A5FFF",
        "accent-fg": "#FFFFFF",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        card: "18px",
      },
      maxWidth: {
        wrap: "1320px",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
    },
  },
  plugins: [],
};

export default config;
