import { Text, View } from "@react-pdf/renderer";

import { styles } from "components/features/invoice-template/invoice-template.styles";
import { InvoiceTokens } from "components/features/invoice-template/invoice-template.tokens";
import { TInvoice } from "components/features/invoice-template/invoice-template.types";

export function InvoiceInfo({ senderInfos, recipientInfos, legalInfos, isUserIndividual }: TInvoice.InvoiceInfoProps) {
  const [recipientStreetAddress, ...recipientRestAdress] = recipientInfos.address.split(/,(.+)/);
  return (
    <View style={{ ...styles.section, ...styles.flexRow }}>
      <View style={styles.flexCol}>
        <View style={styles.paddingRightSmall}>
          <Text style={styles.h4}>
            {isUserIndividual ? InvoiceTokens.invoiceInfos.individualName : InvoiceTokens.invoiceInfos.companyName}
          </Text>
          <Text style={styles.paragraph}>{senderInfos.name}</Text>
          <Text style={{ ...styles.paragraph, maxWidth: "350px" }}>{senderInfos.address}</Text>
          {senderInfos.euVATNumber ? (
            <Text style={styles.paragraph}>
              {InvoiceTokens.invoiceInfos.vatNumber}: {senderInfos.euVATNumber}
            </Text>
          ) : null}
        </View>
        <View style={{ ...styles.paddingLeftSmall, ...styles.justifyContentEnd, ...styles.textRight }}>
          <Text style={styles.h4}>{InvoiceTokens.invoiceInfos.billedTo}</Text>
          <Text style={styles.paragraph}>{recipientInfos.name}</Text>
          <Text style={styles.paragraph}>{recipientStreetAddress}</Text>
          <Text style={styles.paragraph}>{recipientRestAdress.join("").trim()}</Text>
          <Text style={styles.paragraph}>
            {InvoiceTokens.invoiceInfos.siren}: {recipientInfos.registrationNumber}
          </Text>
          <Text style={styles.paragraph}>
            {InvoiceTokens.invoiceInfos.vatNumber}: {recipientInfos.euVATNumber}
          </Text>
        </View>
      </View>
      <View style={styles.flexCol}>
        <View style={styles.paddingRightSmall}>
          <Text style={styles.h4}>{InvoiceTokens.invoiceInfos.issueDate}</Text>
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
          <Text style={styles.h4}>{InvoiceTokens.invoiceInfos.dueDate}</Text>
          <Text style={styles.paragraph}>{legalInfos.dueDate}</Text>
        </View>
      </View>
      <View style={styles.flexRow} wrap={false}>
        <Text style={styles.h4}>{InvoiceTokens.invoiceInfos.destinationAccounts}</Text>
        {legalInfos.destinationAccounts.map((account, index) => (
          <Text key={index} style={{ ...styles.paragraph, fontSize: 11, lineHeight: 1.2 }}>
            - {account}
          </Text>
        ))}
      </View>
    </View>
  );
}
