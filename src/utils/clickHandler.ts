import { MouseEvent } from "react";

export const copyClickHandlerFactory = (value: string, callback?: () => void) => (e: MouseEvent<HTMLElement>) => {
  e.preventDefault();
  navigator.clipboard.writeText(value);
  callback && callback();
};
