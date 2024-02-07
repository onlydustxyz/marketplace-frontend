"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

import { Button } from "components/ds/button/button";

export default function InvoicePage() {
  const { getAccessTokenSilently } = useAuth0();
  const [imageUrl, setImageUrl] = useState<string>("");

  async function handleFetchInvoice() {
    const token = await getAccessTokenSilently();
    fetch("/api/invoice", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then(res => res)
      .then(async res => {
        const blob = await res.blob();
        if (blob) {
          setImageUrl(window.URL.createObjectURL(blob));
        }
      });
  }
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex-1">
        <img alt="placeholder" src={imageUrl} />
      </div>
      <Button onClick={handleFetchInvoice}>Generate Invoice</Button>
    </div>
  );
}
