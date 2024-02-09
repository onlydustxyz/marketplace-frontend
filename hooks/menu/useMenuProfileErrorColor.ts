import { useSettingsError } from "hooks/users/useSettingsError";

export interface UseMenuProfileErrorColorReturn {
  color: "ERROR" | "WARNING" | "DEFAULT";
}

export const useMenuProfileErrorColor = (): UseMenuProfileErrorColorReturn => {
  const { error } = useSettingsError();

  const getColor = (): UseMenuProfileErrorColorReturn["color"] => {
    if (error === "BILLING_ERROR") {
      return "ERROR";
    }

    if (error === "BILLING_WARNING" || error === "PAYOUT") {
      return "WARNING";
    }

    return "DEFAULT";
  };

  const color = getColor();

  return {
    color,
  };
};
