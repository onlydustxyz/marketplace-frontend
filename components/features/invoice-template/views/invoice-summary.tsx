import { Text, View } from "@react-pdf/renderer";
import React from "react";

import { styles } from "components/features/invoice-template/invoice-template.styles";
import { TInvoice } from "components/features/invoice-template/invoice-template.types";

export function InvoiceSummary({ rewards, total }: TInvoice.RewardsSummaryProps) {
  return (
    <View style={{ ...styles.section, ...styles.flexRow, ...styles.invoiceCenter }}>
      <Text style={styles.h3}>Rewards summary</Text>
      <View style={{ ...styles.flexCol }}>
        <View style={styles.table}>
          <View style={styles.tr}>
            <Text style={styles.th}>Project Name</Text>
            <Text style={styles.th}>Amount (currency)</Text>
            <Text style={styles.th}>Dollars equivalent</Text>
          </View>
          {rewards.map((item, index) => (
            <View key={index} style={styles.tr}>
              <Text style={styles.td}>{item.rewardedOnProjectName}</Text>
              <Text style={styles.td}>
                {item.amount.total} {item.amount.currency}
              </Text>
              <Text style={styles.td}>{item.amount.dollarsEquivalent?.toFixed(3)} USC</Text>
            </View>
          ))}
          <View style={styles.tr}>
            <Text style={styles.th}>Total Due</Text>
            <Text style={styles.th}></Text>
            <Text style={styles.th}>{total} USD</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
