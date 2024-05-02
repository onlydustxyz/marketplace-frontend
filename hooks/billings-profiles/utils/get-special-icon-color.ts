interface IGetSpecialIconColor {
  hasWarning?: boolean;
  hasError?: boolean;
}
export function getSpecialIconColor({ hasWarning, hasError }: IGetSpecialIconColor): "red" | "orange" | "currentColor" {
  if (hasError) {
    return "red";
  }
  if (hasWarning) {
    return "orange";
  }
  return "currentColor";
}
