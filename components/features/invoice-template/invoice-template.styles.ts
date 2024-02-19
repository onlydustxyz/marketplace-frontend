import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    fontFamily: "GT Walsheim",
    padding: "30 0",
  },
  header: {
    padding: "10 50 30 50",
    borderBottom: "1px solid #d8d8d8",
    fontWeight: "medium",
    textAlign: "center",
    textTransform: "uppercase",
  },
  section: {
    margin: 0,
    padding: "30 50",
  },
  textLeft: {
    textAlign: "left",
  },
  textRight: {
    textAlign: "right",
  },
  textCenter: {
    textAlign: "center",
  },
  textBold: {
    fontWeight: "bold",
  },
  paragraph: {
    fontSize: 12,
    fontWeight: "normal",
    lineHeight: "1.2",
    color: "#535353",
  },
  h3: {
    fontSize: "16px",
    fontWeight: "medium",
  },
  h4: {
    fontWeight: "medium",
    fontSize: "14px",
    marginTop: "15px",
    marginBottom: "5px",
  },
  flexCol: {
    display: "flex",
    flexDirection: "row",
  },
  flexRow: {
    display: "flex",
    flexDirection: "column",
  },
  paddingLeftSmall: {
    paddingLeft: "5px",
  },
  paddingRightSmall: {
    paddingRight: "5px",
  },
  justifyContentEnd: {
    justifyContent: "flex-end",
    width: "100%",
  },
  justifyContentStart: {
    justifyContent: "flex-start",
  },
  padding50P: {
    padding: "50px",
  },
  paddingHoriz50P: {
    padding: "0 50px",
  },
  paddingVert50P: {
    padding: "50px 0",
  },
  paddingVert10P: {
    padding: "10px 0",
  },
  marginVert25P: {
    margin: "25px 0",
  },
  marginTop50P: {
    marginTop: "50px",
  },
  width50p: {
    width: "50%",
  },
  width100p: {
    width: "100%",
  },
  alignItemsStart: {
    alignItems: "flex-start",
  },
  invoiceCenter: {
    backgroundColor: "#f7f7f7",
  },
  table: {
    backgroundColor: "#ffffff",
    border: "0",
    width: "100%",
    flexDirection: "column",
    marginTop: "20px",
  },
  th: {
    position: "relative",
    padding: "10px 10px",
    fontSize: "12px",
    color: "#262525",
    fontWeight: "medium",
    flex: "2",
    flexGrow: 2,
  },
  thSmall: {
    position: "relative",
    padding: "10px 10px",
    fontSize: "12px",
    color: "#262525",
    fontWeight: "medium",
    flex: "1",
    flexGrow: 1,
  },
  td: {
    position: "relative",
    padding: "10px 10px",
    fontSize: "12px",
    color: "#535353",
    fontWeight: "normal",
    flex: "2",
    flexGrow: 2,
  },
  tdSmall: {
    position: "relative",
    padding: "10px 10px",
    fontSize: "12px",
    color: "#535353",
    fontWeight: "normal",
    flex: "1",
    flexGrow: 1,
  },
  tr: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid #f3f2f2",
  },
});
