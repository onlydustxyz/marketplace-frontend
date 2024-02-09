import { Text, View } from "@react-pdf/renderer";
import React from "react";

import { styles } from "components/features/invoice-template/invoice-template.styles";
import { TInvoice } from "components/features/invoice-template/invoice-template.types";

export function InvoiceFooter({ importantNote, paymentInfo }: TInvoice.FooterProps) {
  return (
    <View style={{ ...styles.section, ...styles.flexCol, ...styles.alignItemsStart }}>
      <View style={{ ...styles.width100p, ...styles.paddingRightSmall }}>
        <Text style={styles.h4}>Important Note</Text>
        <Text style={styles.paragraph}>- Once order done, money can&apos;t refund {importantNote}</Text>
        <Text style={styles.paragraph}>- Delivery might delay due to some external dependency</Text>
        <Text style={styles.paragraph}>
          - This is computer generated invoice and physical signature does not require
        </Text>
      </View>
      <View style={{ ...styles.paddingLeftSmall, ...styles.justifyContentEnd, ...styles.textRight }}>
        <Text style={styles.h4}>Payment Info</Text>
        <Text style={styles.paragraph}>This payment made by XXX BANK {paymentInfo}</Text>
      </View>
    </View>
  );
}
