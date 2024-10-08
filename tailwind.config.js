/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        // sm: "640px",
        // md: "768px",
        // lg: "1024px",
        // default: "1024px",
        // xl: "1280px",
        // "2xl": "1536px",
      },
    },
    extend: {
      colors: {
        primary: "#F5F5F5",
        secondary: "#2A9562",
        tertiary: "#00796D",
        accent: "#38C682",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
