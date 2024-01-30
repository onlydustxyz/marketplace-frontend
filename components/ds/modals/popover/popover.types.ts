import { PropsWithChildren, ReactNode } from "react";
import { PopoverProps } from "@nextui-org/react";

export namespace TPopover {
  type basePopOverProps = Partial<Omit<PopoverProps, "children">>;
  export interface Props extends PropsWithChildren, basePopOverProps {
    content: ReactNode;
  }
}
