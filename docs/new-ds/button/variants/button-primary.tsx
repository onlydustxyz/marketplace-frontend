import { ButtonCore, ButtonCoreProps } from "app/migration/home/button-v1/button.core";

export const ButtonPrimary = ({ ...props }: ButtonCoreProps) => {
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
