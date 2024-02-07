import React, { CSSProperties } from "react";

interface BillingProfile {
  name: string;
  address: string;
  zipCode: string;
  country: string;
}

interface Receiver {
  name: string;
  siret: string;
  address: string;
  zipCode: string;
  country: string;
}

interface InvoiceInfo {
  number: string;
  subject: string;
  invoiceDate: string;
  dueDate: string;
}

interface ContentItem {
  date: string;
  project: string;
  amount: number;
}

interface InvoiceProps {
  headers: {
    billingProfile: BillingProfile;
    receiver: Receiver;
  };
  invoiceInfo: InvoiceInfo;
  content: ContentItem[];
  total: number;
}

const styles: { [key: string]: CSSProperties } = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    height: "100%",
    width: "100%",
    background: "white",
    color: "#000000",
    fontSize: "14px",
    maxWidth: "1000px",
  },

  h3: {
    margin: "0px",
    fontWeight: "900",
    fontSize: "20px",
  },
  h4: {
    margin: "0px",
    fontWeight: "900",
    fontSize: "18px",
  },
  paragraph: {
    margin: "0px",
  },
  flexCol: {
    display: "flex",
    flexDirection: "row",
  },
  flexRow: {
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "50px",
    borderBottom: "1px solid #d8d8d8",
  },
  logo: {
    display: "flex",
    flex: "1",
  },
  invoiceNumber: {
    display: "flex",
    flex: "1",
    textAlign: "right",
    fontWeight: "900",
    fontSize: "20px",
    color: "#262525",
    justifyContent: "flex-end",
  },
  invoiceInfo: {
    display: "flex",
    flexDirection: "column",
    padding: "50px",
  },
  invoiceTo: {
    display: "flex",
    flex: "1",
    flexDirection: "column",
  },
  billTo: {
    display: "flex",
    flex: "1",
    flexDirection: "column",
    textAlign: "right",
    justifyContent: "flex-end",
  },
  invoiceDate: {
    display: "flex",
    flex: "1",
    flexDirection: "column",
  },
  paymentMethod: {
    display: "flex",
    flex: "1",
    flexDirection: "column",
  },
};

export function InvoiceTemplate({ headers, invoiceInfo, content, total }: InvoiceProps) {
  return (
    <div style={styles["wrapper"]}>
      <div style={styles["header"]}>
        <div style={styles["logo"]}>
          <img
            src="https://assets-global.website-files.com/6526608bf8ef4218fa12c988/6526608bf8ef4218fa12ca2c_Left.png"
            width="203.75"
            height="50"
            alt="logo"
          />
        </div>
        <div style={styles["invoiceNumber"]}>
          <h3 style={styles["h3"]}>
            <strong>Invoice NO: #{invoiceInfo.number}</strong>
          </h3>
        </div>
      </div>
      <div style={styles["invoiceInfo"]}>
        <div style={styles["flexCol"]}>
          <div style={styles["invoiceTo"]}>
            <h4 style={styles["h4"]}>Invoice to</h4>
            <p style={styles["paragraph"]}>{headers.billingProfile.name}</p>
            <p style={styles["paragraph"]}>{headers.billingProfile.address}</p>
            <p style={styles["paragraph"]}>{headers.billingProfile.zipCode}</p>
            <p style={styles["paragraph"]}>{headers.billingProfile.country}</p>
          </div>
          <div style={styles["billTo"]}>
            <h4 style={styles["h4"]}>Bill to</h4>
            <p style={styles["paragraph"]}>{headers.receiver.name}</p>
            <p style={styles["paragraph"]}>SIRET: {headers.receiver.siret}</p>
            <p style={styles["paragraph"]}>{headers.receiver.address}</p>
            <p style={styles["paragraph"]}>{headers.receiver.zipCode}</p>
            <p style={styles["paragraph"]}>{headers.receiver.country}</p>
          </div>
        </div>
        <div style={styles["flexCol"]}>
          <div style={styles["invoiceDate"]}>
            <h4>Date</h4>
            <p style={styles["paragraph"]}>{invoiceInfo.invoiceDate}</p>
          </div>
          <div style={styles["paymentMethod"]}>
            <h4>Payment method</h4>
            <p style={styles["paragraph"]}>bank transfer</p>
          </div>
        </div>
      </div>

      <table style={{ width: "100%", marginBottom: "20px", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Project</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {content.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.project}</td>
              <td>${item.amount}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>Total</td>
            <td>${total}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
