import React from "react";

import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { IconTag } from "components/ds/icon-tag/icon-tag";
import { TUploadedFileDisplay } from "components/features/stacks/payments-flow/request-payments-stacks/components/uploaded-file-display/uploaded-file-display.types";
import { Icon } from "components/layout/icon/icon";

export function UploadedFileDisplay({ fileName, onRemoveFile }: TUploadedFileDisplay.Props) {
  return (
    <Card background="light" className="flex flex-row items-center gap-4 ">
      <IconTag icon={{ remixName: "ri-file-line" }} />
      <p className="flex-1">{fileName}</p>
      <Button variant="tertiary" onClick={onRemoveFile} disabled={!fileName} iconOnly className="text-spacePurple-400">
        <Icon remixName="ri-delete-bin-2-line" size={20} />
      </Button>
    </Card>
  );
}
