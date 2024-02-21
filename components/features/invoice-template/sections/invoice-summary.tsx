import { Text, View } from "@react-pdf/renderer";
import { InvoicePreviewResponse } from "actions/billing-profiles/billing-profiles-queries.actions";
import React from "react";

import { getFormattedDateGB } from "src/utils/date";

import { styles } from "components/features/invoice-template/invoice-template.styles";
import { InvoiceTokens } from "components/features/invoice-template/invoice-template.tokens";
import { TInvoice } from "components/features/invoice-template/invoice-template.types";
import { InvoiceVat } from "components/features/invoice-template/sections/invoice-vat";

function calculateTotalAmounts(rewards: InvoicePreviewResponse["rewards"]): { currency: string; total: number }[] {
  const totals = rewards?.reduce((acc, reward) => {
    const { currency, amount } = reward.amount;
    if (acc[currency]) {
      acc[currency] += amount;
    } else {
      acc[currency] = amount;
    }
    return acc;
  }, {} as Record<string, number>);

  if (totals) {
    return Object.entries(totals).map(([currency, total]) => ({ currency, total }));
  }

  return [];
}
export function InvoiceSummary({
  rewards,
  vat,
  totalBeforeTax,
  totalTax,
  totalAfterTax,
}: TInvoice.RewardsSummaryProps) {
  const totalAmounts = calculateTotalAmounts(rewards);
  return (
    <View style={styles.flexRow}>
      <View style={{ ...styles.section, ...styles.flexRow, ...styles.invoiceCenter }}>
        <Text style={styles.h3}>{InvoiceTokens.rewardSummary.title}</Text>
        <View style={styles.flexCol}>
          <View style={styles.table}>
            <View style={styles.tr}>
              <Text style={styles.thSmall}>{InvoiceTokens.rewardSummary.table.id}</Text>
              <Text style={styles.th}>{InvoiceTokens.rewardSummary.table.project}</Text>
              <Text style={styles.th}>{InvoiceTokens.rewardSummary.table.rewardDate}</Text>
              <Text style={styles.th}>{InvoiceTokens.rewardSummary.table.amount}</Text>
              <Text style={styles.th}>{InvoiceTokens.rewardSummary.table.rate}</Text>
              <Text style={styles.th}>{InvoiceTokens.rewardSummary.table.equivalent}</Text>
            </View>
            {rewards?.map((item, index) => (
              <View key={index} style={styles.tr}>
                <Text style={styles.tdSmall}>#{item.id.slice(0, 4)}</Text>
                <Text style={styles.td}>
                  {item.projectName.length > 12 ? `${item.projectName.slice(0, 12)}...` : item.projectName}
                </Text>
                <Text style={styles.td}>{getFormattedDateGB(new Date(item.date))}</Text>
                <Text style={styles.td}>{`${item.amount.amount} ${item.amount.currency}`}</Text>
                <View style={{ ...styles.td, ...styles.flexRow }}>
                  {/*the result should look like this*/}
                  {/*1 ETH ~ 3,000 USD*/}
                  <Text>{`1 ${item.amount.currency}`}</Text>
                  <Text>{`~${item.amount.base.conversionRate.toFixed(2)} ${item.amount.base.currency}`}</Text>
                </View>
                <Text style={styles.td}>
                  {item.amount.base.amount.toFixed(2)} {item.amount.base.currency}
                </Text>
              </View>
            ))}
            <View wrap={false}>
              <View style={styles.tr}>
                <Text style={styles.tdSmall}></Text>
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
                <Text style={styles.tdSmall}></Text>
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
        </View>
      </View>
      <View style={{ ...styles.flexRow, ...styles.marginTop25P, ...styles.paddingHoriz30P }} wrap={false}>
        <Text style={styles.h4}>{InvoiceTokens.rewardSummary.specialMentions}</Text>
        {totalAmounts?.map((item, index) => (
          <Text key={index} style={styles.paragraph}>
            - {item.total} {item.currency} {InvoiceTokens.rewardSummary.itemsReceived}
          </Text>
        ))}
      </View>
    </View>
  );
}
