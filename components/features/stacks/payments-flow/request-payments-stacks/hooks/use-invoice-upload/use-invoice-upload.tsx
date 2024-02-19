import BillingProfilesApi from "src/api/billing-profiles";
import useMutationAlert from "src/api/useMutationAlert";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";

import { TUseInvoiceUpload } from "components/features/stacks/payments-flow/request-payments-stacks/hooks/use-invoice-upload/use-invoice-upload.types";

export function useInvoiceUpload({ billingProfileId, invoiceId }: TUseInvoiceUpload.Props) {
  const { T } = useIntl();
  const showToaster = useShowToaster();

  const {
    mutate: uploadInvoice,
    isPending: isPendingUploadInvoice,
    ...restUploadInvoice
  } = BillingProfilesApi.mutations.useUploadInvoice({
    params: {
      billingProfileId,
      invoiceId,
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

  function handleSendInvoice(fileBlob: Blob | undefined) {
    if (fileBlob) {
      uploadInvoice(fileBlob);
    } else {
      showToaster(T("v2.pages.stacks.request_payments.invoiceSubmission.toaster.emptyFile"), { isError: true });
    }
  }

  return { isPendingUploadInvoice, handleSendInvoice };
}
