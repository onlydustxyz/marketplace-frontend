import { TableColumnProps } from "@nextui-org/react";
import { ComponentProps, ReactNode } from "react";

import { Icon } from "components/layout/icon/icon";

export namespace TTable {
  export interface Props {
    columns: {
      key: string;
      label: string;
      icon?: ComponentProps<typeof Icon>;
      align?: TableColumnProps<unknown>["align"];
      showOnHover?: boolean;
    }[];
    rows: {
      key: string;
      [key: string]: ReactNode;
    }[];
  }
}
