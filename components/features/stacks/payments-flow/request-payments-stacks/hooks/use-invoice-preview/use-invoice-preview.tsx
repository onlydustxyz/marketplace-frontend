import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef, useState } from "react";

import { fetchInvoicePreviewBlob } from "app/api/invoice/handlers/fetch-invoice-preview-blob";

import { TUseInvoicePreview } from "components/features/stacks/payments-flow/request-payments-stacks/hooks/use-invoice-preview/use-invoice-preview.types";

export function useInvoicePreview({ rewardIds, billingProfileId, isSample = false }: TUseInvoicePreview.Props) {
  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [invoiceCreation, setInvoiceCreation] = useState({
    fileBlob: Blob,
    fileUrl: "",
    invoiceId: "",
  });

  const fetched = useRef(false);

  useEffect(() => {
    if (rewardIds && billingProfileId && !fetched.current) {
      handleInvoiceCreation();
    }
  }, []);

  async function handleInvoiceCreation() {
    fetched.current = true;
    setIsLoading(true);
    try {
      const token = await getAccessTokenSilently();
      const data = await fetchInvoicePreviewBlob({ token, rewardIds, billingProfileId, isSample });
      if (data.blob) {
        setInvoiceCreation({
          fileBlob: data.blob,
          fileUrl: window.URL.createObjectURL(data.blob),
          invoiceId: data.invoiceId ?? "",
        });
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    isError,
    ...invoiceCreation,
  };
}
