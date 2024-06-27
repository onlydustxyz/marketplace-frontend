import { Document, Page, Text } from "@react-pdf/renderer";

import { styles } from "components/features/invoice-template/invoice-template.styles";
import { TInvoice } from "components/features/invoice-template/invoice-template.types";
import { InvoiceFooter } from "components/features/invoice-template/sections/invoice-footer";
import { InvoiceHeader } from "components/features/invoice-template/sections/invoice-header";
import { InvoiceInfo } from "components/features/invoice-template/sections/invoice-infos";
import { InvoiceSummary } from "components/features/invoice-template/sections/invoice-summary";

export function InvoiceTemplate({
  fontFamily,
  header,
  invoiceInfos,
  rewardSummary,
  footer,
}: TInvoice.InvoiceTemplateProps) {
  return (
    <Document pageLayout="oneColumn">
      <Page size="A4" style={{ ...styles.page, fontFamily }}>
        <InvoiceHeader title={header.title} />
        <InvoiceInfo
          senderInfos={invoiceInfos.senderInfos}
          recipientInfos={invoiceInfos.recipientInfos}
          legalInfos={invoiceInfos.legalInfos}
          isUserIndividual={invoiceInfos.isUserIndividual}
        />
        <InvoiceSummary
          isUserIndividual={rewardSummary.isUserIndividual}
          rewards={rewardSummary.rewards}
          vat={rewardSummary.vat}
          totalBeforeTax={rewardSummary.totalBeforeTax}
          totalTax={rewardSummary.totalTax}
          totalAfterTax={rewardSummary.totalAfterTax}
          usdToEurConversionRate={rewardSummary.usdToEurConversionRate}
          totalAfterTaxPerCurrency={rewardSummary.totalAfterTaxPerCurrency}
        />
        <InvoiceFooter invoiceName={footer.invoiceName} />
        <Text
          style={styles.pageNumberFooter}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  );
}
