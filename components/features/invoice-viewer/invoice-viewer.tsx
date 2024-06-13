"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import { cn } from "src/utils/cn";

import "./external-styles/annotation-layer.css";
import "./external-styles/text-layer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();

export default function InvoiceViewer({ fileUrl, className }: { fileUrl: string; className?: string }) {
  const [numPages, setNumPages] = useState(0);
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <Document className={cn("w-fit", className)} file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
      {Array.from(new Array(numPages), (_el, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} className="mb-2" />
      ))}
    </Document>
  );
}
