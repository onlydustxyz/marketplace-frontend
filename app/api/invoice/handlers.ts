export async function fetchInvoice({ token, rewardIds }: { token: string; rewardIds: string[] }) {
  return await fetch("/api/invoice", {
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
