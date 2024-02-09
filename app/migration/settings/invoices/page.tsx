"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

import { Button } from "components/ds/button/button";
import InvoiceViewer from "components/features/invoice-viewer/invoice-viewer";

export default function InvoicesPage() {
  const { getAccessTokenSilently } = useAuth0();
  const [fileUrl, setFileUrl] = useState<string>("");

  // const { mutate: uploadProjectLogo } = MeApi.mutations.useUploadProfilePicture({
  //   options: {
  //     onSuccess: data => {
  //       console.log(data);
  //     },
  //   },
  // });

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
          setFileUrl(window.URL.createObjectURL(blob));
          // uploadProjectLogo(blob);
        }
      });
  }
  return (
    <div className="flex h-full flex-col gap-2">
      {/*<div className="flex-1">*/}
      {/*  /!*<img alt="placeholder" src={imageUrl} />*!/*/}
      {/*  <a href={imageUrl} download>*/}
      {/*    Click to download*/}
      {/*  </a>*/}
      {/*</div>*/}
      <InvoiceViewer fileUrl={fileUrl} />

      <Button onClick={handleFetchInvoice}>Generate Invoice</Button>
    </div>
  );
}
