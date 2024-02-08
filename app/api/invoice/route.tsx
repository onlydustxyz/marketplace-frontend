import { headers } from "next/headers";
import { ImageResponse } from "next/og";

import { getFormattedDateToLocaleDateString } from "src/utils/date";

import { InvoiceTemplate } from "components/features/invoice-template/invoice-template";

export async function GET() {
  // async function generatePage(content: ReactElement) {
  //   const image = new ImageResponse(content, {
  //     width: 794,
  //     height: 1123,
  //   });
  //   return image.blob();
  // }

  const headersList = headers();

  // const token = headersList.get("authorization");
  //
  // const { rewards } = await MeActions.queries.retrieveRewardsPendingInvoices({ accessToken: token ?? "" });

  const header = {
    logoUrl: `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/logo.png`,
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
      rewardedOnProjectName: "Deluge",
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
    {
      requestedAt: "2023-12-28T10:58:15.632901Z",
      processedAt: null,
      projectId: "7d04163c-4187-4313-8066-61504d34fc56",
      status: "PENDING_INVOICE",
      unlockDate: null,
      amount: {
        total: 20,
        currency: "USDC",
        dollarsEquivalent: 20.00079477650715,
      },
      numberOfRewardedContributions: 1,
      rewardedOnProjectName: "Onlydust",
      rewardedOnProjectLogoUrl:
        "https://staging-onlydust-app-images.s3.eu-west-1.amazonaws.com/4e53ae9457d9d0ae336ee7cbc183f8a3.png",
      id: "5a761880-6175-4fc4-a10d-60a73eba5678",
    },
  ];

  const total = 85.622;

  // const pages: any[][] = [rewards, rewards];
  //
  // return new Response(
  //   {
  //     pages: await Promise.all(
  //       pages.map(page =>
  //         generatePage(
  //           <InvoiceTemplate
  //             header={header}
  //             invoiceTo={invoiceTo}
  //             billTo={billTo}
  //             invoiceInfo={invoiceInfo}
  //             rewards={page}
  //             total={total}
  //           />
  //         )
  //       )
  //     ),
  //   },
  //   { status: 200 }
  // );

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
