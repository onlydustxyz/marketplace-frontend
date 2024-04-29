import { ChangeEvent, useRef } from "react";

import { useShowToaster } from "src/hooks/useToaster";

import { Card } from "components/ds/card/card";
import { IconTag } from "components/ds/icon-tag/icon-tag";
import { TUploadFile } from "components/features/stacks/payments-flow/request-payments-stacks/components/upload-file/upload-file.types";
import { Translate } from "components/layout/translate/translate";

import { useIntl } from "hooks/translate/use-translate";

export function UploadFile({ setSelectedFile }: TUploadFile.Props) {
  const { T } = useIntl();
  const showToaster = useShowToaster();
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleOnChange(event: ChangeEvent<HTMLInputElement>): void {
    if (event.target.files) {
      if (event.target.files[0].size > 3000000) {
        showToaster(T("v2.pages.stacks.request_payments.uploadInvoice.errorMaxSizeFile"), { isError: true });
      } else {
        setSelectedFile(event.target.files[0]);
      }
    }
  }

  return (
    <Card background={false} className="relative z-[0] flex flex-col items-center gap-4 border-dashed !py-10" clickable>
      <IconTag icon={{ remixName: "ri-upload-cloud-line" }} />
      <div className="flex flex-col gap-1 text-center">
        <div>
          <Translate
            as="span"
            className="text-spacePurple-400"
            token="v2.pages.stacks.request_payments.uploadInvoice.clickToUpload"
          />{" "}
          <Translate token="v2.pages.stacks.request_payments.uploadInvoice.dragAndDrop" />
        </div>
        <Translate
          as="div"
          className="text-sm text-gray-500"
          token="v2.pages.stacks.request_payments.uploadInvoice.fileType"
        />
      </div>
      <input
        type="file"
        ref={inputRef}
        onChange={handleOnChange}
        className="absolute h-full w-full cursor-pointer opacity-0"
        accept="application/pdf"
      />
    </Card>
  );
}
