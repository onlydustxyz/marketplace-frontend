import { Document, Font, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

import { TInvoiceTemplate } from "components/features/invoice-template/invoice-template.types";

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

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    fontFamily: "GT Walsheim",
  },
  header: {
    padding: "30 50",
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
    fontSize: 14,
    fontWeight: "normal",
    lineHeight: "1",
    color: "#535353",
  },
  h3: {
    fontSize: "18px",
    fontWeight: "medium",
  },
  h4: {
    fontWeight: "medium",
    fontSize: "16px",
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
    padding: "10px 20px",
    fontSize: "14px",
    color: "#262525",
    fontWeight: "medium",
    flex: "1",
    flexGrow: 1,
  },
  td: {
    position: "relative",
    padding: "10px 20px",
    fontSize: "14px",
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

export function PdfTemplate({ header, invoiceTo, billTo, invoiceInfo, rewards, total }: TInvoiceTemplate.InvoiceProps) {
  const [invoiceToStreetAddress, ...invoiceToRestAdress] = invoiceTo.address.split(/,(.+)/);
  const [billToStreetAddress, ...billToRestAdress] = billTo.address.split(/,(.+)/);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>Invoice NO: # {header.invoiceNumber}</Text>
        </View>
        <View style={{ ...styles.section, ...styles.flexRow }}>
          <View style={{ ...styles.flexCol }}>
            <View style={styles.paddingRightSmall}>
              <Text style={styles.h4}>Invoice to</Text>
              <Text style={styles.paragraph}>{invoiceTo.name}</Text>
              <Text style={styles.paragraph}>{invoiceToStreetAddress}</Text>
              <Text style={styles.paragraph}>{invoiceToRestAdress.join("").trim()}</Text>
            </View>
            <View style={{ ...styles.paddingLeftSmall, ...styles.justifyContentEnd, ...styles.textRight }}>
              <Text style={styles.h4}>Bill to</Text>
              <Text style={styles.paragraph}>{billTo.name}</Text>
              <Text style={styles.paragraph}>{billToStreetAddress}</Text>
              <Text style={styles.paragraph}>{billToRestAdress.join("").trim()}</Text>
            </View>
          </View>
          <View style={{ ...styles.flexCol }}>
            <View style={styles.paddingRightSmall}>
              <Text style={styles.h4}>Date</Text>
              <Text style={styles.paragraph}>{invoiceInfo.date}</Text>
            </View>
            <View
              style={{
                ...styles.paddingLeftSmall,
                ...styles.justifyContentEnd,
                ...styles.textRight,
                ...styles.width100p,
              }}
            >
              <Text style={styles.h4}>Payment method</Text>
              <Text style={styles.paragraph}>bank transfer</Text>
            </View>
          </View>
        </View>
        <View style={{ ...styles.section, ...styles.flexRow, ...styles.invoiceCenter }}>
          <Text style={styles.h3}>Rewards summary</Text>
          <View style={{ ...styles.flexCol }}>
            <View style={styles.table}>
              <View style={styles.tr}>
                <Text style={styles.th}>Project Name</Text>
                <Text style={styles.th}>Amount (currency)</Text>
                <Text style={styles.th}>Dollars equivalent</Text>
              </View>
              {rewards.map((item, index) => (
                <View key={index} style={styles.tr}>
                  <Text style={styles.td}>{item.rewardedOnProjectName}</Text>
                  <Text style={styles.td}>
                    {item.amount.total} {item.amount.currency}
                  </Text>
                  <Text style={styles.td}>{item.amount.dollarsEquivalent?.toFixed(3)} USC</Text>
                </View>
              ))}
              <View style={styles.tr}>
                <Text style={styles.th}>Total Due</Text>
                <Text style={styles.th}></Text>
                <Text style={styles.th}>{total} USD</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ ...styles.section, ...styles.flexCol, ...styles.alignItemsStart }}>
          <View style={{ ...styles.width100p, ...styles.paddingRightSmall }}>
            <Text style={styles.h4}>Important Note</Text>
            <Text style={styles.paragraph}>- Once order done, money can&apos;t refund</Text>
            <Text style={styles.paragraph}>- Delivery might delay due to some external dependency</Text>
            <Text style={styles.paragraph}>
              - This is computer generated invoice and physical signature does not require
            </Text>
          </View>
          <View style={{ ...styles.paddingLeftSmall, ...styles.justifyContentEnd, ...styles.textRight }}>
            <Text style={styles.h4}>Payment Info</Text>
            <Text style={styles.paragraph}>This payment made by XXX BANK</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
