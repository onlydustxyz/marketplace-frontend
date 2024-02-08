import { InvoiceAddressDisplay } from "components/features/invoice-template/invoice-adress-display/invoice-adress-display";
import { InvoiceFooter } from "components/features/invoice-template/invoice-footer/invoice-footer";
import { InvoiceHeader } from "components/features/invoice-template/invoice-header/invoice-header";
import { InvoiceInfo } from "components/features/invoice-template/invoice-info/invoice-info";
import { InvoiceSummary } from "components/features/invoice-template/invoice-summary/invoice-summary";
import { styles } from "components/features/invoice-template/invoice-template.styles";
import { TInvoiceTemplate } from "components/features/invoice-template/invoice-template.types";

export function InvoiceTemplate({
  header,
  invoiceTo,
  billTo,
  invoiceInfo,
  rewards,
  total,
}: TInvoiceTemplate.InvoiceProps) {
  return (
    <div style={styles["wrapper"]}>
      <InvoiceHeader logoUrl={header.logoUrl} invoiceNumber={header.invoiceNumber} />
      <div style={styles["invoiceInfo"]}>
        <div style={styles["flexCol"]}>
          <div style={styles["invoiceTo"]}>
            <h4 style={styles["h4"]}>Invoice to</h4>
            <InvoiceAddressDisplay name={invoiceTo.name} address={invoiceTo.address} />
          </div>
          <div style={styles["billTo"]}>
            <h4 style={{ ...styles["h4"], ...styles["justifyContentEnd"] }}>Bill to</h4>
            <InvoiceAddressDisplay name={billTo.name} address={billTo.address} justifyEnd />
          </div>
        </div>
        <InvoiceInfo date={invoiceInfo.date} />
      </div>
      <InvoiceSummary rewards={rewards} total={total} />
      <InvoiceFooter />
    </div>
  );
}
