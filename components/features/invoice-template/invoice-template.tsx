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
import { Document, Page, Text } from "@react-pdf/renderer";

export function InvoiceTemplate() {
  return (
    <Document>
      <Page>
        <Text>React-pdf</Text>
      </Page>
    </Document>
  );
}
