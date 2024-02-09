import { Text, View } from "@react-pdf/renderer";
import React from "react";

import { styles } from "components/features/invoice-template/invoice-template.styles";
import { TInvoice } from "components/features/invoice-template/invoice-template.types";

export function InvoiceHeader({ invoiceNumber }: TInvoice.HeaderProps) {
  return (
    <View style={styles.header}>
      <Text>Invoice NO: # {invoiceNumber}</Text>
    </View>
  );
}
