import classNames, { ArgumentArray } from "classnames";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  classGroups: {
    "bg-image": [
      "bg-noise-light",
      "bg-noise-medium",
      "bg-noise-heavy",
      "bg-profile-blue",
      "bg-profile-cyan",
      "bg-profile-magenta",
      "bg-profile-yellow",
      "bg-space-card",
      "bg-public-profile",
      "bg-space",
      "bg-multi-color-gradient",
      "stripe-pattern",
      "bg-mosaic",
      "completion-gradient",
      "bg-contributions",
    ],
  },
});

/* classNames featuring tailwind-merge features */
export function cn(...args: ArgumentArray) {
  return customTwMerge(classNames(args));
}
