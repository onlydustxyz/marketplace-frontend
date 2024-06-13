import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { ButtonCore } from "../button.core";
import { TButtonProps } from "../button.types";

export function ButtonPrimary<C extends ElementType = "button">({ ...props }: TButtonProps<C>) {
  return (
    <ButtonCore
      {...props}
      classNames={{
        base: cn(
          "border-1 border-container-stroke-separator bg-interactions-white-default data-[state=disabled]:bg-interactions-white-disabled",
          "hover:bg-interactions-white-hover"
        ),
        loaderContainer: "bg-interactions-white-active",
        spinnerCircle: "border-b-text-4",
      }}
    />
  );
}
