import { Document, Font, Page } from "@react-pdf/renderer";
import React from "react";

import { styles } from "components/features/invoice-template/invoice-template.styles";
import { TInvoice } from "components/features/invoice-template/invoice-template.types";
import { InvoiceFooter } from "components/features/invoice-template/views/invoice-footer";
import { InvoiceHeader } from "components/features/invoice-template/views/invoice-header";
import { InvoiceInfo } from "components/features/invoice-template/views/invoice-infos";
import { InvoiceSummary } from "components/features/invoice-template/views/invoice-summary";

Font.register({
  family: "GT Walsheim",
  fonts: [
    { src: "src/assets/fonts/GTWalsheimPro/GT-Walsheim-Pro-Thin.ttf", fontWeight: 100 },
    { src: "src/assets/fonts/GTWalsheimPro/GT-Walsheim-Pro-Ultra-Light.ttf", fontWeight: 200 },
    { src: "src/assets/fonts/GTWalsheimPro/GT-Walsheim-Pro-Light.ttf", fontWeight: 300 },
    { src: "src/assets/fonts/GTWalsheimPro/GT-Walsheim-Pro-Regular.ttf", fontWeight: 400 },
    { src: "src/assets/fonts/GTWalsheimPro/GT-Walsheim-Pro-Medium.ttf", fontWeight: 500 },
    { src: "src/assets/fonts/GTWalsheimPro/GT-Walsheim-Pro-Bold.ttf", fontWeight: 700 },
    { src: "src/assets/fonts/GTWalsheimPro/GT-Walsheim-Pro-Ultra-Bold.ttf", fontWeight: 800 },
    { src: "src/assets/fonts/GTWalsheimPro/GT-Walsheim-Pro-Black.ttf", fontWeight: 900 },
  ],
});

export function InvoiceTemplate({ header, invoiceInfos, rewardSummary, footer }: TInvoice.InvoiceTemplateProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <InvoiceHeader invoiceNumber={header.invoiceNumber} />
        <InvoiceInfo
          senderInfos={invoiceInfos.senderInfos}
          recipientInfos={invoiceInfos.recipientInfos}
          legalInfos={invoiceInfos.legalInfos}
        />
        <InvoiceSummary rewards={rewardSummary.rewards} total={rewardSummary.total} />
        <InvoiceFooter importantNote={footer.importantNote} paymentInfo={footer.paymentInfo} />
      </Page>
    </Document>
  );
}
