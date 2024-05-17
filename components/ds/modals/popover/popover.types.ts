import { PopoverProps } from "@nextui-org/react";
import { PropsWithChildren, ReactNode } from "react";

export namespace TPopover {
  type basePopOverProps = Partial<Omit<PopoverProps, "children" | "content">>;
  export interface Props extends PropsWithChildren, basePopOverProps {
    content: ReactNode;
  }
}
