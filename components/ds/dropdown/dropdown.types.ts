import { DropdownItemProps, DropdownMenuProps, DropdownProps } from "@nextui-org/react";
import { PropsWithChildren } from "react";

export namespace TDropdown {
  export type Base = Partial<Omit<DropdownProps, "children">>;
  export type MenuProps = Partial<Omit<DropdownMenuProps, "children">>;
  export interface Item extends DropdownItemProps {
    isError?: boolean;
    isWarning?: boolean;
  }

  export interface Props extends PropsWithChildren, Base {
    items: Item[];
    MenuProps?: MenuProps;
  }
}
