"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

import { Button } from "components/ds/button/button";

import "./styles/AnnotationLayer.css";
import "./styles/TextLayer.css";
import "./styles/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();

export default function InvoicePage() {
  const { getAccessTokenSilently } = useAuth0();
  const [imageUrl, setImageUrl] = useState<string>("");

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  function onItemClick({ pageNumber: itemPageNumber }: { pageNumber: number }): void {
    setPageNumber(itemPageNumber);
  }

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
          console.log("blob", blob);
          setImageUrl(window.URL.createObjectURL(blob));
          // uploadProjectLogo(blob);
        }
      });
  }
  return (
    <div className="flex h-full flex-col gap-2">
      {/*<div className="flex-1">*/}
      {/*  <img alt="placeholder" src={imageUrl} />*/}
      {/*  <a href={imageUrl} download>*/}
      {/*    Click to download*/}
      {/*  </a>*/}
      {/*</div>*/}

      <Button onClick={handleFetchInvoice}>Generate Invoice</Button>
      <Document className="w-fit" file={imageUrl} onLoadSuccess={onDocumentLoadSuccess} onItemClick={onItemClick}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <Button onClick={() => setPageNumber(pageNumber + 1)}>Nextpage</Button>
    </div>
  );
}
