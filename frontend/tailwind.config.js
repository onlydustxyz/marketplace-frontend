/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: { fontFamily: { alfreda: ["Alfreda"], walsheim: ["GT Walsheim"] } },
  },
  plugins: [],
};
