import { ListboxItemProps, SelectProps } from "@nextui-org/react";

export namespace TSelect {
  type CustomListboxItemProps = Omit<ListboxItemProps, "key">;

  interface Item extends CustomListboxItemProps {
    value: string;
    label: string;
  }
  export interface Props extends Omit<SelectProps<Item>, "children"> {
    selectItemProps?: CustomListboxItemProps;
  }
}
