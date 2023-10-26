import { MouseEvent } from "react";

export const linkClickHandlerFactory = (url: string) => (e: MouseEvent<HTMLElement>) => {
  e.preventDefault();
  window?.open(url, "_blank")?.focus();
};

export const copyClickHandlerFactory = (value: string, callback?: () => void) => (e: MouseEvent<HTMLElement>) => {
  e.preventDefault();
  navigator.clipboard.writeText(value);
  callback && callback();
};
