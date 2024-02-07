import { PendingInvoiceResponse } from "actions/me/me-queries.actions";
import React, { CSSProperties } from "react";

interface Header {
  logoUrl: string;
  invoiceNumber: string;
}
interface InvoiceTo {
  name: string;
  address: string;
}

interface BillTo {
  name: string;
  address: string;
}

interface InvoiceInfo {
  date: string;
}

interface InvoiceProps {
  header: Header;
  invoiceTo: InvoiceTo;
  billTo: BillTo;
  invoiceInfo: InvoiceInfo;
  rewards: PendingInvoiceResponse;
  total: number;
}

const styles: { [key: string]: CSSProperties } = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    background: "white",
    color: "#000000",
    fontSize: "14px",
    height: "1123px",
    width: "794px",
  },
  textUppercase: {
    textTransform: "uppercase",
  },
  marginBottomSmall: {
    marginBottom: "10px",
  },
  marginBottomMedium: {
    marginBottom: "20px",
  },
  marginBottomLarge: {
    marginBottom: "30px",
  },
  marginTopSmall: {
    marginTop: "10px",
  },
  marginTopMedium: {
    marginTop: "20px",
  },
  marginTopLarge: {
    marginTop: "30px",
  },
  h3: {
    margin: "0px",
    fontWeight: "900",
    fontSize: "20px",
  },
  h4: {
    margin: "0px",
    fontWeight: "900",
    fontSize: "16px",
  },
  paragraph: {
    fontSize: "14px",
    lineHeight: "1.5",
    margin: "0px",
    color: "#535353",
  },
  justifyContentStart: {
    justifyContent: "flex-start",
  },
  justifyContentEnd: {
    justifyContent: "flex-end",
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
  invoiceCenter: {
    padding: "50px",
    background: "#f7f7f7",
  },
  defaultTable: {
    background: "#fff",
    border: "0",
    width: "100%",
    height: "100%",
    flexDirection: "column",
  },
  th: {
    position: "relative",
    padding: "21px 30px",
    fontSize: "14px",
    color: "#262525",
    fontWeight: "400",
    flex: "1",
  },
  td: {
    position: "relative",
    padding: "21px 30px",
    fontSize: "14px",
    color: "#535353",
    fontWeight: "400",
    flex: "1",
  },
  tr: {
    border: "solid 1px #f3f2f2",
    width: "100%",
    display: "flex",
  },
};

export function InvoiceTemplate({ header, invoiceTo, billTo, invoiceInfo, rewards, total }: InvoiceProps) {
  const [invoiceToStreetAddress, ...invoiceToRestAdress] = invoiceTo.address.split(/,(.+)/);
  const [billToStreetAddress, ...billToRestAdress] = billTo.address.split(/,(.+)/);

  return (
    <div style={styles["wrapper"]}>
      <div style={styles["header"]}>
        <div style={styles["logo"]}>
          <img src={header.logoUrl} width="203.75" height="50" alt="logo" />
        </div>
        <div style={styles["invoiceNumber"]}>
          <h3 style={{ ...styles["h3"], ...styles["textUppercase"] }}>
            <strong>Invoice NO: # {header.invoiceNumber}</strong>
          </h3>
        </div>
      </div>
      <div style={styles["invoiceInfo"]}>
        <div style={styles["flexCol"]}>
          <div style={styles["invoiceTo"]}>
            <h4 style={styles["h4"]}>Invoice to</h4>
            <p style={styles["paragraph"]}>{invoiceTo.name}</p>
            <p style={styles["paragraph"]}>{invoiceToStreetAddress}</p>
            <p style={styles["paragraph"]}>{invoiceToRestAdress.join("").trim()}</p>
          </div>
          <div style={styles["billTo"]}>
            <h4 style={{ ...styles["h4"], ...styles["justifyContentEnd"] }}>Bill to</h4>
            <p style={{ ...styles["paragraph"], ...styles["justifyContentEnd"] }}>{billTo.name}</p>
            <p style={{ ...styles["paragraph"], ...styles["justifyContentEnd"] }}>{billToStreetAddress}</p>
            <p style={{ ...styles["paragraph"], ...styles["justifyContentEnd"] }}>{billToRestAdress.join("").trim()}</p>
          </div>
        </div>
        <div style={{ ...styles["flexCol"], ...styles["marginTopMedium"] }}>
          <div style={styles["invoiceDate"]}>
            <h4 style={styles["h4"]}>Date</h4>
            <p style={styles["paragraph"]}>{invoiceInfo.date}</p>
          </div>
          <div style={styles["paymentMethod"]}>
            <h4 style={{ ...styles["h4"], ...styles["justifyContentEnd"] }}>Payment method</h4>
            <p style={{ ...styles["paragraph"], ...styles["justifyContentEnd"] }}>bank transfer</p>
          </div>
        </div>
      </div>

      <article style={styles["invoiceCenter"]}>
        <div style={styles["flexRow"]}>
          <h3 style={{ ...styles["h3"], ...styles["marginBottomMedium"] }}>Rewards summary</h3>
          <div style={{ ...styles["flexCol"], ...styles["marginTopMedium"] }}>
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
      </article>
    </div>
  );
}
