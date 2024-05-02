import { TIcon } from "components/layout/icon/icon.types";

interface IGetSpecialIconName {
  hasWarning?: boolean;
  hasError?: boolean;
  role?: string;
  enabled?: boolean;
}

export function getSpecialIconName({
  hasWarning,
  hasError,
  role,
  enabled = true,
}: IGetSpecialIconName): TIcon.Props | null {
  if (!enabled) {
    return { remixName: "ri-forbid-2-line" };
  }
  if (hasWarning || hasError) {
    return { remixName: "ri-error-warning-line" };
  }
  if (role === "MEMBER") {
    return { remixName: "ri-team-line" };
  }
  return null;
}
