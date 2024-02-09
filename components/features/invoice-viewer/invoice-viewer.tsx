import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import { Button } from "components/ds/button/button";

import "./external-styles/annotation-layer.css";
import "./external-styles/text-layer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();

export default function InvoiceViewer({ fileUrl }: { fileUrl: string }) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset: number) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }
  return (
    <>
      <Document className="w-fit" file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <div className="flex flex-row gap-4">
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <Button disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </Button>
        <Button disabled={pageNumber >= numPages} onClick={nextPage}>
          Next
        </Button>
      </div>
    </>
  );
}
