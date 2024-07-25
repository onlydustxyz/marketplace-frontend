import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { ButtonDefaultAdapter } from "components/atoms/button/adapters/default/default.adapter";
import { withComponentAdapter } from "components/hocs/with-component-adapter";

import { ButtonPort } from "../button.types";

export function ButtonDanger<C extends ElementType = "button">(props: ButtonPort<C>) {
  return withComponentAdapter<ButtonPort<C>>(ButtonDefaultAdapter)({
    ...props,
    classNames: {
      ...(props.classNames || {}),
      base: cn(
        "bg-interactions-error-active data-[disabled=true]:bg-interactions-error-disabled",
        "hover:bg-interactions-error-hover",
        props.classNames?.base
      ),
      loaderContainer: cn("bg-interactions-error-active", props.classNames?.loaderContainer),
    },
  });
}
