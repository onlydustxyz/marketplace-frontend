interface IGetSpecialTagColor {
  hasWarning?: boolean;
  hasError?: boolean;
}
export function getSpecialTagColor({ hasWarning, hasError }: IGetSpecialTagColor): "red" | "orange" | "grey" {
  if (hasError) {
    return "red";
  }
  if (hasWarning) {
    return "orange";
  }
  return "grey";
}
