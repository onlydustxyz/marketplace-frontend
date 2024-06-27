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
          "border-1 border-interactions-white-default bg-interactions-white-default data-[disabled=true]:bg-interactions-white-disabled data-[disabled=true]:border-interactions-white-disabled",
          "hover:bg-interactions-white-hover hover:border-interactions-white-hover",
          "text-text-4 data-[disabled=true]:text-text-3"
        ),
        loaderContainer: "bg-interactions-white-active ",
        spinnerCircle: "border-b-text-4",
      }}
    />
  );
}
