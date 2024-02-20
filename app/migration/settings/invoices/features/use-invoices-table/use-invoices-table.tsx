import { ReactNode } from "react";

import { TInvoiceTable } from "app/migration/settings/invoices/features/use-invoices-table/use-invoices-table.types";

import { components } from "src/__generated/api";
import Cell, { CellHeight } from "src/components/Table/Cell";
import { HeaderCellWidth } from "src/components/Table/HeaderCell";
import Line from "src/components/Table/Line";
import { useIntl } from "src/hooks/useIntl";
import SendPlane2Line from "src/icons/SendPlane2Line";

import { Button } from "components/ds/button/button";
import { Icon } from "components/layout/icon/icon";

type HeaderCell = {
  icon: ReactNode;
  label: string;
  width?: HeaderCellWidth;
  className?: string;
};

export function useInvoicesTable({ onDownloadInvoice }: TInvoiceTable.Props) {
  const { T } = useIntl();

  const headerCells: HeaderCell[] = [
    {
      icon: <span>#</span>,
      label: T("v2.pages.settings.invoices.table.headerCells.id"),
      width: HeaderCellWidth.Fifth,
    },
    {
      icon: <Icon remixName={"ri-calendar-event-line"} size={16} />,
      label: T("v2.pages.settings.invoices.table.headerCells.date"),
    },
    {
      icon: <Icon remixName={"ri-money-dollar-circle-line"} size={16} />,
      label: T("v2.pages.settings.invoices.table.headerCells.amount"),
    },
    {
      icon: <Icon remixName={"ri-loader-2-line"} size={16} />,
      label: T("v2.pages.settings.invoices.table.headerCells.status"),
    },
    {
      icon: <div />,
      label: "",
    },
  ];

  const bodyRow = (invoice?: components["schemas"]["BillingProfileInvoicesPageItemResponse"]) => {
    if (!invoice) return null;

    const { id, createdAt, totalAfterTax, status, number } = invoice;

    return (
      <Line key={id} className="group border-card-border-light">
        <Cell height={CellHeight.Compact}>{id}</Cell>
        <Cell height={CellHeight.Compact}>{createdAt}</Cell>
        <Cell height={CellHeight.Compact}>{`${totalAfterTax?.amount} ${totalAfterTax?.currency}`}</Cell>

        <Cell height={CellHeight.Compact}>{status}</Cell>
        <Cell height={CellHeight.Compact}>
          <Button
            variant="primary"
            size="m"
            className="w-full"
            onClick={() => onDownloadInvoice(id)}
            disabled={!number}
          >
            <SendPlane2Line />
          </Button>
        </Cell>
      </Line>
    );
  };

  return { headerCells, bodyRow };
}
