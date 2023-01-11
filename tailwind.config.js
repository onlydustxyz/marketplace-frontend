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
        "noise-light": "url('src/assets/img/noise-light.png')",
        "noise-medium": "url('src/assets/img/noise-medium.png')",
        "noise-heavy": "url('src/assets/img/noise-heavy.png')",
        space: "url('src/assets/img/bg.jpeg')",
      },
      backdropBlur: {
        "4xl": "70px",
      },
    },
  },

  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/line-clamp")],
};
