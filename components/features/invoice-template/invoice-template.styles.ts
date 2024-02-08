import { CSSProperties } from "react";

export const styles: { [key: string]: CSSProperties } = {
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
  width50p: {
    width: "50%",
    maxWidth: "50%",
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
  invoiceBottom: {
    padding: "50px",
    background: "#ffffff",
    display: "flex",
    flexDirection: "row",
  },
};
