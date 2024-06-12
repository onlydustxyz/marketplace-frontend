import { tv } from "tailwind-variants";

import { ButtonCore } from "../button.core";
import { TButtonProps } from "../button.types";
import { ButtonCoreVariants } from "../button.variants";

const ButtonPrimaryVariants = tv({
  extend: ButtonCoreVariants,
  slots: {
    wrapper: "bg-container-3",
  },
});
export const ButtonPrimary = ({ state, ...props }: TButtonProps) => {
  const slots = ButtonPrimaryVariants({ state });
  return (
    <ButtonCore
      {...props}
      classNames={{
        wrapper: slots.wrapper(),
      }}
    />
  );
};
