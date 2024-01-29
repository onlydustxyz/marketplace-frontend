import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { UseSearchHotKeyProps } from "./useSearchHotKey.type";

export const useSearchHotKey = ({ onPress, inputRef }: UseSearchHotKeyProps) => {
  const [focus, setFocus] = useState(false);
  useHotkeys("mod+k", () => {
    setFocus(true);
    onPress?.();
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  });

  return focus;
};
