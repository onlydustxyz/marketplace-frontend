import { tv } from "tailwind-variants";

import { ButtonCore } from "../button.core";
import { TButtonProps } from "../button.types";
import { ButtonCoreVariants } from "../button.variants";

const ButtonPrimaryVariants = tv({
  extend: ButtonCoreVariants,
  slots: {
    wrapper: "bg-interactions-error",
  },
  variants: {
    state: {
      disabled: {
        wrapper: "bg-interactions-error bg-opacity-20",
      },
    },
  },
});
export const ButtonDanger = ({ state, ...props }: TButtonProps) => {
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
