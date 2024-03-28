import { ListboxItemProps, SelectProps } from "@nextui-org/react";

export namespace TSelect {
  interface Item extends Omit<ListboxItemProps, "key"> {
    value: string;
    label: string;
  }
  export interface Props extends Omit<SelectProps<Item>, "children"> {
    selectItemProps?: Omit<ListboxItemProps, "key">;
    isElevated?: boolean;
  }
}
