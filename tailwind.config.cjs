/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue, js, ts, jsx, tsx}"],
  theme: {
    screens: {
      xs: "375px",

      ...defaultTheme.screens,
    },
    extend: {},
    colors: {
      dark: {
        background: "#202c37",
        text: "	#ffffff",
        element: "	#2b3945",
      },
      light: {
        background: "#fafafa",
        text: "#111517",
        element: "	#ffffff",
        input: "#858585",
      },
      red: "#FF0000",
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
