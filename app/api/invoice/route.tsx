import { MeActions } from "actions/me/me.actions";
import { headers } from "next/headers";
import { ImageResponse } from "next/og";
import { CSSProperties } from "react";

import { InvoiceTemplate } from "app/api/invoice/invoice-template";

export const runtime = "edge";

export const alt = "Invoice generator";
export const size = {
  width: 2480,
  height: 3508,
};
export const contentType = "image/png";

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    background: "white",
    color: "#000",
  },
};

export async function GET() {
  const headersList = headers();

  const token = headersList.get("authorization");

  const { rewards } = await MeActions.queries.retrieveRewardsPendingInvoices({ accessToken: token ?? "" });

  const header = {
    logoUrl: "https://assets-global.website-files.com/6526608bf8ef4218fa12c988/6526608bf8ef4218fa12ca2c_Left.png",
    invoiceNumber: "20240208-0052",
  };

  const billingProfile = {
    name: "John Doe",
    address: "1234 Main St",
    zipCode: "12345",
    country: "USA",
  };

  const receiver = {
    name: "Jane Doe",
    siret: "123456789",
    address: "1234 Main St",
    zipCode: "12345",
    country: "USA",
  };

  const invoiceInfo = {
    number: "123",
    subject: "Invoice",
    invoiceDate: "2021-01-01",
    dueDate: "2021-02-01",
  };

  const content = [
    {
      date: "2021-01-01",
      project: "Project A",
      amount: 100,
    },
    {
      date: "2021-01-02",
      project: "Project B",
      amount: 200,
    },
  ];

  const total = 300;

  return new ImageResponse(
    (
      <InvoiceTemplate
        header={header}
        headers={{ billingProfile, receiver }}
        invoiceInfo={invoiceInfo}
        content={content}
        total={total}
      />
    )
  );
}

// return new ImageResponse(<div style={styles["container"]}>coucou</div>);
// return Response.json(res);
