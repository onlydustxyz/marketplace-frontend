import { renderToStream } from "@react-pdf/renderer";
import { MeActions } from "actions/me/me.actions";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import {
  getHeaderProps,
  getInvoiceInfoProps,
  getRewardsSummaryProps,
  invoiceMock,
} from "app/api/invoice/builders/builders";

import { MeTypes } from "src/api/me/types";

import { InvoiceTemplate } from "components/features/invoice-template/invoice-template";
import { TInvoice } from "components/features/invoice-template/invoice-template.types";

export async function GET(request: NextRequest) {
  const headersList = headers();
  const token = headersList.get("authorization");

  // TODO will be replaced by the following invoice preview endpoint once ready
  // const searchParams = request.nextUrl.searchParams;
  // const billingProfileId = searchParams.get("billingProfileId") ?? "";
  // const rewardIds = searchParams.get("rewardIds") ?? "";
  // const invoicePreviewData = await fetchInvoicePreviewData({ token: token ?? "", rewardIds, billingProfileId });
  const userInfo = await MeActions.queries.retrieveMeInformations({ accessToken: token ?? "" });
  const isUserIndividual = userInfo?.billingProfileType === MeTypes.billingProfileType.Individual;

  const header: TInvoice.HeaderProps = getHeaderProps({
    isUserIndividual,
    invoiceNumber: invoiceMock.id,
  });

  const invoiceInfo: TInvoice.InvoiceInfoProps = getInvoiceInfoProps({
    isUserIndividual,
    invoiceDetails: invoiceMock,
  });

  const rewardSummary: TInvoice.RewardsSummaryProps = getRewardsSummaryProps({
    invoiceDetails: invoiceMock,
  });

  const footer = {
    invoiceName: isUserIndividual
      ? `${invoiceMock.individualBillingProfile?.firstName} ${invoiceMock.individualBillingProfile?.lastName}`
      : `${invoiceMock.companyBillingProfile?.name}`,
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