import { ElementType } from "react";

import { cn } from "src/utils/cn";

import { ButtonCore } from "../button.core";
import { TButtonProps } from "../button.types";

export function ButtonSecondaryDark<C extends ElementType = "button">({ ...props }: TButtonProps<C>) {
  return (
    <ButtonCore
      {...props}
      classNames={{
        base: cn(
          "bg-transparent border-1 border-interactions-black-default data-[state=disabled]:bg-interactions-black-disabled",
          "hover:bg-interactions-black-hover"
        ),
        label: "text-text-4",
        startIcon: "text-text-4",
        endIcon: "text-text-4",
        loaderContainer: "bg-transparent",
        spinnerCircle: "border-b-text-4",
      }}
    />
  );
}
