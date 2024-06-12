import { ButtonCore, ButtonCoreProps } from "../button.core";

export const ButtonMarketing = ({ ...props }: ButtonCoreProps) => {
  return (
    <ButtonCore
      {...props}
      classNames={{
        wrapper: "bg-green-500",
        icon: "bg-blue-500",
      }}
    />
  );
};
