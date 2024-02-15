import { Text, View } from "@react-pdf/renderer";
import React from "react";

import { getFormattedDateToLocaleDateString } from "src/utils/date";

import { styles } from "components/features/invoice-template/invoice-template.styles";
import { InvoiceTokens } from "components/features/invoice-template/invoice-template.tokens";
import { TInvoice } from "components/features/invoice-template/invoice-template.types";
import { InvoiceVat } from "components/features/invoice-template/sections/invoice-vat";

export function InvoiceSummary({
  rewards,
  vat,
  totalBeforeTax,
  totalTax,
  totalAfterTax,
}: TInvoice.RewardsSummaryProps) {
  return (
    <View style={{ ...styles.section, ...styles.flexRow, ...styles.invoiceCenter }}>
      <Text style={styles.h3}>{InvoiceTokens.rewardSummary.title}</Text>
      <View style={{ ...styles.flexCol }}>
        <View style={styles.table}>
          <View style={styles.tr}>
            <Text style={styles.th}>{InvoiceTokens.rewardSummary.table.id}</Text>
            <Text style={styles.th}>{InvoiceTokens.rewardSummary.table.project}</Text>
            <Text style={styles.th}>{InvoiceTokens.rewardSummary.table.rewardDate}</Text>
            <Text style={styles.th}>{InvoiceTokens.rewardSummary.table.amount}</Text>
            <Text style={styles.th}>{InvoiceTokens.rewardSummary.table.equivalent}</Text>
          </View>
          {rewards.map((item, index) => (
            <View key={index} style={styles.tr}>
              <Text style={styles.td}>#{item.id.slice(0, 8)}</Text>
              <Text style={styles.td}>{item.projectName}</Text>
              <Text style={styles.td}>{getFormattedDateToLocaleDateString(new Date(item.date))}</Text>
              <Text style={styles.td}>
                {item.amount.total} {item.amount.currency}
              </Text>
              <Text style={styles.td}>
                {item.amount.dollarsEquivalent?.toFixed(2)} {InvoiceTokens.currencies.usd}
              </Text>
            </View>
          ))}
          <View style={styles.tr}>
            <Text style={styles.th}></Text>
            <Text style={styles.th}></Text>
            <Text style={styles.th}></Text>
            <Text style={styles.th}>{InvoiceTokens.rewardSummary.table.totalBeforeTax}</Text>
            <Text style={styles.th}>
              {totalBeforeTax?.toFixed(2)} {InvoiceTokens.currencies.usd}
            </Text>
          </View>

          <InvoiceVat vat={vat} totalTax={totalTax} />
          <View style={styles.tr}>
            <Text style={styles.th}></Text>
            <Text style={styles.th}></Text>
            <Text style={styles.th}></Text>
            <Text style={styles.th}>{InvoiceTokens.rewardSummary.table.totalAfterTax}</Text>
            <Text style={styles.th}>
              {totalAfterTax?.toFixed(2)} {InvoiceTokens.currencies.usd}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ ...styles.flexCol, ...styles.paddingVert10P }}>
        <Text style={styles.paragraph}>[number] [type of tokens] {InvoiceTokens.rewardSummary.itemsReceived}</Text>
      </View>
    </View>
  );
}
