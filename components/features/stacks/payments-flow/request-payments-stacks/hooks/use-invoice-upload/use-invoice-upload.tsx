import { useState } from "react";

import { useStackRequestPayments } from "src/App/Stacks/Stacks";
import BillingProfilesApi from "src/api/BillingProfiles";
import useMutationAlert from "src/api/useMutationAlert";
import { useIntl } from "src/hooks/useIntl";
import { usePosthog } from "src/hooks/usePosthog";
import { useShowToaster } from "src/hooks/useToaster";

import { TUseInvoiceUpload } from "components/features/stacks/payments-flow/request-payments-stacks/hooks/use-invoice-upload/use-invoice-upload.types";

export function useInvoiceUpload({ billingProfileId, invoiceId }: TUseInvoiceUpload.Props) {
  const { T } = useIntl();
  const { capture } = usePosthog();
  const showToaster = useShowToaster();
  const [, closeRequestPanel] = useStackRequestPayments();
  const [queryParams, setQueryParams] = useState({});

  const {
    mutate: uploadInvoice,
    isPending: isPendingUploadInvoice,
    ...restUploadInvoice
  } = BillingProfilesApi.mutations.useUploadInvoice({
    params: {
      billingProfileId,
      invoiceId,
      queryParams,
    },
    options: {
      onSuccess: () => {
        closeRequestPanel();
      },
    },
  });

  useMutationAlert({
    mutation: restUploadInvoice,
    success: {
      message: T("v2.pages.stacks.request_payments.invoiceSubmission.toaster.success"),
    },
    error: {
      message: T("v2.pages.stacks.request_payments.invoiceSubmission.toaster.error"),
    },
  });

  function handleSendInvoice({ fileBlob, isManualUpload = false, fileName }: TUseInvoiceUpload.HandleSendInvoiceProps) {
    if (isManualUpload && fileName) {
      const params = new URLSearchParams();
      params.append("fileName", fileName);
      setQueryParams(params);
      capture("invoice_submitted", { type: "manuel" });
    }
    if (fileBlob) {
      uploadInvoice(fileBlob);
      capture("invoice_submitted", { type: "auto-generated" });
    } else {
      showToaster(T("v2.pages.stacks.request_payments.invoiceSubmission.toaster.emptyFile"), { isError: true });
    }
  }

  return { isPendingUploadInvoice, handleSendInvoice };
}
