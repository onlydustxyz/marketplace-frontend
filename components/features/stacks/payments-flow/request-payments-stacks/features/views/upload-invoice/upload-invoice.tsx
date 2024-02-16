import { useMemo } from "react";

import { Spinner } from "src/components/Spinner/Spinner";
import { useIntl } from "src/hooks/useIntl";

import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { IconTag } from "components/ds/icon-tag/icon-tag";
import { TUploadInvoice } from "components/features/stacks/payments-flow/request-payments-stacks/features/views/upload-invoice/upload-invoice.types";
import { useInvoicePreview } from "components/features/stacks/payments-flow/request-payments-stacks/hooks/use-invoice-preview/use-invoice-preview";
import { useInvoiceUpload } from "components/features/stacks/payments-flow/request-payments-stacks/hooks/use-invoice-upload/use-invoice-upload";
import { TRequestPaymentsStacks } from "components/features/stacks/payments-flow/request-payments-stacks/request-payments-stacks.types";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function UploadInvoice({ rewardIds, billingProfileId, goTo }: TUploadInvoice.Props) {
  const { T } = useIntl();
  const { isLoading, isError, fileBlob, fileUrl } = useInvoicePreview({ rewardIds, billingProfileId });
  const { isPendingUploadInvoice, handleSendInvoice } = useInvoiceUpload({ billingProfileId });

  const requirementList = useMemo(
    () => (
      <ul>
        {Array.from({ length: 5 }, (_, index) => {
          const token = `v2.pages.stacks.request_payments.uploadInvoice.summary.rule_${index + 1}`;
          return <li key={token}>{T(token)}</li>;
        })}
      </ul>
    ),
    []
  );

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex h-full flex-col overflow-hidden px-1">
        <ScrollView>
          <div className="px-3 pb-[250px]">
            <div className="mb-8">
              <Typography
                variant={"title-m"}
                translate={{ token: "v2.pages.stacks.request_payments.title" }}
                className="text-greyscale-50"
              />
            </div>
            <Typography
              variant={"title-s"}
              translate={{ token: "v2.pages.stacks.request_payments.uploadInvoice.guidelinesTitle" }}
              className="mb-4"
            />
            <Card background={false} className="mb-4">
              <p className="prose leading-normal text-greyscale-50">
                <Translate token="v2.pages.stacks.request_payments.uploadInvoice.summary.requirement" />
                <br />
                {requirementList}
                <br />
                {!isError && !isLoading ? (
                  <>
                    <Translate token="v2.pages.stacks.request_payments.uploadInvoice.sample_to_download" />
                    <a
                      className="text-snow hover:text-spacePurple-400 active:text-spacePurple-400"
                      href={fileUrl}
                      download="invoice-sample.pdf"
                    >
                      <Translate token="v2.pages.stacks.request_payments.uploadInvoice.sample_link_label" />
                    </a>
                  </>
                ) : null}
              </p>
            </Card>
            <Typography
              variant={"title-s"}
              translate={{ token: "v2.pages.stacks.request_payments.uploadInvoice.uploadInvoiceTitle" }}
              className="mb-4"
            />
            <Card background={false} className="flex flex-col items-center gap-4 border-dashed !py-10" clickable>
              <IconTag icon={{ remixName: "ri-hand-coin-line" }} />
              <div>
                <Translate
                  as="span"
                  className="text-spacePurple-400"
                  token="v2.pages.stacks.request_payments.uploadInvoice.clickToUpload"
                />{" "}
                <Translate token="v2.pages.stacks.request_payments.uploadInvoice.dragAndDrop" />
              </div>
            </Card>
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-greyscale-900">
            <div className="flex h-auto w-full items-center justify-between gap-5 border-t border-card-border-light bg-card-background-light px-8 py-6">
              {isLoading || isPendingUploadInvoice ? <Spinner /> : <div />}
              <div className="flex items-center justify-end gap-5">
                <Button variant="secondary" size="m" onClick={() => goTo({ to: TRequestPaymentsStacks.Views.Mandate })}>
                  <Translate token="v2.pages.stacks.request_payments.form.back" />
                </Button>
                <Button
                  variant="primary"
                  size="m"
                  className="w-full"
                  onClick={() => handleSendInvoice(fileBlob)}
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
