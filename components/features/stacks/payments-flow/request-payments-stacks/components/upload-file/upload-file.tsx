import React, { useRef } from "react";

import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";

import { Card } from "components/ds/card/card";
import { IconTag } from "components/ds/icon-tag/icon-tag";
import { TUploadFile } from "components/features/stacks/payments-flow/request-payments-stacks/components/upload-file/upload-file.types";
import { Translate } from "components/layout/translate/translate";

export function UploadFile({ setSelectedFile }: TUploadFile.Props) {
  const { T } = useIntl();
  const showToaster = useShowToaster();
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>): void {
    if (event.target.files) {
      if (event.target.files[0].size > 3000000) {
        showToaster(T("v2.pages.stacks.request_payments.uploadInvoice.errorMaxSizeFile"), { isError: true });
      } else {
        setSelectedFile(event.target.files[0]);
      }
    }
  }

  function onChooseFile() {
    inputRef.current?.click();
  }

  return (
    <Card
      background={false}
      className="flex flex-col items-center gap-4 border-dashed !py-10"
      clickable
      onClick={onChooseFile}
    >
      <IconTag icon={{ remixName: "ri-upload-cloud-line" }} />
      <div>
        <Translate
          as="span"
          className="text-spacePurple-400"
          token="v2.pages.stacks.request_payments.uploadInvoice.clickToUpload"
        />{" "}
        <Translate token="v2.pages.stacks.request_payments.uploadInvoice.dragAndDrop" />
      </div>
      <input type="file" ref={inputRef} onChange={handleOnChange} className="hidden" accept="application/pdf" />
    </Card>
  );
}
