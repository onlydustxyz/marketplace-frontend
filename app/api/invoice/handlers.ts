export async function fetchInvoice({ token, rewardIds }: { token: string; rewardIds: string[] }) {
  const params = new URLSearchParams();
  params.append("rewardIds", rewardIds.join(","));
  const url = `/api/invoice?${params.toString()}`;

  return await fetch(url, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then(res => res)
    .then(async res => {
      const blob = await res.blob();
      if (blob) {
        return window.URL.createObjectURL(blob);
      }
    })
    .catch(() => {
      throw new Error("Failed to create download the blob.");
    });
}
