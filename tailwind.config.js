/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./frontend/src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: { fontFamily: { alfreda: ["Alfreda"], walsheim: ["GT Walsheim"] } },
  },
  plugins: [require("@tailwindcss/typography")],
};
