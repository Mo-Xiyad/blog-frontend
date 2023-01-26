/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0B0E63",
        secondary: "#D1DAE5",
        tertiary: "#6063F1"
      }
    }
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography")
  ]
};
