import { nextui } from "@nextui-org/react";
import typography from "@tailwindcss/typography";
import scrollbar from "tailwind-scrollbar";
import { withTV } from "tailwind-variants/transformer";
import { Config } from "tailwindcss";

import legacyPreset from "./tailwind.legacy.preset";

const config: Config = withTV({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [legacyPreset],
  theme: {
    extend: {
      fontSize: {
        xss: ["11px", "16px"],
      },
      aspectRatio: {
        "2.16/1": "2.16 / 1",
        "3.41/1": "3.41 / 1",
        "302/59": "302 / 59",
        "0.89/1": "0.89 / 1",
        "8/5": "8 / 5",
        "16/9": "16 / 9",
      },
      colors: {
        /** CONTAINER */
        "container-1": "var(--container-1)",
        "container-2": "var(--container-2)",
        "container-3": "var(--container-3)",
        "container-4": "var(--container-4)",
        "container-action": "var(--container-action)",
        "container-inverse": "var(--container-inverse)",
        "container-stroke-separator": "var(--container-stroke-separator)",
        "container-backdrop": "var(--container-backdrop)",
        /** TEXT */
        "text-1": "var(--text-1)",
        "text-2": "var(--text-2)",
        "text-3": "var(--text-3)",
        "text-4": "var(--text-4)",
        /** TEXT */
        "label-red": "var(--label-red)",
        "label-pink": "var(--label-pink)",
        "label-green": "var(--label-green)",
        "label-yellow": "var(--label-yellow)",
        "label-orange": "var(--label-orange)",
        "label-purple": "var(--label-purple)",
        "label-blue": "var(--label-blue)",
        "label-grey": "var(--label-grey)",
        /** INTERACTION */
        "interactions-error-default": "var(--interactions-error-default)",
        "interactions-error-hover": "var(--interactions-error-hover)",
        "interactions-error-active": "var(--interactions-error-active)",
        "interactions-error-disabled": "var(--interactions-error-disabled)",
        "interactions-white-default": "var(--interactions-white-default)",
        "interactions-white-hover": "var(--interactions-white-hover)",
        "interactions-white-active": "var(--interactions-white-active)",
        "interactions-white-disabled": "var(--interactions-white-disabled)",
        "interactions-black-default": "var(--interactions-black-default)",
        "interactions-black-hover": "var(--interactions-black-hover)",
        "interactions-black-active": "var(--interactions-black-active)",
        "interactions-black-disabled": "var(--interactions-black-disabled)",
        /**BRAND */
        "brand-1": "var(--_Brand1)",
        "brand-2": "var(--_Brand2)",
        "brand-3": "var(--_Brand3)",
        "brand-4": "var(--_Brand4)",
      },
    },
  },
  plugins: [
    typography,
    scrollbar({ nocompatible: true }),
    nextui({
      defaultTheme: "dark",
      themes: {
        dark: {
          colors: {
            background: "transparent",
            primary: "#AE00FF", // Space Purple 500
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
