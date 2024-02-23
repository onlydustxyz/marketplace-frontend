import {
  Table as NextTable,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { useMemo } from "react";

import { cn } from "src/utils/cn";

import { TTable } from "components/ds/table/table.types";
import { Icon } from "components/layout/icon/icon";

// TODO load more - https://nextui.org/docs/components/table#loading-more-data
// TODO loading state - https://nextui.org/docs/components/table#tablebody-props
// TODO empty state - https://nextui.org/docs/components/table#tablebody-props
// TODO sort - https://nextui.org/docs/components/table#sorting-rows
// TODO infinite pagination - https://nextui.org/docs/components/table#infinite-pagination
export function Table({ columns, rows }: TTable.Props) {
  const classNames = useMemo(
    () => ({
      wrapper: "bg-transparent",
      thead: "last:[&>tr]:hidden",
      th: "bg-transparent border-b border-card-border-medium text-gray-400 uppercase font-walsheim text-sm font-medium h-auto pb-2",
      tr: "group/table-row [&>td]:h-10 [&>td]:py-0",
    }),
    []
  );

  return (
    <NextTable classNames={classNames} removeWrapper>
      <TableHeader columns={columns}>
        {column => (
          <TableColumn key={column.key}>
            <div
              className={cn("flex gap-1", {
                "justify-start": column.align === "start",
                "justify-center": column.align === "center",
                "justify-end": column.align === "end",
              })}
            >
              {column.icon ? <Icon {...column.icon} /> : null}
              {column.label}
            </div>
          </TableColumn>
        )}
      </TableHeader>

      <TableBody items={rows}>
        {item => (
          <TableRow
            key={item.key}
            className="border-b border-card-border-light duration-200 transition hover:bg-white/5"
          >
            {columnKey => {
              const column = columns.find(({ key }) => key === columnKey);

              return (
                <TableCell
                  className={cn({
                    "text-left": column?.align === "start",
                    "text-center": column?.align === "center",
                    "text-right": column?.align === "end",
                  })}
                >
                  <div
                    className={cn({
                      "opacity-0 transition-opacity group-hover/table-row:opacity-100": column?.showOnHover,
                    })}
                  >
                    {getKeyValue(item, columnKey)}
                  </div>
                </TableCell>
              );
            }}
          </TableRow>
        )}
      </TableBody>
    </NextTable>
  );
}
