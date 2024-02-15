import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

import { fetchInvoicePreviewBlob } from "app/api/invoice/handlers/fetch-invoice-preview-blob";

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
import { Typography } from "components/layout/typography/typography";

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
      const blob = await fetchInvoicePreviewBlob({ token, rewardIds, billingProfileId });
      if (blob) {
        setFileBlob(blob);
        setFileUrl(window.URL.createObjectURL(blob));
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSendInvoice() {
    if (fileBlob) {
      uploadInvoice(fileBlob);
    }
  }

  function renderInvoicePreview() {
    if (isLoading) {
      return <div> TODO loading component </div>;
    }
    if (isError) {
      return <div> TODO error component </div>;
    }
    if (fileUrl) {
      return <InvoiceViewer fileUrl={fileUrl} />;
    }
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex h-full flex-col overflow-hidden px-1">
        <div className="mb-8 px-3">
          <Typography
            variant={"title-m"}
            translate={{ token: "v2.pages.stacks.request_payments.title" }}
            className="text-greyscale-50"
          />
        </div>
        <ScrollView className="m-4 w-auto rounded-2xl border border-card-border-light p-4">
          <div className="relative z-0 flex justify-center">{renderInvoicePreview()}</div>
        </ScrollView>
        <div className="w-full bg-greyscale-900">
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
      </div>
    </div>
  );
}
