import { FC, useContext } from "react";

import { EditContext } from "src/_pages/ProjectDetails/ProjectEdition/EditContext";
import { UseGithubOrganizationsResponse } from "src/api/me/queries";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { Flex } from "src/components/New/Layout/Flex";
import { withTooltip } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import AddLine from "src/icons/AddLine";

import { Link } from "components/ds/link/link";
import { Typography } from "components/layout/typography/typography";

export interface RepositoryProps {
  organization: UseGithubOrganizationsResponse;
  repository: UseGithubOrganizationsResponse["repos"][0];
}
export const Repository: FC<RepositoryProps> = ({ organization, repository }) => {
  const { T } = useIntl();
  const { formHelpers } = useContext(EditContext);

  const onClick = () => {
    if (organization.githubUserId && repository.id) {
      formHelpers.addRepository(organization.githubUserId, repository.id);
    }
  };

  return (
    <div className="card-light w-full rounded-large border p-4 shadow-light">
      <Flex justify="start" item="start" className="gap-5">
        <Button
          iconOnly
          type={ButtonType.Secondary}
          size={ButtonSize.Sm}
          onClick={onClick}
          {...withTooltip(T("project.details.overview.repositories.add"))}
        >
          <AddLine className="text-base leading-none" />
        </Button>

        <Flex justify="start" item="start" direction="col" className="flex-1 gap-2.5 overflow-hidden">
          <Link href={repository.htmlUrl}>
            <Typography variant="body-m-bold">{repository.name}</Typography>
          </Link>

          <div className="w-full max-w-full">
            <p className="text-body-s w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-greyscale-200">
              {repository.description || T("project.details.overview.repositories.descriptionPlaceholder")}
            </p>
          </div>
        </Flex>
      </Flex>
    </div>
  );
};
