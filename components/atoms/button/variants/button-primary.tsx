import { ButtonCore } from "../button.core";
import { TButtonProps } from "../button.types";

export const ButtonPrimary = ({ ...props }: TButtonProps<"button">) => {
  return (
    <ButtonCore
      {...props}
      classNames={{
        base: "bg-container-3 data-[state=disabled]:bg-container-1",
      }}
    />
  );
};
