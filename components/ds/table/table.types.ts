import { TableColumnProps } from "@nextui-org/react";
import { ComponentProps, ReactNode } from "react";

import { Icon } from "components/layout/icon/icon";

export namespace TTable {
  export interface Column {
    key: string;
    label: string;
    icon?: ComponentProps<typeof Icon>;
    align?: TableColumnProps<unknown>["align"];
    showOnHover?: boolean;
  }

  export interface Row {
    key: string;
    [key: string]: ReactNode;
  }

  export interface Props {
    columns: Column[];
    rows: Row[];
  }
}
