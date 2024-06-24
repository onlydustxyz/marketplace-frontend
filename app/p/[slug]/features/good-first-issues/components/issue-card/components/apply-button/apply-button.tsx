import { Button } from "components/ds/button/button";
import { BaseLink } from "components/layout/base-link/base-link";
import { Translate } from "components/layout/translate/translate";

import { TApplyButton } from "./apply-button.types";

export function ApplyButton({ url }: TApplyButton.Props) {
  return (
    <BaseLink href={url}>
      <Button variant="secondary" size="xs">
        <Translate token="v2.pages.project.overview.goodFirstIssues.button" />
      </Button>
    </BaseLink>
  );
}
