import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

import { fetchInvoicePreviewBlob } from "app/api/invoice/handlers/fetch-invoice-preview-blob";

import { TUseInvoicePreview } from "components/features/stacks/payments-flow/request-payments-stacks/hooks/use-invoice-preview/use-invoice-preview.types";

export function useInvoicePreview({ rewardIds, billingProfileId, isSample = false }: TUseInvoicePreview.Props) {
  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [fileBlob, setFileBlob] = useState<Blob>();
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    handleInvoiceCreation();
  }, []);

  async function handleInvoiceCreation() {
    setIsLoading(true);
    try {
      const token = await getAccessTokenSilently();
      const blob = await fetchInvoicePreviewBlob({ token, rewardIds, billingProfileId, isSample });
      if (blob) {
        setFileBlob(blob);
        setFileUrl(window.URL.createObjectURL(blob));
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, isError, fileBlob, fileUrl };
}
