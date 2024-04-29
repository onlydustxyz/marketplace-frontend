import { useMemo } from "react";

import { BillingProfilesTypes } from "src/api/BillingProfiles/type";
import { IMAGES } from "src/assets/img";
import { Spinner } from "src/components/Spinner/Spinner";

import { Banner } from "components/ds/banner/banner";
import { Button } from "components/ds/button/button";
import { InvoicePreviewLoading } from "components/features/invoice-viewer/invoice-preview.loading";
import InvoiceViewer from "components/features/invoice-viewer/invoice-viewer";
import { useInvoicePreview } from "components/features/stacks/payments-flow/request-payments-stacks/hooks/use-invoice-preview/use-invoice-preview";
import { useInvoiceUpload } from "components/features/stacks/payments-flow/request-payments-stacks/hooks/use-invoice-upload/use-invoice-upload";
import { TRequestPaymentsStacks } from "components/features/stacks/payments-flow/request-payments-stacks/request-payments-stacks.types";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";
import { EmptyState } from "components/layout/placeholders/empty-state/empty-state";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { useBillingProfileById } from "hooks/billings-profiles/use-billing-profile/use-billing-profile";
import { useIntl } from "hooks/translate/use-translate";

import { TGenerateInvoice } from "./generate-invoice.types";

export function GenerateInvoice({ rewardIds, billingProfileId, goTo }: TGenerateInvoice.Props) {
  const { T } = useIntl();
  const { profile } = useBillingProfileById({ id: billingProfileId, enabledPooling: false });
  const { isLoading, isError, fileBlob, fileUrl, invoiceId } = useInvoicePreview({
    rewardIds,
    billingProfileId,
    isSample: false,
  });
  const { isPendingUploadInvoice, handleSendInvoice } = useInvoiceUpload({ billingProfileId, invoiceId });

  const renderInvoicePreview = useMemo(() => {
    if (isLoading) {
      return <InvoicePreviewLoading />;
    }
    if (isError) {
      return (
        <EmptyState
          illustrationSrc={IMAGES.logo.crashed}
          title={{ token: "v2.pages.stacks.request_payments.invoiceSubmission.error.title" }}
          description={{ token: "v2.pages.stacks.request_payments.invoiceSubmission.error.description" }}
        />
      );
    }
    if (fileUrl) {
      return <InvoiceViewer fileUrl={fileUrl} />;
    }
    return null;
  }, [isLoading, isError, fileUrl]);

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
        <ScrollView className="m-4 mb-0 w-auto rounded-2xl border border-card-border-light p-4">
          <div className="relative z-0 flex justify-center">{renderInvoicePreview}</div>
        </ScrollView>
        <div className="w-full bg-greyscale-900">
          <div className="bg-greyscale-900 p-4">
            <Banner
              title={<Translate token={"v2.pages.stacks.request_payments.invoiceSubmission.banner.title"} />}
              description={
                <Translate token={"v2.pages.stacks.request_payments.invoiceSubmission.banner.description"} />
              }
              variant={"medium"}
              hasBorder={false}
              icon={{ remixName: "ri-information-line" }}
              size={"s"}
            />
          </div>
          <div className="flex h-auto w-full items-center justify-between gap-5 border-t border-card-border-light bg-card-background-light px-8 py-6">
            {/* // empty div to keep the flex layout */}
            {isLoading || isPendingUploadInvoice ? <Spinner /> : <div />}
            <div className="flex items-center justify-end gap-5">
              <Button
                variant="secondary"
                size="m"
                onClick={() => goTo({ to: TRequestPaymentsStacks.Views.SelectRewards })}
              >
                <Translate token="v2.pages.stacks.request_payments.form.back" />
              </Button>
              <Button
                variant="primary"
                size="m"
                onClick={() => handleSendInvoice({ fileBlob })}
                disabled={isPendingUploadInvoice || !fileBlob}
              >
                <Translate
                  token="v2.pages.stacks.request_payments.form.approveLabel"
                  params={{
                    fileType:
                      profile?.data?.type === BillingProfilesTypes.type.Individual
                        ? T("v2.pages.stacks.request_payments.form.receipt")
                        : T("v2.pages.stacks.request_payments.form.invoice"),
                  }}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
