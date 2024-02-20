import { Text, View } from "@react-pdf/renderer";
import React from "react";

import { styles } from "components/features/invoice-template/invoice-template.styles";
import { InvoiceTokens } from "components/features/invoice-template/invoice-template.tokens";
import { TInvoice } from "components/features/invoice-template/invoice-template.types";

export function InvoiceFooter({ invoiceName }: TInvoice.FooterProps) {
  return (
    <View style={{ ...styles.paddingHoriz30P }} wrap={false}>
      <Text style={styles.h4}>{InvoiceTokens.footer.title}</Text>
      <Text style={styles.paragraph}>- {InvoiceTokens.footer.issuedBy(invoiceName)}</Text>
      <Text style={styles.paragraph}>- {InvoiceTokens.footer.penalities}</Text>
    </View>
  );
}
