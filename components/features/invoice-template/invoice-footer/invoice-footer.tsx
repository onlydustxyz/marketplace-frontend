import { styles } from "components/features/invoice-template/invoice-template.styles";

export function InvoiceFooter() {
  return (
    <section style={styles["invoiceBottom"]}>
      <div style={{ ...styles["flexRow"], ...styles["width50p"] }}>
        <h4 style={styles["h4"]}>Important Note</h4>
        <ul style={styles["flexRow"]}>
          <li style={styles["paragraph"]}>- Once order done, money can&apos;t refund</li>
          <li style={styles["paragraph"]}>- Delivery might delay due to some external dependency</li>
          <li style={styles["paragraph"]}>
            - This is computer generated invoice and physical signature does not require.
          </li>
        </ul>
      </div>
      <div style={{ ...styles["flexRow"], ...styles["width50p"] }}>
        <h4 style={{ ...styles["h4"], ...styles["justifyContentEnd"] }}>Payment Info</h4>
        <p style={{ ...styles["paragraph"], ...styles["justifyContentEnd"] }}>This payment made by XXX BANK</p>
      </div>
    </section>
  );
}
