import { styles } from "components/features/invoice-template/invoice-template.styles";
import { TInvoiceTemplate } from "components/features/invoice-template/invoice-template.types";

export function InvoiceSummary({ rewards, total }: TInvoiceTemplate.RewardsSummaryProps) {
  return (
    <section style={styles["invoiceCenter"]}>
      <div style={styles["flexRow"]}>
        <h3 style={{ ...styles["h3"], ...styles["marginBottomMedium"] }}>Rewards summary</h3>
        <div style={styles["flexCol"]}>
          <table style={styles["defaultTable"]}>
            <thead style={styles["flexRow"]}>
              <tr style={styles["tr"]}>
                <th style={styles["th"]}>Project Name</th>
                <th style={styles["th"]}>Amount (currency)</th>
                <th style={styles["th"]}>Dollars equivalent</th>
              </tr>
            </thead>
            <tbody style={styles["flexRow"]}>
              {rewards.map((item, index) => (
                <tr style={styles["tr"]} key={index}>
                  <td style={styles["td"]}>{item.rewardedOnProjectName}</td>
                  <td style={styles["td"]}>
                    {item.amount.total} {item.amount.currency}
                  </td>
                  <td style={styles["td"]}>{item.amount.dollarsEquivalent?.toFixed(3)} USC</td>
                </tr>
              ))}
              <tr style={styles["tr"]}>
                <td style={styles["td"]}>
                  <strong>Total Due</strong>
                </td>
                <td style={styles["td"]}></td>
                <td style={styles["td"]}>
                  <strong>{total} USD</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
