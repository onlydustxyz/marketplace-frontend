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
  /* ------
  Forward the authorization header to the next endpoint
  ------ */
  const headersList = headers();
  const token = headersList.get("authorization");
  if (!token) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  /* ------
  Retrieve the invoice preview data
  ------ */
  // TODO will be replaced by the following invoice preview endpoint once ready
  const searchParams = request.nextUrl.searchParams;
  const isSample = searchParams.get("isSample") ?? "false";
  // const billingProfileId = searchParams.get("billingProfileId") ?? "";
  // const rewardIds = searchParams.get("rewardIds") ?? "";
  // const invoicePreviewData = await fetchInvoicePreviewData({ token: token ?? "", rewardIds, billingProfileId });
  let userInfo;
  try {
    userInfo = await MeActions.queries.retrieveMeInformations({ accessToken: token });
  } catch (e) {
    return new NextResponse("Failed Dependency", { status: 424 });
  }

  /* ------
  Determine the billing profile type
  ------ */
  const isUserIndividual = userInfo?.billingProfileType === MeTypes.billingProfileType.Individual;

  /* ------
  Build the invoice content
  ------ */
  const header: TInvoice.HeaderProps = getHeaderProps({
    isUserIndividual,
    isSample,
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

  /* ------
  Create a stream containing the pdf blob
  ------ */
  const stream = await renderToStream(
    <InvoiceTemplate header={header} invoiceInfos={invoiceInfo} rewardSummary={rewardSummary} footer={footer} />
  );
  if (!stream) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }

  /* ------
  Return the blob as a response
  ------ */
  return new NextResponse(stream as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
    },
    status: 201,
  });
}
