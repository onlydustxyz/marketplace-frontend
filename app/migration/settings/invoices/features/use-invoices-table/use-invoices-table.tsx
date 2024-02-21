import { TInvoiceTable } from "app/migration/settings/invoices/features/use-invoices-table/use-invoices-table.types";

import { components } from "src/__generated/api";
import Cell, { CellHeight } from "src/components/Table/Cell";
import Line from "src/components/Table/Line";
import { useIntl } from "src/hooks/useIntl";
import SendPlane2Line from "src/icons/SendPlane2Line";

import { Button } from "components/ds/button/button";
import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { Icon } from "components/layout/icon/icon";

export function useInvoicesTable({ onDownloadInvoice }: TInvoiceTable.Props) {
  const { T } = useIntl();

  const headerCells: TInvoiceTable.HeaderCell[] = [
    {
      icon: <span>#</span>,
      label: T("v2.pages.settings.invoices.table.headerCells.id"),
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

  function bodyRow(invoice?: components["schemas"]["BillingProfileInvoicesPageItemResponse"]) {
    if (!invoice) return null;

    const { id, createdAt, totalAfterTax, status } = invoice;

    return (
      <Line key={id} className="group border-card-border-light">
        <Cell height={CellHeight.Compact}>{id}</Cell>
        <Cell height={CellHeight.Compact}>{createdAt}</Cell>
        <Cell height={CellHeight.Compact}>{`${totalAfterTax?.amount} ${totalAfterTax?.currency}`}</Cell>

        <Cell height={CellHeight.Compact}>{status}</Cell>
        <Cell height={CellHeight.Compact}>
          <Button variant="primary" size="m" className="w-full" onClick={() => onDownloadInvoice(id)} disabled={!id}>
            <SendPlane2Line />
          </Button>
        </Cell>
      </Line>
    );
  }

  function bodyRowLoading() {
    const line = () => (
      <tr>
        <td className="py-2">
          <SkeletonEl width="40%" height="16px" variant="text" color="blue" />
        </td>
        <td className="py-2">
          <SkeletonEl width="50%" height="16px" variant="text" color="blue" />
        </td>
        <td className="py-2">
          <SkeletonEl width="30%" height="16px" variant="text" color="blue" />
        </td>
        <td className="py-2">
          <SkeletonEl width="60%" height="16px" variant="text" color="blue" />
        </td>
        <td className="py-2">
          <SkeletonEl className="m-auto" width="20%" height="16px" variant="circular" color="blue" />
        </td>
      </tr>
    );

    return [line(), line(), line(), line(), line()];
  }

  return { headerCells, bodyRow, bodyRowLoading };
}
