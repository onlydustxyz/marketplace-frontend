import { create } from "@storybook/theming/create";

// @ts-ignore
import Logo from "./static/logo.svg";

export default create({
  base: "dark",

  colorPrimary: "#A2ABDA",
  colorSecondary: "rgba(255, 255, 255, 0.2)",

  appPreviewBg: "#1A1A33",
  textMutedColor: "#A2ABDA",
  barHoverColor: "rgba(255, 255, 255, 0.6)",
  buttonBg: "rgba(255, 255, 255, 0.2)",
  buttonBorder: "rgba(255, 255, 255, 0.2)",
  booleanBg: "#A2ABDA",
  booleanSelectedBg: "#A2ABDA",

  // UI
  appBg: "#05051E",
  appContentBg: "#05051E",
  appBorderColor: "#A2ABDA",
  appBorderRadius: 4,

  // Typography
  fontBase: '"Inter", sans-serif',
  fontCode: "monospace",

  // Text colors
  textColor: "#FFF",
  textInverseColor: "rgba(255, 255, 255, 0.9)",

  // Toolbar default and active colors
  barTextColor: "#FFF",
  barSelectedColor: "#FFF",
  barBg: "#05051E",

  // Form colors
  inputBg: "#FFF",
  inputBorder: "rgba(255, 255, 255, 0.2)",
  inputTextColor: "#FFF",
  inputBorderRadius: 4,

  brandTitle: "Onlydust - Design System",
  brandUrl: "https://onlydust.com",
  brandImage: Logo,
});
