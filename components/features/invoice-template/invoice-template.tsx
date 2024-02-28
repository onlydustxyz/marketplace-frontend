import { Document, Font, Page, Text } from "@react-pdf/renderer";

import { styles } from "components/features/invoice-template/invoice-template.styles";
import { TInvoice } from "components/features/invoice-template/invoice-template.types";
import { InvoiceFooter } from "components/features/invoice-template/sections/invoice-footer";
import { InvoiceHeader } from "components/features/invoice-template/sections/invoice-header";
import { InvoiceInfo } from "components/features/invoice-template/sections/invoice-infos";
import { InvoiceSummary } from "components/features/invoice-template/sections/invoice-summary";

Font.register({
  family: "GT Walsheim",
  fonts: [
    { src: `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/GT-Walsheim-Pro-Thin.ttf`, fontWeight: 100 },
    { src: `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/GT-Walsheim-Pro-Ultra-Light.ttf`, fontWeight: 200 },
    { src: `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/GT-Walsheim-Pro-Light.ttf`, fontWeight: 300 },
    { src: `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/GT-Walsheim-Pro-Regular.ttf`, fontWeight: 400 },
    { src: `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/GT-Walsheim-Pro-Medium.ttf`, fontWeight: 500 },
    { src: `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/GT-Walsheim-Pro-Bold.ttf`, fontWeight: 700 },
    { src: `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/GT-Walsheim-Pro-Ultra-Bold.ttf`, fontWeight: 800 },
    { src: `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/GT-Walsheim-Pro-Black.ttf`, fontWeight: 900 },
  ],
});

export function InvoiceTemplate({ header, invoiceInfos, rewardSummary, footer }: TInvoice.InvoiceTemplateProps) {
  return (
    <Document pageLayout="oneColumn">
      <Page size="A4" style={styles.page}>
        <InvoiceHeader title={header.title} />
        <InvoiceInfo
          senderInfos={invoiceInfos.senderInfos}
          recipientInfos={invoiceInfos.recipientInfos}
          legalInfos={invoiceInfos.legalInfos}
          isUserIndividual={invoiceInfos.isUserIndividual}
        />
        <InvoiceSummary
          rewards={rewardSummary.rewards}
          vat={rewardSummary.vat}
          totalBeforeTax={rewardSummary.totalBeforeTax}
          totalTax={rewardSummary.totalTax}
          totalAfterTax={rewardSummary.totalAfterTax}
          usdToEurConversionRate={rewardSummary.usdToEurConversionRate}
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
