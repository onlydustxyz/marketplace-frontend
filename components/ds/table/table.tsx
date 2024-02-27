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

import { IMAGES } from "src/assets/img";
import { cn } from "src/utils/cn";

import { TTable } from "components/ds/table/table.types";
import { Icon } from "components/layout/icon/icon";
import { EmptyState } from "components/layout/placeholders/empty-state/empty-state";

// TODO load more - https://nextui.org/docs/components/table#loading-more-data
// TODO loading state - https://nextui.org/docs/components/table#tablebody-props
// TODO sort - https://nextui.org/docs/components/table#sorting-rows
// TODO infinite pagination - https://nextui.org/docs/components/table#infinite-pagination
export function Table({
  columns,
  rows,
  TableHeaderProps,
  TableColumnProps,
  TableBodyProps,
  TableRowProps,
  TableCellProps,
  EmptyProps,
  ...TableProps
}: TTable.Props) {
  const classNames = useMemo(
    () => ({
      wrapper: "bg-transparent",
      thead: "last:[&>tr]:hidden pb-1",
      th: "bg-transparent border-b border-card-border-medium text-gray-400 uppercase font-walsheim text-sm font-medium h-auto pb-2",
      tr: "group/table-row",
      td: "py-3 h-auto",
      tbody: "first-of-type:tr:td:pt-50 [&>tr:first-child>td]:pt-5",
    }),
    []
  );

  return (
    <NextTable classNames={classNames} removeWrapper {...TableProps}>
      <TableHeader columns={columns} {...(TableHeaderProps || {})}>
        {column => (
          <TableColumn key={column.key} {...(TableColumnProps || {})}>
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

      <TableBody
        items={rows}
        {...(TableBodyProps || {})}
        emptyContent={
          <EmptyState
            illustrationSrc={EmptyProps?.illustrationSrc || IMAGES.global.payment}
            title={EmptyProps?.title || { token: "v2.features.table.emptyState.title" }}
            description={EmptyProps?.description || { token: "v2.features.table.emptyState.message" }}
            actionLabel={EmptyProps?.actionLabel}
            onAction={EmptyProps?.onAction}
          />
        }
      >
        {item => (
          <TableRow
            key={item.key}
            {...(TableRowProps || {})}
            className={cn(
              "border-b border-card-border-light duration-200 transition hover:bg-white/5",
              TableRowProps?.className
            )}
          >
            {columnKey => {
              const column = columns.find(({ key }) => key === columnKey);

              return (
                <TableCell
                  {...(TableCellProps || {})}
                  className={cn(
                    {
                      "text-left": column?.align === "start",
                      "text-center": column?.align === "center",
                      "text-right": column?.align === "end",
                    },
                    TableCellProps?.className
                  )}
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
