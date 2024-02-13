import { Text, View } from "@react-pdf/renderer";
import React from "react";

import { getFormattedDateToLocaleDateString } from "src/utils/date";

import { styles } from "components/features/invoice-template/invoice-template.styles";
import { TInvoice } from "components/features/invoice-template/invoice-template.types";

export function InvoiceSummary({
  rewards,
  vat,
  totalBeforeTax,
  totalTax,
  totalAfterTax,
}: TInvoice.RewardsSummaryProps) {
  return (
    <View style={{ ...styles.section, ...styles.flexRow, ...styles.invoiceCenter }}>
      <Text style={styles.h3}>Rewards summary</Text>
      <View style={{ ...styles.flexCol }}>
        <View style={styles.table}>
          <View style={styles.tr}>
            <Text style={styles.th}>ID</Text>
            <Text style={styles.th}>Project</Text>
            <Text style={styles.th}>Reward date</Text>
            <Text style={styles.th}>Amount</Text>
            <Text style={styles.th}>USD (equiv)</Text>
          </View>
          {rewards.map((item, index) => (
            <View key={index} style={styles.tr}>
              <Text style={styles.td}>#{item.id.slice(0, 8)}</Text>
              <Text style={styles.td}>{item.projectName}</Text>
              <Text style={styles.td}>{getFormattedDateToLocaleDateString(new Date(item.date))}</Text>
              <Text style={styles.td}>
                {item.amount.total} {item.amount.currency}
              </Text>
              <Text style={styles.td}>{item.amount.dollarsEquivalent?.toFixed(2)} USD</Text>
            </View>
          ))}
          <View style={styles.tr}>
            <Text style={styles.th}>Total before tax</Text>
            <Text style={styles.th}></Text>
            <Text style={styles.th}></Text>
            <Text style={styles.th}></Text>
            <Text style={styles.th}>{totalBeforeTax} USD</Text>
          </View>
          {vat.vatRegulationState === "VAT_APPLICABLE" ? (
            <View style={styles.tr}>
              <View style={styles.td}>
                <Text>Total VAT</Text>
                <Text>(rate {vat.rate})</Text>
              </View>
              <Text style={styles.td}></Text>
              <Text style={styles.td}></Text>
              <Text style={styles.td}></Text>
              <Text style={styles.td}>{totalTax} USD</Text>
            </View>
          ) : null}
          {vat.vatRegulationState === "VAT_NOT_APPLICABLE_NON_UE" ? (
            <View style={styles.tr}>
              <Text style={{ ...styles.td, fontSize: "10px" }}>
                VAT not applicable – Art. 259-1 of the General Tax Code
              </Text>
            </View>
          ) : null}
          {vat.vatRegulationState === "VAT_NOT_APPLICABLE_FRENCH_NOT_SUBJECT" ? (
            <View style={styles.tr}>
              <Text style={{ ...styles.td, fontSize: "10px" }}>
                VAT not applicable, article 293 B of the General Tax Code
              </Text>
            </View>
          ) : null}
          {vat.vatRegulationState === "VAT_REVERSE_CHARGE" ? (
            <View style={styles.tr}>
              <Text style={{ ...styles.td, fontSize: "10px" }}>Reverse charge of VAT</Text>
            </View>
          ) : null}
          <View style={styles.tr}>
            <Text style={styles.th}>Total after tax</Text>
            <Text style={styles.th}></Text>
            <Text style={styles.th}></Text>
            <Text style={styles.th}></Text>
            <Text style={styles.th}>{totalAfterTax} USD</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
