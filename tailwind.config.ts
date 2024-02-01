import headlessUi from "@headlessui/tailwindcss";
import { nextui } from "@nextui-org/react";
import typography from "@tailwindcss/typography";
import scrollbar from "tailwind-scrollbar";
import { withTV } from "tailwind-variants/transformer";
import { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = withTV({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
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
        snow: "#F4F4F4",
        card: {
          background: {
            base: "#0E0D2E",
            light: "#FFFFFF05",
            medium: "#FFFFFF0D",
            heavy: "#FFFFFF14",
            solidHeavy: "#1a1939",
          },
          border: {
            light: "#F3F0EE14",
            medium: "#F3F0EE1F",
            heavy: "#F3F0EE33",
          },
        },
        struggleBadge: {
          background: {
            red: "#360000",
            orange: "#331D00",
            green: "#00332E",
          },
          text: {
            red: "#E84E4D",
            orange: "#FF9000",
            green: "#00FFE4",
          },
          bar: {
            fade: {
              red: "#E84E4D",
              orange: "#663A00",
              green: "#00665B",
            },
            solid: {
              red: "#E84E4D",
              orange: "#FF9000",
              green: "#00FFE4",
            },
          },
        },
      },
      animation: {
        "spin-invert-slow": "spin-invert 4s linear infinite",
        "pulse-grow-slow": "pulse-grow 3s ease-in-out infinite alternate",
        "spin-medium": "spin 2s ease-in-out infinite",
        wave: "wave 20s ease infinite",
      },
      keyframes: {
        "spin-invert": {
          from: { transform: "rotate(0.0deg)" },
          to: { transform: "rotate(-360.0deg)" },
        },
        "pulse-grow": {
          "0%": {
            transform: "scale(1)",
          },
          "100%": {
            transform: "scale(1.005)",
          },
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
        "noise-light": "url('/images/noise-light.webp')",
        "noise-medium": "url('/images/noise-medium.webp')",
        "noise-heavy": "url('/images/noise-heavy.webp')",
        "profile-blue": "url('/images/user-profile-bg-blue.webp')",
        "profile-cyan": "url('/images/user-profile-bg-cyan.webp')",
        "profile-magenta": "url('/images/user-profile-bg-magenta.webp')",
        "profile-yellow": "url('/images/user-profile-bg-yellow.webp')",
        "space-card": "url('/images/space-card-bg.webp')",
        "public-profile": "url('/images/public-profile-bg.webp')",
        space: `
            url('/images/dust-top-right.webp'),
            url('/images/dust-btm-left.webp'),
            linear-gradient(180deg, #000113 0%, #0E0D2E 100%)
        `,
        "space-new":
          "linear-gradient(to bottom, rgba(0,0,0) 0%, rgba(0,0,0,0.95) 15%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.1) 100%), url('/images/space-background.svg')",
        "multi-color-gradient":
          "conic-gradient(from 180deg at 50% 50%, #02FFE0 -8.58deg, #0100C8 16.28deg, #8F00F3 47.6deg, #0B0CCB 82.17deg, #5504EC 125.37deg, #E504A2 165.23deg, #FF7202 179.49deg, #0500CA 206.97deg, #5F00FA 254.68deg, #B501FF 288.89deg, #FF4838 296.73deg, #FB404B 310.19deg, #9138FD 320.15deg, #417CFB 334.77deg, #02FFE0 351.42deg, #0100C8 376.28deg)",
        "stripe-pattern": "url('/images/stripe-pattern.svg')",
        mosaic: "url('/images/mosaic.webp')",
        "completion-gradient":
          "linear-gradient(90deg, #5935BF 0%, #45279B 8.85%, #340D87 31.77%, #421083 66.15%, #3A0A8C 100%);",
        contributions: "url('/images/contributions-bg.webp')",
        budget: `radial-gradient(at 64% 0%, rgba(221, 106, 55, 0.6) -5%, transparent 40%),
        radial-gradient(at 48% 0%, #e504a2 1%, transparent 80%),
        linear-gradient(60deg, rgba(40, 3, 155, 1), rgba(100, 42, 229, 1));`,
      },
      backgroundPosition: {
        space: "right top, bottom left",
        "space-new": "center",
      },
      backgroundSize: {
        space: "auto, auto, 100%",
        "space-new": "cover",
        "public-profile": "cover",
      },
      backdropBlur: {
        "4xl": "70px",
      },
      boxShadow: {
        "bottom-sm": "0px 2px 4px rgba(0, 0, 0, 0.32), inset 0px -1px 2px 1px rgba(0, 0, 0, 0.32)",
        heavy: "0px 8px 64px rgba(0, 0, 0, 0.05)",
        panel: "0px 8px 64px rgba(0, 0, 0, 0.5)",
        light: "0px 8px 32px 0px rgba(0, 0, 0, 0.16)",
        medium: "0px 8px 64px 0px rgba(0, 0, 0, 0.32)",
        button: "0px -1px 2px 1px rgba(0, 0, 0, 0.32) inset, 0px 2px 4px 0px rgba(0, 0, 0, 0.32)",
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
      transitionTimingFunction: {
        speed: "cubic-bezier(.22,.68,0,1.71)",
        speed2: "cubic-bezier(.68, -.55, .265, 1.55)",
        ease2: "cubic-bezier(.525,.005,.045,1.005)",
      },
    },
  },
  plugins: [
    typography,
    headlessUi,
    scrollbar({ nocompatible: true }),
    plugin(function ({ addComponents, theme }) {
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
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
        /* -------------------------------------------------------------------------- */
        /*                                     NEW                                    */
        /* -------------------------------------------------------------------------- */

        /* -------------------------------- TYPESCALE ------------------------------- */
        ".text-title-xl": {
          fontSize: "48px",
          fontFamily: theme("fontFamily.belwe"),
          fontWeight: "400",
          lineHeight: "48px",
          letterSpacing: "-1.632px",
        },
        ".text-title-l": {
          fontSize: "32px",
          fontFamily: theme("fontFamily.belwe"),
          fontWeight: "400",
          lineHeight: "36px",
          letterSpacing: "-0.32px",
        },
        ".text-title-m": {
          fontSize: "24px",
          fontFamily: theme("fontFamily.belwe"),
          fontWeight: "400",
          lineHeight: "32px",
          letterSpacing: "-0.24px",
        },
        ".text-title-s": {
          fontSize: "16px",
          fontFamily: theme("fontFamily.belwe"),
          fontWeight: "400",
          lineHeight: "20px",
          letterSpacing: "-0.16px",
        },
        ".text-body-l": {
          fontSize: "18px",
          fontFamily: theme("fontFamily.walsheim"),
          fontWeight: "400",
          lineHeight: "24px",
          letterSpacing: "-0.18px",
        },
        ".text-body-l-bold": {
          fontSize: "18px",
          fontFamily: theme("fontFamily.walsheim"),
          fontWeight: "500",
          lineHeight: "24px",
          letterSpacing: "-0.18px",
        },
        ".text-body-m": {
          fontSize: "16px",
          lineHeight: "20px",
          letterSpacing: "-0.18px",
          fontFamily: theme("fontFamily.walsheim"),
          fontWeight: "400",
        },
        ".text-body-m-bold": {
          fontSize: "16px",
          lineHeight: "20px",
          letterSpacing: "-0.16px",
          fontFamily: theme("fontFamily.walsheim"),
          fontWeight: "500",
        },
        ".text-body-s": {
          fontSize: "14px",
          lineHeight: "16px",
          letterSpacing: "-0.14px",
          fontFamily: theme("fontFamily.walsheim"),
          fontWeight: "400",
        },
        ".text-body-s-bold": {
          fontSize: "14px",
          lineHeight: "16px",
          letterSpacing: "-0.14px",
          fontFamily: theme("fontFamily.walsheim"),
          fontWeight: "500",
        },
        ".text-body-xs": {
          fontSize: "12px",
          lineHeight: "16px",
          letterSpacing: "-0.12px",
          fontFamily: theme("fontFamily.walsheim"),
          fontWeight: "400",
        },
        ".text-body-xs-bold": {
          fontSize: "12px",
          lineHeight: "16px",
          letterSpacing: "-0.12px",
          fontFamily: theme("fontFamily.walsheim"),
          fontWeight: "500",
        },
        // Should be prefix by od- because of tailwind merge in tailwind variants
        ".od-text-title-xl": {
          fontSize: "48px",
          fontFamily: theme("fontFamily.belwe"),
          fontWeight: "400",
          lineHeight: "48px",
          letterSpacing: "-1.632px",
        },
        ".od-text-title-l": {
          fontSize: "32px",
          fontFamily: theme("fontFamily.belwe"),
          fontWeight: "400",
          lineHeight: "36px",
          letterSpacing: "-0.32px",
        },
        ".od-text-title-m": {
          fontSize: "24px",
          fontFamily: theme("fontFamily.belwe"),
          fontWeight: "400",
          lineHeight: "32px",
          letterSpacing: "-0.24px",
        },
        ".od-text-title-s": {
          fontSize: "16px",
          fontFamily: theme("fontFamily.belwe"),
          fontWeight: "400",
          lineHeight: "20px",
          letterSpacing: "-0.16px",
        },
        ".od-text-body-l": {
          fontSize: "18px",
          fontFamily: theme("fontFamily.walsheim"),
          fontWeight: "400",
          lineHeight: "24px",
          letterSpacing: "-0.18px",
        },
        ".od-text-body-l-bold": {
          fontSize: "18px",
          fontFamily: theme("fontFamily.walsheim"),
          fontWeight: "500",
          lineHeight: "24px",
          letterSpacing: "-0.18px",
        },
        ".od-text-body-m": {
          fontSize: "16px",
          lineHeight: "20px",
          letterSpacing: "-0.18px",
          fontFamily: theme("fontFamily.walsheim"),
          fontWeight: "400",
        },
        ".od-text-body-m-bold": {
          fontSize: "16px",
          lineHeight: "20px",
          letterSpacing: "-0.16px",
          fontFamily: theme("fontFamily.walsheim"),
          fontWeight: "500",
        },
        ".od-text-body-s": {
          fontSize: "14px",
          lineHeight: "16px",
          letterSpacing: "-0.14px",
          fontFamily: theme("fontFamily.walsheim"),
          fontWeight: "400",
        },
        ".od-text-body-s-bold": {
          fontSize: "14px",
          lineHeight: "16px",
          letterSpacing: "-0.14px",
          fontFamily: theme("fontFamily.walsheim"),
          fontWeight: "500",
        },
        ".od-text-body-xs": {
          fontSize: "12px",
          lineHeight: "16px",
          letterSpacing: "-0.12px",
          fontFamily: theme("fontFamily.walsheim"),
          fontWeight: "400",
        },
        ".od-text-body-xs-bold": {
          fontSize: "12px",
          lineHeight: "16px",
          letterSpacing: "-0.12px",
          fontFamily: theme("fontFamily.walsheim"),
          fontWeight: "500",
        },
        /* ---------------------------------- CARD ---------------------------------- */
        ".card-light": {
          border: "1px solid",
          borderColor: theme("colors.card.border.light"),
          background: theme("colors.card.background.light"),
        },
        ".card-medium": {
          border: "1px solid",
          borderColor: theme("colors.card.border.medium"),
          background: theme("colors.card.background.medium"),
        },
        ".card-heavy": {
          border: "1px solid",
          borderColor: theme("colors.card.border.heavy"),
          background: theme("colors.card.background.heavy"),
        },
      });
    }),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animation-delay": value => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: theme("transitionDelay"),
        }
      );
    }),
    nextui({
      defaultTheme: "dark",
      themes: {
        dark: {
          colors: {
            background:
              "linear-gradient(to bottom, rgba(0,0,0) 0%, rgba(0,0,0,0.95) 15%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 100%),linear-gradient(to right, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.1) 100%), url('/images/space-background.svg')",
          },
          layout: {
            radius: {
              large: "10px",
            },
            boxShadow: {
              medium: "0px 8px 64px 0px rgba(0, 0, 0, 0.32)",
            },
          },
        },
      },
    }),
  ],
});

export default config;
