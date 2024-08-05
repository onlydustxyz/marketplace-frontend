import { TInvoiceStatus } from "app/(v1)/settings/billing/[id]/invoices/features/invoice-status/invoice-status.types";

import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

export function InvoiceStatus({ status }: TInvoiceStatus.InvoiceStatusProps) {
  const statusIcons = {
    COMPLETE: <Icon remixName={"ri-check-double-line"} size={16} />,
    DRAFT: <Icon remixName={"ri-draft-line"} size={16} />,
    PROCESSING: <Icon remixName={"ri-time-line"} size={16} />,
    REJECTED: <Icon remixName={"ri-close-line"} size={16} />,
  };

  const statusText = {
    COMPLETE: <Translate token="v2.pages.settings.invoices.invoiceStatus.approved" />,
    DRAFT: <Translate token="v2.pages.settings.invoices.invoiceStatus.draft" />,
    PROCESSING: <Translate token="v2.pages.settings.invoices.invoiceStatus.processing" />,
    REJECTED: <Translate token="v2.pages.settings.invoices.invoiceStatus.rejected" />,
  };

  if (status) {
    return (
      <div className="flex flex-row items-start gap-2">
        {statusIcons[status]}
        <span>{statusText[status]}</span>
      </div>
    );
  }

  return null;
}
