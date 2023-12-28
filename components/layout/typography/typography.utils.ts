import { TypographyVariants } from "./typography.type";

export const getDefaultComponent = (variant: TypographyVariants["variant"]): keyof JSX.IntrinsicElements => {
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
      return "p";
    case "body-l-bold":
      return "p";
    case "body-m":
      return "p";
    case "body-m-bold":
      return "p";
    case "body-s":
      return "p";
    case "body-s-bold":
      return "p";
    case "body-xs":
      return "p";
    case "body-xs-bold":
      return "p";

    default:
      return "p";
  }
};
