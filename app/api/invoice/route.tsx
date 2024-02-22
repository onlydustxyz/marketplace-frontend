import { renderToFile } from "@react-pdf/renderer";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { getHeaderProps, getInvoiceInfoProps, getRewardsSummaryProps } from "app/api/invoice/builders/builders";
import { fetchInvoicePreviewData } from "app/api/invoice/handlers/fetch-invoice-preview-data";

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
  const searchParams = request.nextUrl.searchParams;
  const isSample = searchParams.get("isSample") ?? "false";
  const billingProfileId = searchParams.get("billingProfileId") ?? "";
  const rewardIds = searchParams.get("rewardIds") ?? "";
  let invoicePreviewData;
  try {
    invoicePreviewData = await fetchInvoicePreviewData({ token, rewardIds, billingProfileId });
  } catch (e) {
    return new NextResponse("Failed Dependency : Invoice Preview ", { status: 424 });
  }

  /* ------
  Determine the billing profile type
  ------ */
  const isUserIndividual = invoicePreviewData?.billingProfileType === MeTypes.billingProfileType.Individual;

  /* ------
  Build the invoice content
  ------ */
  const header: TInvoice.HeaderProps = getHeaderProps({
    isUserIndividual,
    isSample,
    invoiceNumber: invoicePreviewData.number,
  });
  const invoiceInfo: TInvoice.InvoiceInfoProps = getInvoiceInfoProps({
    isUserIndividual,
    invoiceDetails: invoicePreviewData,
  });
  const rewardSummary: TInvoice.RewardsSummaryProps = getRewardsSummaryProps({
    invoiceDetails: invoicePreviewData,
  });
  const footer = {
    invoiceName: isUserIndividual
      ? `${invoicePreviewData.individualBillingProfile?.firstName} ${invoicePreviewData.individualBillingProfile?.lastName}`
      : `${invoicePreviewData.companyBillingProfile?.name}`,
  };

  /* ------
  Create a stream containing the pdf blob
  ------ */
  let stream;

  try {
    // stream = await renderToStream(
    //   <InvoiceTemplate header={header} invoiceInfos={invoiceInfo} rewardSummary={rewardSummary} footer={footer} />
    // );
    stream = await renderToFile(
      <InvoiceTemplate header={header} invoiceInfos={invoiceInfo} rewardSummary={rewardSummary} footer={footer} />,
      "/tmp/my-doc.pdf"
    );
    if (!stream) {
      return new NextResponse("Internal Server Error (!stream)", { status: 500 });
    }
  } catch (e) {
    return new NextResponse("Internal Server Error (catch)", { status: 500 });
  }

  /* ------
  Return the blob as a response
  ------ */
  return new NextResponse(stream as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "x-invoice-id": invoicePreviewData.id,
    },
    status: 201,
  });
}
