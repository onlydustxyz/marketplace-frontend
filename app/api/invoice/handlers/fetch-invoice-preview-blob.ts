export async function fetchInvoicePreviewBlob({
  token,
  rewardIds,
  billingProfileId,
}: {
  token: string;
  rewardIds: string[];
  billingProfileId: string;
}) {
  const params = new URLSearchParams();
  params.append("rewardIds", rewardIds.join(","));
  params.append("billingProfileId", billingProfileId);
  const url = `/api/invoice?${params.toString()}`;

  return await fetch(url, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    // TODO check if is needed
    .then(res => res)
    .then(async res => {
      const blob = await res.blob();
      if (blob) {
        return blob;
      }
    })
    .catch(() => {
      throw new Error("Failed to create the blob.");
    });
}