import { ElementType } from "react";

import { ButtonCore } from "../button.core";
import { TButtonProps } from "../button.types";

export function ButtonPrimary<C extends ElementType = "button">({ ...props }: TButtonProps<C>) {
  return (
    <ButtonCore
      {...props}
      classNames={{
        base: "bg-container-3 data-[state=disabled]:bg-container-1",
      }}
    />
  );
}
