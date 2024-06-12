import { ButtonCore } from "../button.core";
import { TButtonProps } from "../button.types";

export const ButtonPrimary = ({ ...props }: TButtonProps) => {
  return (
    <ButtonCore
      {...props}
      classNames={{
        wrapper: "bg-container-3 data-[state=disabled]:bg-container-1",
      }}
    />
  );
};
