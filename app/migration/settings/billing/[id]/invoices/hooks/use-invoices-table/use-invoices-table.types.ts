import { ReactNode } from "react";

import { HeaderCellWidth } from "src/components/Table/HeaderCell";

export namespace TInvoiceTable {
  export interface Props {
    onDownloadInvoice: (invoiceId: { number: string | undefined; invoiceId: string | undefined }) => void;
    isDownloading: boolean;
  }

  export interface HeaderCell {
    icon: ReactNode;
    label: string;
    width?: HeaderCellWidth;
    className?: string;
  }
}
