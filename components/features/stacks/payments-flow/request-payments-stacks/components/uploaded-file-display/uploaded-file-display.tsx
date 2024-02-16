import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { TUploadedFileDisplay } from "components/features/stacks/payments-flow/request-payments-stacks/components/uploaded-file-display/uploaded-file-display.types";
import { Icon } from "components/layout/icon/icon";

export function UploadedFileDisplay({ fileName, onRemoveFile }: TUploadedFileDisplay.Props) {
  return (
    <Card background={false} className="flex flex-col items-center gap-4 border-dashed !py-10">
      <Button onClick={onRemoveFile} disabled={!fileName}>
        <Icon remixName="ri-delete-bin-2-line" size={20} />
        remove file
      </Button>
      <p>{fileName}</p>
    </Card>
  );
}
