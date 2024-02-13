import { Text, View } from "@react-pdf/renderer";
import React from "react";

import { styles } from "components/features/invoice-template/invoice-template.styles";
import { TInvoice } from "components/features/invoice-template/invoice-template.types";

export function InvoiceInfo({ senderInfos, recipientInfos, legalInfos }: TInvoice.InvoiceInfoProps) {
  const [senderStreetAddress, ...senderRestAdress] = senderInfos.address.split(/,(.+)/);
  const [recipientStreetAddress, ...recipientRestAdress] = recipientInfos.address.split(/,(.+)/);
  console.log("senderInfos", senderInfos);
  return (
    <View style={{ ...styles.section, ...styles.flexRow }}>
      <View style={{ ...styles.flexCol }}>
        <View style={styles.paddingRightSmall}>
          <Text style={styles.h4}>Company name</Text>
          <Text style={styles.paragraph}>{senderInfos.name}</Text>
          <Text style={styles.paragraph}>{senderStreetAddress}</Text>
          <Text style={styles.paragraph}>{senderRestAdress.join("").trim()}</Text>
          {senderInfos.euVATNumber ? <Text style={styles.paragraph}>VAT number: {senderInfos.euVATNumber}</Text> : null}
        </View>
        <View style={{ ...styles.paddingLeftSmall, ...styles.justifyContentEnd, ...styles.textRight }}>
          <Text style={styles.h4}>Billed to</Text>
          <Text style={styles.paragraph}>{recipientInfos.name}</Text>
          <Text style={styles.paragraph}>{recipientStreetAddress}</Text>
          <Text style={styles.paragraph}>{recipientRestAdress.join("").trim()}</Text>
          <Text style={styles.paragraph}>SIREN: {recipientInfos.registrationNumber}</Text>
          <Text style={styles.paragraph}>VAT number: {recipientInfos.euVATNumber}</Text>
        </View>
      </View>
      <View style={{ ...styles.flexCol }}>
        <View style={styles.paddingRightSmall}>
          <Text style={styles.h4}>Issue Date</Text>
          <Text style={styles.paragraph}>{legalInfos.generationDate}</Text>
        </View>
        <View
          style={{
            ...styles.paddingLeftSmall,
            ...styles.justifyContentEnd,
            ...styles.textRight,
            ...styles.width100p,
          }}
        >
          <Text style={styles.h4}>Due Date</Text>
          <Text style={styles.paragraph}>{legalInfos.dueDate}</Text>
        </View>
      </View>
      <View style={{ ...styles.flexRow }}>
        <Text style={styles.h4}>Destination accounts</Text>
        {legalInfos.destinationAccounts.map(wallet => (
          <Text key={wallet} style={{ ...styles.paragraph, fontSize: 11, lineHeight: 1.2 }}>
            - {wallet}
          </Text>
        ))}
      </View>
    </View>
  );
}
