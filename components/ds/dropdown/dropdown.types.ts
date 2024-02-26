import { DropdownItemProps, DropdownMenuProps, DropdownProps } from "@nextui-org/react";
import { PropsWithChildren } from "react";

export namespace TDropdown {
  export type Base = Partial<Omit<DropdownProps, "children">>;
  export type MenuProps = Partial<Omit<DropdownMenuProps, "children">>;
  export type Item = DropdownItemProps;

  export interface Props extends PropsWithChildren, Base {
    items: Item[];
    MenuProps?: MenuProps;
  }
}
