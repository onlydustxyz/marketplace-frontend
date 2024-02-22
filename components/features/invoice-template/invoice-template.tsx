import { Document, Page } from "@react-pdf/renderer";
import React from "react";

import { TInvoice } from "components/features/invoice-template/invoice-template.types";
import { InvoiceFooter } from "components/features/invoice-template/sections/invoice-footer";
import { InvoiceHeader } from "components/features/invoice-template/sections/invoice-header";
import { InvoiceInfo } from "components/features/invoice-template/sections/invoice-infos";
import { InvoiceSummary } from "components/features/invoice-template/sections/invoice-summary";

// Font.register({
//   family: "GT Walsheim",
//   fonts: [
//     { src: "src/assets/fonts/GTWalsheimPro/GT-Walsheim-Pro-Thin.ttf", fontWeight: 100 },
//     { src: "src/assets/fonts/GTWalsheimPro/GT-Walsheim-Pro-Ultra-Light.ttf", fontWeight: 200 },
//     { src: "src/assets/fonts/GTWalsheimPro/GT-Walsheim-Pro-Light.ttf", fontWeight: 300 },
//     { src: "src/assets/fonts/GTWalsheimPro/GT-Walsheim-Pro-Regular.ttf", fontWeight: 400 },
//     { src: "src/assets/fonts/GTWalsheimPro/GT-Walsheim-Pro-Medium.ttf", fontWeight: 500 },
//     { src: "src/assets/fonts/GTWalsheimPro/GT-Walsheim-Pro-Bold.ttf", fontWeight: 700 },
//     { src: "src/assets/fonts/GTWalsheimPro/GT-Walsheim-Pro-Ultra-Bold.ttf", fontWeight: 800 },
//     { src: "src/assets/fonts/GTWalsheimPro/GT-Walsheim-Pro-Black.ttf", fontWeight: 900 },
//   ],
// });

export function InvoiceTemplate({ header, invoiceInfos, rewardSummary, footer }: TInvoice.InvoiceTemplateProps) {
  console.log("header", { header, invoiceInfos, rewardSummary, footer });
  return (
    <Document>
      <Page size="A4">
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
        />
        <InvoiceFooter invoiceName={footer.invoiceName} />
      </Page>
    </Document>
  );
}
