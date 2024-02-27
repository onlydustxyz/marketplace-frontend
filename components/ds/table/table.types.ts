import { TableBodyProps, TableCellProps, TableColumnProps, TableHeaderProps, TableProps } from "@nextui-org/react";
import { ComponentProps, ReactNode } from "react";
import { TableRowProps } from "react-markdown/lib/ast-to-react";

import { Key } from "src/hooks/useIntl";

import { Icon } from "components/layout/icon/icon";

export namespace TTable {
  export type Base = Partial<TableProps>;
  export type TableHeader = Partial<TableHeaderProps<Column>>;
  export type TableColumn = Partial<TableColumnProps<Column>>;
  export type TableBody = Partial<TableBodyProps<Row>>;
  export type TableRow = Partial<TableRowProps>;
  export type TableCell = Partial<TableCellProps>;

  interface TranslateToken {
    token: Key;
    params?: Record<string, string>;
  }
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

  export interface Props extends Base {
    columns: Column[];
    rows: Row[];
    TableHeaderProps?: TableHeader;
    TableColumnProps?: TableColumn;
    TableBodyProps?: TableBody;
    TableRowProps?: TableRow;
    TableCellProps?: TableCell;
    EmptyProps?: {
      illustrationSrc?: string;
      title?: TranslateToken;
      description?: TranslateToken;
      actionLabel?: TranslateToken;
      onAction?: () => void;
    };
  }
}
