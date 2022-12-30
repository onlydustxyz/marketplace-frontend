import { MouseEvent } from "react";

export const linkClickHandlerFactory = (url: string) => (e: MouseEvent<HTMLDivElement>) => {
  e.preventDefault();
  window?.open(url, "_blank")?.focus();
};
