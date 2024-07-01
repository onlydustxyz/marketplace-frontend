import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { ButtonDefaultAdapter } from "components/atoms/button/adapters/default/default.adapter";
import { withComponentAdapter } from "components/hocs/with-component-adapter";

import { ButtonPort } from "../button.types";

export function ButtonSecondaryLight<C extends ElementType = "button">({ ...props }: ButtonPort<C>) {
  return withComponentAdapter<ButtonPort<C>>(ButtonDefaultAdapter)({
    ...props,
    classNames: {
      base: cn(
        "bg-transparent border-1 border-container-stroke-separator data-[loading=true]:border-interactions-white-active data-[disabled=true]:bg-interactions-white-disabled",
        "hover:border-interactions-white-hover"
      ),
      loaderContainer: "bg-transparent",
    },
  });
}
