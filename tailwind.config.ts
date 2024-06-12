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
  theme: {},
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
