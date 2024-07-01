// import File from "public/terms-conditions/202405_terms-and-conditions.pdf";
import { useEffect, useState } from "react";
import { pdfjs } from "react-pdf";

import SidePanel from "src/components/SidePanel";

import { Link } from "components/ds/link/link";
import InvoiceViewer from "components/features/invoice-viewer/invoice-viewer";
import { Icon } from "components/layout/icon/icon";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();

interface FullTermsAndConditionsSidePanelProps {
  showFullTermsAndConditions: boolean;
  setShowFullTermsAndConditions: (showFullTermsAndConditions: boolean) => void;
}

export default function FullTermsAndConditionsSidePanel({
  showFullTermsAndConditions,
  setShowFullTermsAndConditions,
}: FullTermsAndConditionsSidePanelProps) {
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    if (showFullTermsAndConditions) {
      setFileUrl(`${window.location.origin}/terms-conditions/202405_terms-and-conditions.pdf`);
    }
  }, [showFullTermsAndConditions]);

  return (
    <SidePanel open={showFullTermsAndConditions} setOpen={setShowFullTermsAndConditions}>
      <div className="flex w-full flex-col items-start justify-center px-4">
        <div className="mb-4 flex w-full flex-col gap-3 pt-9 font-normal text-greyscale-50">
          <div className="font-walsheim ">JUNE 2024</div>
          <div className="item-center flex w-full flex-row justify-between gap-2">
            <div className="font-belwe text-2xl">Terms and conditions</div>
            <Link href={fileUrl} target={"_blank"} className="underline">
              <div className="item-center flex flex-row justify-center gap-2">
                <Icon remixName="ri-download-2-line" size={16} />
                Download
              </div>
            </Link>
          </div>
        </div>
        <InvoiceViewer className="w-full" fileUrl={fileUrl} />
      </div>
    </SidePanel>
  );
}
