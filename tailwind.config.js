/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8", // Blue
        secondary: "#9333EA", // Purple
        accent: "#F59E0B", // Amber
        dark: "#111827", // Neutral
        light: "#F7F8F9", // Gray
      },

      fontFamily: {
        heading: ["Inter Display Semibold"], // Inter Display FOnt
        headingmd: ["Inter Display Medium"], // Inter Display FOnt
        thin: ["Inter Display Thin"], // Inter Display FOnt
        primary: ["Inter Display Light"], // Inter Display FOnt
        secondary: ["Inter", "serif"], // Fallback to Inter/serif
      },

      fontSize: {
        xs: "0.75rem",
        sm: "0.813rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "4rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
      },
    },
  },
  plugins: [],
};
