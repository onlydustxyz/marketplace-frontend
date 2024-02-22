import { useEffect, useMemo, useState } from "react";

import { Spinner } from "src/components/Spinner/Spinner";
import { useIntl } from "src/hooks/useIntl";

import { Banner } from "components/ds/banner/banner";
import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { UploadFile } from "components/features/stacks/payments-flow/request-payments-stacks/components/upload-file/upload-file";
import { UploadedFileDisplay } from "components/features/stacks/payments-flow/request-payments-stacks/components/uploaded-file-display/uploaded-file-display";
import { TUploadInvoice } from "components/features/stacks/payments-flow/request-payments-stacks/features/views/upload-invoice/upload-invoice.types";
import { useInvoicePreview } from "components/features/stacks/payments-flow/request-payments-stacks/hooks/use-invoice-preview/use-invoice-preview";
import { useInvoiceUpload } from "components/features/stacks/payments-flow/request-payments-stacks/hooks/use-invoice-upload/use-invoice-upload";
import { TRequestPaymentsStacks } from "components/features/stacks/payments-flow/request-payments-stacks/request-payments-stacks.types";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function UploadInvoice({ rewardIds, billingProfileId, goTo }: TUploadInvoice.Props) {
  const { T } = useIntl();
  const { isLoading, isError, fileUrl, invoiceId } = useInvoicePreview({ rewardIds, billingProfileId, isSample: true });
  const { isPendingUploadInvoice, handleSendInvoice } = useInvoiceUpload({ billingProfileId, invoiceId });
  const [selectedFile, setSelectedFile] = useState<File>();
  const [blobFile, setBlobFile] = useState<Blob>();

  function fileToBlob() {
    const reader = new FileReader();
    if (selectedFile) {
      reader.readAsText(selectedFile);
      reader.onload = function () {
        if (reader.result) {
          setBlobFile(new Blob([reader.result], { type: "application/pdf" }));
        }
      };
    }
  }

  useEffect(() => {
    fileToBlob();
  }, [selectedFile]);

  function removeFile() {
    setSelectedFile(undefined);
  }

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

  const renderUploadSample = useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex flex-col gap-2">
          <SkeletonEl width="90%" height="9px" variant="text" color="grey" />
          <SkeletonEl width="15%" height="9px" variant="text" color="grey" />
          <SkeletonEl width="40%" height="9px" variant="text" color="grey" className="mt-2" />
        </div>
      );
    }
    if (!isError && !isLoading) {
      return (
        <>
          <Typography
            variant={"body-m"}
            translate={{ token: "v2.pages.stacks.request_payments.uploadInvoice.sample_to_download" }}
          />
          <a
            className="text-snow hover:text-spacePurple-400 active:text-spacePurple-400"
            href={fileUrl}
            download="invoice-sample.pdf"
          >
            <Typography
              variant={"body-m"}
              translate={{ token: "v2.pages.stacks.request_payments.uploadInvoice.sample_link_label" }}
            />
          </a>
        </>
      );
    }
    return null;
  }, [fileUrl, isError, isLoading]);

  function renderUploadFile() {
    if (selectedFile) {
      return <UploadedFileDisplay fileName={selectedFile.name} onRemoveFile={removeFile} />;
    }

    return <UploadFile setSelectedFile={setSelectedFile} />;
  }

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
              <div className="prose leading-normal text-greyscale-50">
                <Translate token="v2.pages.stacks.request_payments.uploadInvoice.summary.requirement" />
                <br />
                {requirementList}
                {renderUploadSample}
              </div>
            </Card>
            <Typography
              variant={"title-s"}
              translate={{ token: "v2.pages.stacks.request_payments.uploadInvoice.uploadInvoiceTitle" }}
              className="mb-4"
            />
            {renderUploadFile()}
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-greyscale-900">
            {selectedFile ? (
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
            ) : null}
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
                  onClick={() =>
                    handleSendInvoice({ fileBlob: blobFile, isManualUpload: false, fileName: selectedFile?.name })
                  }
                  disabled={isPendingUploadInvoice || !selectedFile}
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
