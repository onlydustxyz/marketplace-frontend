import { Text, View } from "@react-pdf/renderer";
import React from "react";

import { styles } from "components/features/invoice-template/invoice-template.styles";
import { TInvoice } from "components/features/invoice-template/invoice-template.types";

export function InvoiceHeader({ type, invoiceNumber }: TInvoice.HeaderProps) {
  const headerText = type === "invoice" ? "Invoice NO" : "Receipt NO";
  return (
    <View style={styles.header}>
      <Text>
        {headerText}: # {invoiceNumber}
      </Text>
    </View>
  );
}
