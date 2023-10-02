import { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import scrollbar from "tailwind-scrollbar";
import headlessUi from "@headlessui/tailwindcss";
import typography from "@tailwindcss/typography";
import path from "path";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    path.join(require.resolve("@thaddeusjiang/react-sortable-list"), "../**/*.{js,ts,jsx,tsx}"),
  ],
  theme: {
    extend: {
      borderRadius: {
        large: "10px",
      },
      fontFamily: { alfreda: ["Alfreda"], walsheim: ["GT Walsheim"], belwe: ["Belwe"] },
      spacing: {
        110: "27.5rem",
        116: "29rem",
      },
      colors: {
        chineseBlack: "#110C1F",
        github: {
          grey: "#828893",
          "grey-light": "#92908F",
          red: "#C03837",
          "red-light": "#C64C4B",
          green: "#3C8343",
          "green-light": "#639C69",
          purple: "#684ABB",
          "purple-light": "#866EC9",
        },
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
        midBlue: {
          50: "#E6E6F8",
          100: "#CCCEF2",
          200: "#999DE4",
          300: "#666BD7",
          400: "#333AC9",
          500: "#0009BC",
          600: "#000796",
          700: "#000571",
          800: "#00044B",
          900: "#000113",
        },
        orange: {
          400: "#FFBC66",
          500: "#FF9000",
          800: "#663A00",
          900: "#331D00",
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
          900: "#0E0D2E",
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
        whiteFakeOpacity: {
          1: "#232323",
          2: "#0C0C23",
          5: "#111127",
          8: "#151526",
          10: "#18182F",
          12: "#4C4B58",
        },
        spaceGrey: "#141414",
        tooltip: {
          blue: "#2c2c3e",
        },
      },
      animation: {
        "spin-invert-slow": "spin-invert 4s linear infinite",
        "spin-medium": "spin 2s ease-in-out infinite",
        wave: "wave 20s ease infinite",
      },
      keyframes: {
        "spin-invert": {
          from: { transform: "rotate(0.0deg)" },
          to: { transform: "rotate(-360.0deg)" },
        },
        wave: {
          "0%": {
            "background-size": "100%",
            "background-position": "0% 50%",
          },
          "50%": {
            "background-size": "300%",
            "background-position": "100% 50%",
          },
          "100%": {
            "background-size": "100%",
            "background-position": "0% 50%",
          },
        },
      },
      backgroundImage: {
        "noise-light": "url('src/assets/img/noise-light.png')",
        "noise-medium": "url('src/assets/img/noise-medium.png')",
        "noise-heavy": "url('src/assets/img/noise-heavy.png')",
        "profile-blue": "url('src/assets/img/user-profile-bg-blue.webp')",
        "profile-cyan": "url('src/assets/img/user-profile-bg-cyan.webp')",
        "profile-magenta": "url('src/assets/img/user-profile-bg-magenta.webp')",
        "profile-yellow": "url('src/assets/img/user-profile-bg-yellow.webp')",
        "space-card": "url('src/assets/img/space-card-bg.png')",
        "public-profile": "url('src/assets/img/public-profile-bg.webp')",
        space: `
            url('src/assets/img/dust-top-right.png'),
            url('src/assets/img/dust-btm-left.png'),
            linear-gradient(180deg, #000113 0%, #0E0D2E 100%)
        `,
        "multi-color-gradient":
          "conic-gradient(from 180deg at 50% 50%, #02FFE0 -8.58deg, #0100C8 16.28deg, #8F00F3 47.6deg, #0B0CCB 82.17deg, #5504EC 125.37deg, #E504A2 165.23deg, #FF7202 179.49deg, #0500CA 206.97deg, #5F00FA 254.68deg, #B501FF 288.89deg, #FF4838 296.73deg, #FB404B 310.19deg, #9138FD 320.15deg, #417CFB 334.77deg, #02FFE0 351.42deg, #0100C8 376.28deg)",
        "stripe-pattern": "url('src/assets/img/stripe-pattern.svg')",
        mosaic: "url('src/assets/img/mosaic.png')",
        "completion-gradient":
          "linear-gradient(90deg, #5935BF 0%, #45279B 8.85%, #340D87 31.77%, #421083 66.15%, #3A0A8C 100%);",
        contributions: "url('src/assets/img/contributions-bg.png')",
      },
      backgroundPosition: {
        space: "right top, bottom left",
      },
      backgroundSize: {
        space: "auto, auto, 100%",
        "public-profile": "cover",
      },
      backdropBlur: {
        "4xl": "70px",
      },
      boxShadow: {
        "bottom-sm": "0px 2px 4px rgba(0, 0, 0, 0.32), inset 0px -1px 2px 1px rgba(0, 0, 0, 0.32)",
        heavy: "0px 8px 64px rgba(0, 0, 0, 0.05)",
      },
      dropShadow: {
        "bottom-sm": "0px 8px 32px rgba(0, 0, 0, 0.16)",
      },
      borderWidth: {
        "0.5": "0.5px",
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

  plugins: [
    typography,
    headlessUi,
    scrollbar({ nocompatible: true }),
    plugin(function ({ addComponents }) {
      const pseudoOutline = {
        position: "relative",
        "&:before": {
          content: "''",
          position: "absolute",
          "z-index": "-1",
          "border-width": "1px",
          top: "-1px",
          right: "-1px",
          bottom: "-1px",
          left: "-1px",
        },
      };
      const variantSizes = [2, 3, 4];
      addComponents({
        ".pseudo-outline": pseudoOutline,
        ...variantSizes.reduce((acc, size) => {
          acc[`.pseudo-outline-${size}`] = {
            ...pseudoOutline,
            "&:before": {
              ...pseudoOutline["&:before"],
              "border-width": `${size}px`,
              top: `-${size}px`,
              right: `-${size}px`,
              bottom: `-${size}px`,
              left: `-${size}px`,
            },
          };
          return acc;
        }, {}),
      });
    }),
  ],
};

export default config;
