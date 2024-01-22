import { TTypography } from "./typography.types";

export function getDefaultComponent(variant: TTypography.Variants["variant"]): keyof JSX.IntrinsicElements {
  switch (variant) {
    case "title-xl":
      return "h1";
    case "title-l":
      return "h2";
    case "title-m":
      return "h3";
    case "title-s":
      return "h4";
    case "body-l":
    case "body-l-bold":
    case "body-m":
    case "body-m-bold":
    case "body-s":
    case "body-s-bold":
    case "body-xs":
    case "body-xs-bold":
    default:
      return "p";
  }
}
