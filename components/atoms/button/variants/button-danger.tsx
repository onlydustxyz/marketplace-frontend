import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { ButtonCore } from "../button.core";
import { TButtonProps } from "../button.types";

export function ButtonDanger<C extends ElementType = "button">({ ...props }: TButtonProps<C>) {
  return (
    <ButtonCore
      {...props}
      classNames={{
        base: cn(
          "bg-interactions-error-active data-[state=disabled]:bg-interactions-error-disabled",
          "hover:bg-interactions-error-hover"
        ),
        loaderContainer: "bg-interactions-error-active",
      }}
    />
  );
}
