import classNames, { ArgumentArray } from "classnames";
import { twMerge } from "tailwind-merge";

/* classNames featuring tailwind-merge features */
export function cn(...args: ArgumentArray) {
  return twMerge(classNames(args));
}
