import { ComponentProps } from "react";

import { Button } from "components/atoms/button/variants/button-default";
import { Checkbox } from "components/atoms/checkbox";

export function getComponentsVariants(variant: ComponentProps<typeof Button>["variant"]): {
  checkboxColor: ComponentProps<typeof Checkbox>["color"];
} {
  const map = {
    "secondary-light": {
      checkboxColor: "white",
    },
    "secondary-dark": {
      checkboxColor: "black",
    },
    danger: {
      checkboxColor: "white",
    },
    primary: {
      checkboxColor: "black",
    },
  } as const;

  return map[variant || "secondary-light"];
}
