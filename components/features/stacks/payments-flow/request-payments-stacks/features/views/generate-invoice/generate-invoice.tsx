import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

import { fetchInvoicePreview } from "app/api/invoice/handlers";

import BillingProfilesApi from "src/api/billing-profiles";
import useMutationAlert from "src/api/useMutationAlert";
import { Spinner } from "src/components/Spinner/Spinner";
import { useIntl } from "src/hooks/useIntl";

import { Button } from "components/ds/button/button";
import InvoiceViewer from "components/features/invoice-viewer/invoice-viewer";
import { AmountCounter } from "components/features/stacks/payments-flow/request-payments-stacks/components/amount-counter/amount-counter";
import { TRequestPaymentsStacks } from "components/features/stacks/payments-flow/request-payments-stacks/request-payments-stacks.types";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";
import { Translate } from "components/layout/translate/translate";

import { TGenerateInvoice } from "./generate-invoice.types";

export function GenerateInvoice({ rewardIds, billingProfileId, goTo }: TGenerateInvoice.Props) {
  const { getAccessTokenSilently } = useAuth0();
  const { T } = useIntl();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [fileBlob, setFileBlob] = useState<Blob>();
  const [fileUrl, setFileUrl] = useState<string>("");

  const {
    mutate: uploadInvoice,
    isPending: isPendingUploadInvoice,
    ...restUploadInvoice
  } = BillingProfilesApi.mutations.useUploadInvoice({
    params: {
      billingProfileId,
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

  useEffect(() => {
    handleInvoiceCreation();
  }, []);

  async function handleInvoiceCreation() {
    setIsLoading(true);
    try {
      const token = await getAccessTokenSilently();
      const blob = await fetchInvoicePreview({ token, rewardIds, billingProfileId });
      if (blob) {
        setFileBlob(blob);
        setFileUrl(window.URL.createObjectURL(blob));
        setIsLoading(false);
      }
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  }

  function handleSendInvoice() {
    if (fileBlob) {
      uploadInvoice(fileBlob);
    }
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex h-full flex-col overflow-hidden px-1">
        <ScrollView className="mt-10">
          <div className="relative z-0 flex justify-center px-3 pb-44">
            {isLoading ? <div> TODO loading component </div> : null}
            {!isLoading && !isError && fileUrl ? <InvoiceViewer fileUrl={fileUrl} /> : null}
            {isError ? <div> TODO error component </div> : null}
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-greyscale-900">
            <AmountCounter total={1000} />
            <div className="flex h-auto w-full items-center justify-between gap-5 border-t border-card-border-light bg-card-background-light px-8 py-6">
              {/* // empty div to keep the flex layout */}
              {isLoading || isPendingUploadInvoice ? <Spinner /> : <div />}
              <div className="flex items-center justify-end gap-5 ">
                <Button variant="secondary" size="m" onClick={() => goTo({ to: TRequestPaymentsStacks.Views.Select })}>
                  <Translate token="v2.pages.stacks.request_payments.form.back" />
                </Button>
                <Button
                  variant="primary"
                  size="m"
                  onClick={handleSendInvoice}
                  disabled={isPendingUploadInvoice || !fileBlob}
                >
                  <Translate token="v2.pages.stacks.request_payments.form.sendInvoice" />
                </Button>
              </div>
            </div>
          </div>
        </ScrollView>
      </div>
    </div>
  );
}
