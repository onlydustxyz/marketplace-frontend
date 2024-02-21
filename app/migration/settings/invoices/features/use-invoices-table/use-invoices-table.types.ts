import { ReactNode } from "react";

import { HeaderCellWidth } from "src/components/Table/HeaderCell";

export namespace TInvoiceTable {
  export interface Props {
    onDownloadInvoice: (invoiceId: string | undefined) => void;
  }

  export interface HeaderCell {
    icon: ReactNode;
    label: string;
    width?: HeaderCellWidth;
    className?: string;
  }
}
