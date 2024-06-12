import { TButtonCore } from "docs/new-ds/button/button.type";

import { ButtonCore } from "../button.core";

export const ButtonPrimary = ({ ...props }: TButtonCore.Props) => {
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
