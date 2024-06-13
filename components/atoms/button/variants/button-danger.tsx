import { ButtonCore } from "../button.core";
import { TButtonProps } from "../button.types";

export const ButtonDanger = ({ ...props }: TButtonProps<"button">) => {
  return (
    <ButtonCore
      {...props}
      classNames={{
        base: "bg-interactions-error data-[state=disabled]:bg-red-200",
        startIcon: "group-data-[state=disabled]:text-red-300",
        endIcon: "group-data-[state=disabled]:text-red-300",
      }}
    />
  );
};
