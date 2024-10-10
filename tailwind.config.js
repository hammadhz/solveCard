/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      colors: {
        primary: "#F5F5F5",
        secondary: "#2A9562",
        tertiary: {
          "green-30": "#04D94F",
          "green-40": "#148C48CC",
          "green-50": "#29AB5D",
          "green-60": "#38C682",
          "green-65": "#11864E",
          "green-70": "#00796D",
          "green-80": "#025928",
          "gray-700": "#CDCDCD",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
