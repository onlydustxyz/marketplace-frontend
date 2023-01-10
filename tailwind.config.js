/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./frontend/src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { alfreda: ["Alfreda"], walsheim: ["GT Walsheim"] },
      colors: {
        chineseBlack: "#110C1F",
      },
      backgroundImage: {
        space: "url('src/assets/img/bg.jpeg')",
      },
    },
  },

  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/line-clamp")],
};
