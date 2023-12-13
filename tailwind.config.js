/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    fontSize: {
      sm: "0.75rem",
      base: "0.875rem",
      lg: "1.5rem",
      xl: "2.25rem",
    },
    screens: {
      xs: { min: "320px", max: "475px" },
      sm: { min: "476px", max: "640px" },
      md: { min: "641px", max: "890px" },
      lg: { min: "891px", max: "1024px" },
      xl: { min: "1025px", max: "1280px" },
      mobile: { max: "640px" },
      tablet: { max: "890px" },
      desktop: { max: "1280px" },
    },
    colors: {
      primary: "#e43822",
      secondary: "#d0e5c3",
    },
  },
  plugins: [],
};
