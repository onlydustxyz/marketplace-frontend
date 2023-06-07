import { MouseEvent } from "react";

export const linkClickHandlerFactory = (url: string) => (e: MouseEvent<HTMLDivElement>) => {
  e.preventDefault();
  window?.open(url, "_blank")?.focus();
};

export const copyClickHandlerFactory = (value: string, callback?: () => void) => (e: MouseEvent<HTMLDivElement>) => {
  e.preventDefault();
  navigator.clipboard.writeText(value);
  callback && callback();
};
