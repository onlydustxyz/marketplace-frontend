import { useIntl } from "src/hooks/useIntl";

import { Button } from "components/ds/button/button";
import { BaseLink } from "components/layout/base-link/base-link";

import { NEXT_ROUTER } from "constants/router";

type EditProjectButtonProps = { projectKey: string };

export function EditProjectButton({ projectKey }: EditProjectButtonProps) {
  const { T } = useIntl();

  return (
    <BaseLink href={NEXT_ROUTER.projects.details.edit(projectKey)}>
      <Button as="div" variant="secondary" size="s" className="flex-1 bg-spaceBlue-900 lg:flex-initial">
        {T("project.details.edit.title")}
      </Button>
    </BaseLink>
  );
}
