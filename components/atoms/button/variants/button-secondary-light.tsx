import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { ButtonCore } from "../button.core";
import { TButtonProps } from "../button.types";

export function ButtonSecondaryLight<C extends ElementType = "button">({ ...props }: TButtonProps<C>) {
  return (
    <ButtonCore
      {...props}
      classNames={{
        base: cn(
          "bg-transparent border-1 border-container-stroke-separator data-[loading=true]:border-interactions-white-active data-[disabled=true]:bg-interactions-white-disabled",
          "hover:border-interactions-white-hover"
        ),
        loaderContainer: "bg-transparent",
      }}
    />
  );
}
