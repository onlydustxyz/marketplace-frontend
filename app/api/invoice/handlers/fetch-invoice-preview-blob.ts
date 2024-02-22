export async function fetchInvoicePreviewBlob({
  token,
  rewardIds,
  billingProfileId,
  isSample = false,
}: {
  token: string;
  rewardIds: string[];
  billingProfileId: string;
  isSample: boolean;
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
    },
  })
    .then(async res => {
      const blob = await res.blob();
      if (blob) {
        return {
          blob,
          invoiceId: res.headers.get("x-invoice-id"),
        };
      } else {
        throw new Error("Failed to create the blob.");
      }
    })
    .catch(() => {
      throw new Error("Failed to create the blob.");
    });
}
