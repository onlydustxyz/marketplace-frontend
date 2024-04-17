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

export function Table({
  label,
  columns,
  rows,
  TableHeaderProps = {},
  TableColumnProps = {},
  TableBodyProps = {},
  TableRowProps = {},
  TableCellProps = {},
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
      sortIcon: "data-[visible=true]:text-spacePurple-500 mb-1",
    }),
    []
  );

  return (
    <NextTable aria-label={label} classNames={classNames} removeWrapper {...TableProps}>
      <TableHeader columns={columns} {...(TableHeaderProps || {})}>
        {({ key, align, icon, children, ...restColumn }) => (
          <TableColumn
            {...TableColumnProps}
            key={key}
            {...(restColumn ?? {})}
            className={cn({
              "text-left": align === "start",
              "text-center": align === "center",
              "text-right": align === "end",
            })}
          >
            <div className={cn("inline-flex gap-1")}>
              {icon ? <Icon {...icon} /> : null}
              {children}
            </div>
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        {...TableBodyProps}
        items={rows}
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
            {...TableRowProps}
            key={item.key}
            className={cn(
              "border-b border-card-border-light duration-200 transition hover:bg-white/5",
              TableRowProps?.className
            )}
          >
            {columnKey => {
              const column = columns.find(({ key }) => key === columnKey);

              return (
                <TableCell
                  {...TableCellProps}
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
