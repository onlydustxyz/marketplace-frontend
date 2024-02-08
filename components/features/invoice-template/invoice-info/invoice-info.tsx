import { styles } from "components/features/invoice-template/invoice-template.styles";
import { TInvoiceTemplate } from "components/features/invoice-template/invoice-template.types";

export function InvoiceInfo({ date }: TInvoiceTemplate.InvoiceInfoProps) {
  return (
    <div style={{ ...styles["flexCol"], ...styles["marginTopMedium"] }}>
      <div style={styles["invoiceDate"]}>
        <h4 style={styles["h4"]}>Date</h4>
        <p style={styles["paragraph"]}>{date}</p>
      </div>
      <div style={styles["paymentMethod"]}>
        <h4 style={{ ...styles["h4"], ...styles["justifyContentEnd"] }}>Payment method</h4>
        <p style={{ ...styles["paragraph"], ...styles["justifyContentEnd"] }}>bank transfer</p>
      </div>
    </div>
  );
}
