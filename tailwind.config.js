import typography from "@tailwindcss/typography";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#155DFC", // Blue
        secondary: "#4A5565", // Purple
        accent: "#F59E0B", // Amber
        dark: "#101828", // Neutral
        light: "#F7F8F9", // Gray
        blueBackground: "#EEF6FF", // Light Blue Background
      },

      fontFamily: {
        heading: ["Inter Display Semibold"], // Inter Display FOnt
        headingmd: ["Inter Display Medium"], // Inter Display FOnt
        thin: ["Inter Display Thin"], // Inter Display FOnt
        primary: ["Inter Display Light"], // Inter Display FOnt
        secondary: ["Inter", "serif"], // Fallback to Inter/serif
      },

      // fontSize: {
      //   xs: "0.75rem",
      //   sm: "0.813rem",
      //   base: "0.8rem",
      //   lg: "1.125rem",
      //   xl: "4rem",
      //   "2xl": "1.2rem",
      //   "3xl": "1.5rem",
      //   "4xl": "2.25rem",
      //   "5xl": "3rem",
      // },
      // Desktop-first — base styles are desktop; use these to scale DOWN
      screens: {
        laptop: { max: "1279px" }, // below desktop  (< 1280px)
        tablet: { max: "1023px" }, // below laptop   (< 1024px)
        mobile: { max: "767px" }, // below tablet   (<  768px)
        phone: { max: "639px" }, // small phones   (<  640px)
      },
    },
  },
  plugins: [typography],
};
