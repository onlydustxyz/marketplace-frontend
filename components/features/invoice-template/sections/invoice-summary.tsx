import { Text, View } from "@react-pdf/renderer";
import { Money } from "utils/Money/Money";

import { getFormattedDateGB } from "src/utils/date";
import { pretty } from "src/utils/id";

import { styles } from "components/features/invoice-template/invoice-template.styles";
import { InvoiceTokens } from "components/features/invoice-template/invoice-template.tokens";
import { TInvoice } from "components/features/invoice-template/invoice-template.types";
import { InvoiceVat } from "components/features/invoice-template/sections/invoice-vat";

export function InvoiceSummary({
  isUserIndividual,
  rewards,
  vat,
  totalBeforeTax,
  totalTax,
  totalAfterTax,
  usdToEurConversionRate,
  totalAfterTaxPerCurrency,
}: TInvoice.RewardsSummaryProps) {
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
                <Text style={styles.tdSmall}>{`#${pretty(item.id)}`}</Text>
                {/*  project name  */}
                <Text style={styles.td}>
                  {item.projectName.length > 12 ? `${item.projectName.slice(0, 12)}...` : item.projectName}
                </Text>
                {/*  reward date  */}
                <Text style={styles.td}>{getFormattedDateGB(new Date(item.date))}</Text>
                {/*  amount  */}
                <Text style={styles.td}>
                  {Money.format({ amount: item.amount.prettyAmount, currency: item.amount.currency }).string}
                </Text>
                {/*  rate  */}
                <View style={{ ...styles.td, ...styles.flexRow }}>
                  {/*the result should look like this*/}
                  {/*1 ETH ~ 3,000 USD*/}
                  <Text>{`1 ${item.amount.currency.code}`}</Text>
                  <Text>{`=${
                    Money.format({
                      amount: item.amount.target.conversionRate,
                      currency: item.amount.target.currency,
                    }).string
                  }*`}</Text>
                </View>
                {/*  USD equivalent  */}
                <Text style={styles.td}>
                  {Money.format({ amount: item.amount.target.amount, currency: item.amount.target.currency }).string}
                </Text>
              </View>
            ))}
            <View wrap={false}>
              {/*  For individuals, hide tax lines */}
              {!isUserIndividual ? (
                <View style={styles.tr}>
                  <Text style={styles.tdSmall}></Text>
                  <Text style={styles.th}></Text>
                  <Text style={styles.th}></Text>
                  <Text style={styles.th}></Text>
                  <Text style={styles.th}>{InvoiceTokens.rewardSummary.table.totalBeforeTax}</Text>
                  <Text style={styles.th}>{Money.format({ amount: totalBeforeTax, currency: Money.USD }).string}</Text>
                </View>
              ) : null}

              {!isUserIndividual ? <InvoiceVat vat={vat} totalTax={totalTax} /> : null}
              <View style={styles.tr}>
                <Text style={styles.tdSmall}></Text>
                <Text style={styles.th}></Text>
                <Text style={styles.th}></Text>
                <Text style={styles.th}></Text>
                <Text style={styles.th}>
                  {!isUserIndividual
                    ? InvoiceTokens.rewardSummary.table.totalAfterTax
                    : InvoiceTokens.rewardSummary.table.totalReceipt}
                </Text>
                <Text style={styles.th}>{Money.format({ amount: totalAfterTax, currency: Money.USD }).string}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ ...styles.flexRow, ...styles.marginTop25P, ...styles.paddingHoriz30P }} wrap={false}>
        <Text style={styles.h4}>{InvoiceTokens.rewardSummary.tokenRate.title}</Text>
        <Text style={styles.paragraph}>{InvoiceTokens.rewardSummary.tokenRate.descriptionIntro}</Text>
        <Text style={styles.paragraph}>{InvoiceTokens.rewardSummary.tokenRate.descriptionOutro}</Text>
      </View>
      <View style={{ ...styles.flexRow, ...styles.paddingHoriz30P }} wrap={false}>
        <Text style={styles.h4}>{InvoiceTokens.rewardSummary.specialMentions}</Text>
        {totalAfterTaxPerCurrency?.map((item, index) => (
          <Text key={index} style={styles.paragraph}>
            - {Money.format({ amount: item.amount, currency: item.currency }).string}
            {vat.vatRegulationState === "VAT_APPLICABLE" ? InvoiceTokens.rewardSummary.includingVat : " "}
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
