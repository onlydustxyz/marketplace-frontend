/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./frontend/src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { alfreda: ["Alfreda"], walsheim: ["GT Walsheim"], belwe: ["Belwe"] },
      colors: {
        chineseBlack: "#110C1F",
        greyscale: {
          50: "#F3F0EE",
          100: "#DBD8D6",
          200: "#C2C0BE",
          300: "#AAA8A7",
          400: "#92908F",
          500: "#7A7877",
          600: "#61605F",
          700: "#494847",
          800: "#313030",
          900: "#181818",
        },
        orange: {
          500: "#FF9000",
        },
        pink: {
          500: "#E80CE1",
        },
        spaceBlue: {
          50: "#E3E5EA",
          100: "#BABDCE",
          200: "#8E93AC",
          300: "#656B8B",
          400: "#484F76",
          500: "#2B3362",
          600: "#262D5B",
          700: "#1E2551",
          800: "#171D44",
          900: "#181818",
        },
        spacePurple: {
          50: "#F7E6FF",
          100: "#EFCCFF",
          200: "#DF99FF",
          300: "#CE66FF",
          400: "#BE33FF",
          500: "#AE00FF",
          600: "#8B00CC",
          700: "#680099",
          800: "#460066",
          900: "#230033",
        },
      },
      animation: {
        "spin-invert-slow": "spin-invert 4s linear infinite",
        "spin-medium": "spin 2s linear infinite",
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
      boxShadow: {
        "bottom-sm": "0px 2px 4px rgba(0, 0, 0, 0.32), inset 0px -1px 2px 1px rgba(0, 0, 0, 0.32)",
      },
      outlineWidth: {
        3: "3px",
      },
      opacity: {
        2: "0.02",
        4: "0.04",
        8: "0.08",
        12: "0.12",
      },
    },
  },

  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/line-clamp"), require("@headlessui/tailwindcss")],
};
