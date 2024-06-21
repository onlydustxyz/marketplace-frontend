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
          "border-1 border-interactions-white-default bg-interactions-white-default data-[disabled=true]:bg-interactions-white-disabled",
          "hover:bg-interactions-white-hover hover:border-interactions-white-hover"
        ),
        loaderContainer: "bg-interactions-white-active ",
        label: "text-text-4 group-data-[disabled=true]:text-text-3 group-hover:text-text-1",
        startIcon: "text-text-4 group-data-[disabled=true]:text-text-3 group-hover:text-text-1",
        endIcon: "text-text-4 group-data-[disabled=true]:text-text-3 group-hover:text-text-1",
        spinnerCircle: "border-b-text-4",
      }}
    />
  );
}
