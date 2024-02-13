import { Text, View } from "@react-pdf/renderer";
import React from "react";

import { styles } from "components/features/invoice-template/invoice-template.styles";
import { TInvoice } from "components/features/invoice-template/invoice-template.types";

export function InvoiceFooter({ invoiceName }: TInvoice.FooterProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.h4}>Important Note</Text>
      <Text style={styles.paragraph}>
        - Invoice issued by Wagmi on behalf and for the account of {invoiceName}, Self-billing
      </Text>
      <Text style={styles.paragraph}>
        - Late payment penalties: three times the annual legal interest rate in effect calculated from the due date
        until full payment. lump sum compensation for recovery costs in the event of late payment: 40 USD
      </Text>
    </View>
  );
}
