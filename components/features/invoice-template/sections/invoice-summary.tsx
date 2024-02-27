import { Text, View } from "@react-pdf/renderer";
import { InvoicePreviewResponse } from "actions/billing-profiles/billing-profiles-queries.actions";

import { Currency } from "src/types";
import { getFormattedDateGB } from "src/utils/date";
import { BudgetCurrencyType, formatAmount } from "src/utils/money";

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
  }, {} as Record<BudgetCurrencyType, number>);

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
  usdToEurConversionRate,
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
              <View key={index} style={styles.tr} wrap={false}>
                {/*  ID  */}
                <Text style={styles.tdSmall}>#{item.id.slice(0, 4)}</Text>
                {/*  project name  */}
                <Text style={styles.td}>
                  {item.projectName.length > 12 ? `${item.projectName.slice(0, 12)}...` : item.projectName}
                </Text>
                {/*  reward date  */}
                <Text style={styles.td}>{getFormattedDateGB(new Date(item.date))}</Text>
                {/*  amount  */}
                <Text style={styles.td}>
                  {formatAmount({ amount: item.amount.amount, currency: item.amount.currency, fixedDecimals: 5 })}
                </Text>
                {/*  rate  */}
                <View style={{ ...styles.td, ...styles.flexRow }}>
                  {/*the result should look like this*/}
                  {/*1 ETH ~ 3,000 USD*/}
                  <Text>{`1 ${item.amount.currency}`}</Text>
                  <Text>{`=${formatAmount({
                    amount: item.amount.target.conversionRate,
                    currency: item.amount.target.currency,
                  })}`}</Text>
                </View>
                {/*  USD equivalent  */}
                <Text style={styles.td}>
                  {formatAmount({ amount: item.amount.target.amount, currency: item.amount.target.currency })}
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
                <Text style={styles.th}>{formatAmount({ amount: totalBeforeTax, currency: Currency.USD })}</Text>
              </View>

              <InvoiceVat vat={vat} totalTax={totalTax} />
              <View style={styles.tr}>
                <Text style={styles.tdSmall}></Text>
                <Text style={styles.th}></Text>
                <Text style={styles.th}></Text>
                <Text style={styles.th}></Text>
                <Text style={styles.th}>{InvoiceTokens.rewardSummary.table.totalAfterTax}</Text>
                <Text style={styles.th}>{formatAmount({ amount: totalAfterTax, currency: Currency.USD })}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ ...styles.flexRow, ...styles.marginTop25P, ...styles.paddingHoriz30P }} wrap={false}>
        <Text style={styles.h4}>{InvoiceTokens.rewardSummary.specialMentions}</Text>
        {totalAmounts?.map((item, index) => (
          <Text key={index} style={styles.paragraph}>
            - {formatAmount({ amount: item.total, currency: item.currency as BudgetCurrencyType, fixedDecimals: 5 })}{" "}
            {InvoiceTokens.rewardSummary.itemsReceived}
          </Text>
        ))}
        <Text style={styles.paragraph}>
          - {InvoiceTokens.rewardSummary.usdToEurConversionRate(usdToEurConversionRate?.toFixed(2))}
        </Text>
      </View>
    </View>
  );
}
