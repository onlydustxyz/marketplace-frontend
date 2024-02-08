import React from "react";

import { styles } from "components/features/invoice-template/invoice-template.styles";
import { TInvoiceTemplate } from "components/features/invoice-template/invoice-template.types";

export function InvoiceHeader({ logoUrl, invoiceNumber }: TInvoiceTemplate.HeaderProps) {
  return (
    <div style={styles["header"]}>
      <div style={styles["logo"]}>
        <img src={logoUrl} height="50" alt="logo" />
      </div>
      <div style={styles["invoiceNumber"]}>
        <strong>Invoice NO: #{invoiceNumber}</strong>
      </div>
    </div>
  );
}
