import { Text, View } from "@react-pdf/renderer";

import { styles } from "components/features/invoice-template/invoice-template.styles";
import { InvoiceTokens } from "components/features/invoice-template/invoice-template.tokens";
import { TInvoice } from "components/features/invoice-template/invoice-template.types";

export function InvoiceVat({ vat, totalTax }: TInvoice.InvoiceVatInfoProps) {
  const renderVATApplicable = () => (
    <View style={styles.tr}>
      <View style={styles.tdSmall}></View>
      <Text style={styles.td}></Text>
      <Text style={styles.td}></Text>
      <Text style={styles.td}>
        <Text>{InvoiceTokens.rewardSummary.table.totalVat} </Text>
        <Text>({vat.rate})</Text>
      </Text>
      <Text style={styles.td}>
        {totalTax?.toFixed(2)} {InvoiceTokens.currencies.usd}
      </Text>
    </View>
  );

  const renderVATNotApplicable = (message: string) => (
    <View style={styles.tr}>
      <Text style={{ ...styles.td, fontSize: "10px" }}>{message}</Text>
    </View>
  );

  switch (vat.vatRegulationState) {
    case "VAT_APPLICABLE":
      return renderVATApplicable();
    case "VAT_NOT_APPLICABLE_NON_UE":
      return renderVATNotApplicable(InvoiceTokens.vatRegulationStates.vatNotApplicableNonUE);
    case "VAT_NOT_APPLICABLE_FRENCH_NOT_SUBJECT":
      return renderVATNotApplicable(InvoiceTokens.vatRegulationStates.vatNotApplicableFrenchNotSubject);
    case "VAT_REVERSE_CHARGE":
      return renderVATNotApplicable(InvoiceTokens.vatRegulationStates.vatReverseCharge);
    default:
      return (
        <View style={styles.tr}>
          <View style={styles.tdSmall}></View>
          <Text style={styles.td}></Text>
          <Text style={styles.td}></Text>
          <Text style={styles.td}>
            <Text>{InvoiceTokens.rewardSummary.table.totalVat} </Text>
            <Text>({vat.rate})</Text>
          </Text>
          <Text style={styles.td}>
            {totalTax?.toFixed(2)} {InvoiceTokens.currencies.usd}
          </Text>
        </View>
      );
  }
}
