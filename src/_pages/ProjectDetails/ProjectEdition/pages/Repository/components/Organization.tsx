import { sortBy } from "lodash";
import { useContext, useMemo } from "react";

import { useStackGithubWorkflowTutorial } from "src/App/Stacks/Stacks";
import { UseGithubOrganizationsResponse } from "src/api/me/queries";
import InfoIcon from "src/assets/icons/InfoIcon";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { VerticalListItemCard } from "src/components/New/Cards/VerticalListItemCard";
import GithubLogo from "src/icons/GithubLogo";
import { hasUnauthorizedInGithubRepo } from "src/utils/getOrgsWithUnauthorizedRepos";
import { getGithubSetupLink } from "src/utils/githubSetupLink";

import { useIntl } from "hooks/translate/use-translate";

import { EditContext } from "../../../EditContext";
import { Repository } from "./Repository";

type RepositoryOrganizationType = {
  organization: UseGithubOrganizationsResponse;
  installedRepos: Array<{ id: number; isAuthorizedInGithubApp?: boolean }>;
};

export function RepositoryOrganization({ organization, installedRepos }: RepositoryOrganizationType) {
  const { T } = useIntl();
  const { project } = useContext(EditContext);
  const hasUnauthorizedRepos = hasUnauthorizedInGithubRepo(organization.repos);
  const [open] = useStackGithubWorkflowTutorial();
  const components = {
    errorAvatar: (
      <div className="rounded-lg bg-orange-900 p-2 text-orange-500">
        <InfoIcon className="w-3,5 h-3.5" />
      </div>
    ),
    action: organization.isCurrentUserAdmin ? (
      <a
        href={getGithubSetupLink({
          id: organization.githubUserId,
          login: organization.login,
          installationId: organization.installationId,
          installed: organization.installationStatus !== "NOT_INSTALLED",
          isAPersonalOrganization: organization.isPersonal,
          projectSlug: project?.slug,
        })}
        target="_blank"
        rel="noopener noreferrer"
        className="self-end lg:self-start"
      >
        <Button type={ButtonType.Primary} size={ButtonSize.Sm}>
          <GithubLogo />
          {T("project.details.edit.panel.repositories.installGithubApp")}
        </Button>
      </a>
    ) : (
      <Button type={ButtonType.Secondary} size={ButtonSize.Sm} onClick={open}>
        <GithubLogo />
        {T("project.details.edit.panel.repositories.grantPermissions")}
      </Button>
    ),
  };

  const installedReposData = useMemo(
    () => organization.repos?.filter(repo => installedRepos.find(installedRepo => installedRepo.id === repo.id)) || [],
    [organization, installedRepos]
  );

  if (installedReposData.length) {
    return (
      <VerticalListItemCard
        ContainerProps={{ className: " bg-card-background-base gap-5" }}
        key={organization.name || organization?.login}
        title={organization?.name || organization?.login || ""}
        avatarComponent={hasUnauthorizedRepos ? components.errorAvatar : undefined}
        actionComponent={hasUnauthorizedRepos ? components.action : undefined}
        avatarAlt={organization?.name || organization?.login || ""}
        avatarSrc={organization?.avatarUrl || ""}
        headerClassName="lg:flex-row lg:gap-0 flex-col-reverse gap-4 items-start"
      >
        <div className="grid grid-flow-row grid-cols-1 gap-x-5 gap-y-5 lg:grid-cols-2 xl:grid-cols-3">
          {sortBy(installedReposData, "name").map(repo => (
            <Repository key={repo.name} organization={organization} repository={repo} />
          ))}
        </div>
      </VerticalListItemCard>
    );
  }

  return null;
}
