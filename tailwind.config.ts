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
      colors: {
        /** CONTAINER */
        "container-1": "var(--container-1)",
        "container-2": "var(--container-2)",
        "container-3": "var(--container-3)",
        "container-4": "var(--container-4)",
        "container-action": "var(--container-action)",
        "container-reverse": "var(--container-reverse)",
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
        "interactions-error": "var(--interactions-error)",
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
