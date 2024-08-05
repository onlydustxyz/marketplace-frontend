import { Button } from "components/ds/button/button";
import { BaseLink } from "components/layout/base-link/base-link";
import { Translate } from "components/layout/translate/translate";

import { NEXT_ROUTER } from "constants/router";

import { TEditButton } from "./edit-button.types";

export function EditButton({ slug }: TEditButton.Props) {
  return (
    <BaseLink href={NEXT_ROUTER.projects.details.edit(slug)}>
      <Button as="div" variant="secondary" size="s" className="flex-1 bg-spaceBlue-900 lg:flex-initial">
        <Translate token="v2.pages.project.details.header.buttons.edit" />
      </Button>
    </BaseLink>
  );
}
