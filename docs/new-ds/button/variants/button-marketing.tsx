import { TButtonCore } from "docs/new-ds/button/button.type";

import { ButtonCore } from "../button.core";

export const ButtonMarketing = ({ ...props }: TButtonCore.Props) => {
  return (
    <ButtonCore
      {...props}
      classNames={{
        wrapper: "bg-container-1",
        icon: "bg-blue-500",
      }}
    />
  );
};
