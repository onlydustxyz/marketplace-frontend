import { renderToStream } from "@react-pdf/renderer";
import { MeActions } from "actions/me/me.actions";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { MeTypes } from "src/api/me/types";
import { getFormattedDateToLocaleDateString } from "src/utils/date";

import { InvoiceTemplate } from "components/features/invoice-template/invoice-template";
import { TInvoice } from "components/features/invoice-template/invoice-template.types";

export async function GET() {
  const headersList = headers();
  const token = headersList.get("authorization");
  const userInfo = await MeActions.queries.retrieveMeInformations({ accessToken: token ?? "" });

  const isUserIndividual = userInfo?.billingProfileType === MeTypes.billingProfileType.Individual;
  console.log("userInfo ===>", userInfo);
  // const { rewards } = await MeActions.queries.retrieveRewardsPendingInvoices({ accessToken: token ?? "" });

  const header: TInvoice.HeaderProps = {
    type: isUserIndividual ? "receipt" : "invoice",
    invoiceNumber: "20240208-0052",
  };

  const invoiceInfo = {
    senderInfos: {
      name: "My invoices to company",
      address: "1 rue de la combatte, Grandvillars, France, 90600",
    },
    recipientInfos: {
      name: "Wagmi",
      address: "54 Rue Du faubourg montmartre, Paris, France, 75009",
    },
    legalInfos: {
      date: getFormattedDateToLocaleDateString(new Date()),
      paymentMethod: "bank transfer",
    },
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
      rewardedOnProjectName: "Onlydustiii",
      rewardedOnProjectLogoUrl:
        "https://staging-onlydust-app-images.s3.eu-west-1.amazonaws.com/4e53ae9457d9d0ae336ee7cbc183f8a3.png",
      id: "5a761880-6175-4fc4-a10d-60a73eba5678",
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
      rewardedOnProjectName: "Onlydustiiii",
      rewardedOnProjectLogoUrl:
        "https://staging-onlydust-app-images.s3.eu-west-1.amazonaws.com/4e53ae9457d9d0ae336ee7cbc183f8a3.png",
      id: "5a761880-6175-4fc4-a10d-60a73eba5678",
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

  const rewardSummary: TInvoice.RewardsSummaryProps = {
    rewards,
    total: 85.622,
  };

  const footer = {
    importantNote: "",
    paymentInfo: "",
  };

  const stream = await renderToStream(
    <InvoiceTemplate header={header} invoiceInfos={invoiceInfo} rewardSummary={rewardSummary} footer={footer} />
  );

  return new NextResponse(stream as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
    },
  });
}
