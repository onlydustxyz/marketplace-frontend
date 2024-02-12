import { Text, View } from "@react-pdf/renderer";
import React from "react";

import { styles } from "components/features/invoice-template/invoice-template.styles";
import { TInvoice } from "components/features/invoice-template/invoice-template.types";

export function InvoiceSummary({ rewards, total, vat }: TInvoice.RewardsSummaryProps) {
  return (
    <View style={{ ...styles.section, ...styles.flexRow, ...styles.invoiceCenter }}>
      <Text style={styles.h3}>Rewards summary</Text>
      <View style={{ ...styles.flexCol }}>
        <View style={styles.table}>
          <View style={styles.tr}>
            <Text style={styles.th}>ID</Text>
            <Text style={styles.th}>Reward date</Text>
            <Text style={styles.th}>Amount</Text>
            <Text style={styles.th}>USD equivalent</Text>
          </View>
          {rewards.map((item, index) => (
            <View key={index} style={styles.tr}>
              <Text style={styles.td}>{item.rewardedOnProjectName}</Text>
              <Text style={styles.td}>{item.rewardedOnProjectName}</Text>
              <Text style={styles.td}>
                {item.amount.total} {item.amount.currency}
              </Text>
              <Text style={styles.td}>{item.amount.dollarsEquivalent?.toFixed(3)} USD</Text>
            </View>
          ))}
          <View style={styles.tr}>
            <Text style={styles.th}>Total before tax</Text>
            <Text style={styles.th}></Text>
            <Text style={styles.th}></Text>
            <Text style={styles.th}>{total} USD</Text>
          </View>
          {vat.specificities === "VAT_APPLICABLE" ? (
            <View style={styles.tr}>
              <View style={styles.td}>
                <Text>Total VAT</Text>
                <Text>(rate 20%)</Text>
              </View>
              <Text style={styles.td}></Text>
              <Text style={styles.td}></Text>
              <Text style={styles.td}>XXXXX USD</Text>
            </View>
          ) : null}
          {vat.specificities === "VAT_NOT_APPLICABLE_NON_UE" ? (
            <View style={styles.tr}>
              <Text style={{ ...styles.td, fontSize: "10px" }}>
                VAT not applicable – Art. 259-1 of the General Tax Code
              </Text>
            </View>
          ) : null}
          {vat.specificities === "VAT_NOT_APPLICABLE_FRENCH_NOT_SUBJECT" ? (
            <View style={styles.tr}>
              <Text style={{ ...styles.td, fontSize: "10px" }}>
                VAT not applicable, article 293 B of the General Tax Code
              </Text>
            </View>
          ) : null}
          {vat.specificities === "VAT_REVERSE_CHARGE" ? (
            <View style={styles.tr}>
              <Text style={{ ...styles.td, fontSize: "10px" }}>VAT reverse charge</Text>
            </View>
          ) : null}
          <View style={styles.tr}>
            <Text style={styles.th}>Total after tax</Text>
            <Text style={styles.th}></Text>
            <Text style={styles.th}></Text>
            <Text style={styles.th}>{total} USD</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
