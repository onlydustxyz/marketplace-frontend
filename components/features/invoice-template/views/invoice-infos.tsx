import { Text, View } from "@react-pdf/renderer";
import React from "react";

import { styles } from "components/features/invoice-template/invoice-template.styles";
import { TInvoice } from "components/features/invoice-template/invoice-template.types";

export function InvoiceInfo({ senderInfos, recipientInfos, legalInfos }: TInvoice.InvoiceInfoProps) {
  const [senderStreetAddress, ...senderRestAdress] = senderInfos.address.split(/,(.+)/);
  const [recipientStreetAddress, ...recipientRestAdress] = recipientInfos.address.split(/,(.+)/);
  return (
    <View style={{ ...styles.section, ...styles.flexRow }}>
      <View style={{ ...styles.flexCol }}>
        <View style={styles.paddingRightSmall}>
          <Text style={styles.h4}>Invoice to</Text>
          <Text style={styles.paragraph}>{senderInfos.name}</Text>
          <Text style={styles.paragraph}>{senderStreetAddress}</Text>
          <Text style={styles.paragraph}>{senderRestAdress.join("").trim()}</Text>
        </View>
        <View style={{ ...styles.paddingLeftSmall, ...styles.justifyContentEnd, ...styles.textRight }}>
          <Text style={styles.h4}>Bill to</Text>
          <Text style={styles.paragraph}>{recipientInfos.name}</Text>
          <Text style={styles.paragraph}>{recipientStreetAddress}</Text>
          <Text style={styles.paragraph}>{recipientRestAdress.join("").trim()}</Text>
        </View>
      </View>
      <View style={{ ...styles.flexCol }}>
        <View style={styles.paddingRightSmall}>
          <Text style={styles.h4}>Date</Text>
          <Text style={styles.paragraph}>{legalInfos.date}</Text>
        </View>
        <View
          style={{
            ...styles.paddingLeftSmall,
            ...styles.justifyContentEnd,
            ...styles.textRight,
            ...styles.width100p,
          }}
        >
          <Text style={styles.h4}>Payment method</Text>
          <Text style={styles.paragraph}>bank transfer</Text>
        </View>
      </View>
    </View>
  );
}
