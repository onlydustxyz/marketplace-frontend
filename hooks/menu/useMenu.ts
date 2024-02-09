import { UseSettingsErrorReturn, useSettingsError } from "hooks/users/useSettingsError";

import { UseMenuProfileErrorColorReturn, useMenuProfileErrorColor } from "./useMenuProfileErrorColor";
import { UseMenuProfileLabelReturn, useMenuProfileLabel } from "./useMenuProfileLabel";
import { UseMenuRedirectionReturn, useMenuRedirection } from "./useMenuRedirection";

export interface UseMenuReturn
  extends UseMenuProfileErrorColorReturn,
    UseMenuProfileLabelReturn,
    UseMenuRedirectionReturn,
    UseSettingsErrorReturn {}

export const useMenu = (): UseMenuReturn => {
  const { color } = useMenuProfileErrorColor();
  const { labelToken } = useMenuProfileLabel();
  const { redirection } = useMenuRedirection();
  const { error } = useSettingsError();

  return {
    color,
    labelToken,
    redirection,
    error,
  };
};
