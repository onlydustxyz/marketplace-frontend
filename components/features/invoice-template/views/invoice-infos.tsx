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
          <Text style={styles.paragraph}>SIREN : 908 233 638</Text>
          <Text style={styles.paragraph}>VAT number : FR26908233638</Text>
        </View>
      </View>
      <View style={{ ...styles.flexCol }}>
        <View style={styles.paddingRightSmall}>
          <Text style={styles.h4}>Issue Date</Text>
          <Text style={styles.paragraph}>{legalInfos.date}</Text>
          <Text style={styles.h4}>Due Date</Text>
          <Text style={styles.paragraph}>{legalInfos.date} +10</Text>
        </View>
        <View
          style={{
            ...styles.paddingLeftSmall,
            ...styles.justifyContentEnd,
            ...styles.textRight,
            ...styles.width100p,
          }}
        >
          <Text style={styles.h4}>Destination wallets</Text>
          {legalInfos.destinationWallets.map(wallet => (
            <Text key={wallet} style={styles.paragraph}>
              {wallet}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}

// num de reward
// reward date
// before tax
// tax VAT : zero if not applicable
// total after tax
