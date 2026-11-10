/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0B5D55",
          dark: "#084A44",
          light: "#DCEFEB",
        },
        secondary: {
          DEFAULT: "#FFFDF7",
          dark: "#F4EFDF",
        },
        accent: {
          DEFAULT: "#F2B544",
          coral: "#D9674F",
        },
        neutral: {
          50: "#F8FAFA",
          100: "#EEF2F2",
          200: "#D9E1E2",
          500: "#687579",
          700: "#3A474B",
          900: "#243039",
        },
        success: "#176B48",
        warning: "#855300",
        error: "#B42318",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Arial", "sans-serif"],
        body: ["var(--font-body)", "Arial", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1.1" }],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
      },
      borderRadius: {
        sm: "0.375rem",
        DEFAULT: "0.625rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
      },
      boxShadow: {
        card: "0 2px 12px rgb(36 48 57 / 8%)",
        raised: "0 8px 24px rgb(36 48 57 / 12%)",
        focus: "0 0 0 3px rgb(11 93 85 / 28%)",
      },
    },
  },
  plugins: [],
};
