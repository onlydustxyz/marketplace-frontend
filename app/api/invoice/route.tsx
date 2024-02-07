import { headers } from "next/headers";
import { ImageResponse } from "next/og";
import { CSSProperties } from "react";

import { InvoiceTemplate } from "app/api/invoice/invoice-template";

import { getFormattedDateToLocaleDateString } from "src/utils/date";

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

  // const token = headersList.get("authorization");
  //
  // const { rewards } = await MeActions.queries.retrieveRewardsPendingInvoices({ accessToken: token ?? "" });

  const header = {
    logoUrl: "https://assets-global.website-files.com/6526608bf8ef4218fa12c988/6526608bf8ef4218fa12ca2c_Left.png",
    invoiceNumber: "20240208-0052",
  };

  const invoiceTo = {
    name: "My invoice to company",
    address: "1 rue de la combatte, Grandvillars, France, 90600",
  };

  const billTo = {
    name: "Wagmi",
    address: "54 Rue Du faubourg montmartre, Paris, France, 75009",
  };

  const invoiceInfo = {
    date: getFormattedDateToLocaleDateString(new Date()),
  };

  const rewards = [
    {
      requestedAt: "2023-12-18T15:36:49.04901Z",
      processedAt: null,
      projectId: "7d04163c-4187-4313-8066-61504d34fc56",
      status: "PENDING_INVOICE",
      unlockDate: null,
      amount: {
        total: 100,
        currency: "LORDS",
        dollarsEquivalent: 55.6196555954649,
      },
      numberOfRewardedContributions: 1,
      rewardedOnProjectName: "Bretzel",
      rewardedOnProjectLogoUrl:
        "https://staging-onlydust-app-images.s3.eu-west-1.amazonaws.com/4e53ae9457d9d0ae336ee7cbc183f8a3.png",
      id: "49ee3934-29f5-43c7-a9e7-6c34947a6e87",
    },
    {
      requestedAt: "2023-12-28T10:58:15.632901Z",
      processedAt: null,
      projectId: "7d04163c-4187-4313-8066-61504d34fc56",
      status: "PENDING_INVOICE",
      unlockDate: null,
      amount: {
        total: 10,
        currency: "USDC",
        dollarsEquivalent: 10.00079477650715,
      },
      numberOfRewardedContributions: 1,
      rewardedOnProjectName: "Bretzel",
      rewardedOnProjectLogoUrl:
        "https://staging-onlydust-app-images.s3.eu-west-1.amazonaws.com/4e53ae9457d9d0ae336ee7cbc183f8a3.png",
      id: "5a761880-6175-4fc4-a10d-60a73eba5675",
    },
  ];

  const total = 65.621;

  return new ImageResponse(
    (
      <InvoiceTemplate
        header={header}
        invoiceTo={invoiceTo}
        billTo={billTo}
        invoiceInfo={invoiceInfo}
        rewards={rewards}
        total={total}
      />
    ),
    {
      width: 794,
      height: 1123,
    }
  );
}
