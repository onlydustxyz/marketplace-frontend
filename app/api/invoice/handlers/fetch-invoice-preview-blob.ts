export async function fetchInvoicePreviewBlob({
  token,
  rewardIds,
  billingProfileId,
  isSample = false,
  impersonationHeaders,
}: {
  token: string;
  rewardIds: string[];
  billingProfileId: string;
  isSample: boolean;
  impersonationHeaders?: Record<string, string>;
}) {
  const params = new URLSearchParams();
  params.append("rewardIds", rewardIds.join(","));
  params.append("billingProfileId", billingProfileId);
  params.append("isSample", `${isSample}`);
  const url = `/api/invoice?${params.toString()}`;

  return await fetch(url, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
      ...impersonationHeaders,
    },
  })
    .then(async res => {
      if (res.ok) {
        const blob = await res.blob();
        if (blob) {
          return {
            blob,
            invoiceId: res.headers.get("x-invoice-id"),
          };
        }
      } else {
        throw new Error("Failed to create the blob.");
      }
    })
    .catch(e => {
      console.error("Failed to create the blob:", e);
      throw new Error("Failed to create the blob.");
    });
}
