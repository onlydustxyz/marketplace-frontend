import { CardBorder } from "./card.types";

function getBorderClass(borderType: CardBorder) {
  switch (borderType) {
    case "light":
      return "border border-greyscale-50/8";
    case "medium":
      return "border border-greyscale-50/12";
    case "multiColor":
      return "border-multicolored before:rounded-2xl";
    default:
      return "";
  }
}

export { getBorderClass };
