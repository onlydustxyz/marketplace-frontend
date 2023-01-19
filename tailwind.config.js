/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./frontend/src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { alfreda: ["Alfreda"], walsheim: ["GT Walsheim"], belwe: ["Belwe"] },
      colors: {
        chineseBlack: "#110C1F",
      },
      animation: {
        "spin-invert-slow": "spin-invert 4s linear",
      },
      keyframes: {
        "spin-invert": {
          from: { transform: "rotate(0.0deg)" },
          to: { transform: "rotate(-360.0deg)" },
        },
      },
      backgroundImage: {
        "noise-light": "url('src/assets/img/noise-light.png')",
        "noise-medium": "url('src/assets/img/noise-medium.png')",
        "noise-heavy": "url('src/assets/img/noise-heavy.png')",
        space: "url('src/assets/img/bg.jpeg')",
        "multi-color-gradient":
          "conic-gradient(from 180deg at 50% 50%, #02FFE0 -8.58deg, #0100C8 16.28deg, #8F00F3 47.6deg, #0B0CCB 82.17deg, #5504EC 125.37deg, #E504A2 165.23deg, #FF7202 179.49deg, #0500CA 206.97deg, #5F00FA 254.68deg, #B501FF 288.89deg, #FF4838 296.73deg, #FB404B 310.19deg, #9138FD 320.15deg, #417CFB 334.77deg, #02FFE0 351.42deg, #0100C8 376.28deg)",
      },
      backdropBlur: {
        "4xl": "70px",
      },
    },
  },

  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/line-clamp")],
};
