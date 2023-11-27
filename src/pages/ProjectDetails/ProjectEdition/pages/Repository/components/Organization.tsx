import { useContext, useMemo } from "react";
import { Repository } from "./Repository";
import { VerticalListItemCard } from "src/components/New/Cards/VerticalListItemCard";
import { UseGithubOrganizationsResponse } from "src/api/me/queries";
import { hasUnauthorizedInGithubRepo } from "src/utils/getOrgsWithUnauthorizedRepos";
import { useIntl } from "src/hooks/useIntl";
import InfoIcon from "src/assets/icons/InfoIcon";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import GithubLogo from "src/icons/GithubLogo";
import { withTooltip } from "src/components/Tooltip";
import { getGithubSetupLink } from "src/utils/githubSetupLink";
import { EditContext } from "../../../EditContext";
import { sortBy } from "lodash";

type RepositoryOrganizationType = {
  organization: UseGithubOrganizationsResponse;
  installedRepos: Array<{ id: number; isAuthorizedInGithubApp?: boolean }>;
};

export function RepositoryOrganization({ organization, installedRepos }: RepositoryOrganizationType) {
  const { T } = useIntl();
  const { project } = useContext(EditContext);
  const hasUnauthorizedRepos = hasUnauthorizedInGithubRepo(organization.repos);

  const components = {
    errorAvatar: (
      <div className="rounded-lg bg-orange-900 p-2 text-orange-500">
        <InfoIcon className="w-3,5 h-3.5" />
      </div>
    ),
    action: (
      <a
        href={getGithubSetupLink({
          id: organization.id,
          login: organization.login,
          installationId: organization.installationId,
          installed: organization.installed,
          isAPersonalOrganization: organization.isPersonal,
          projectSlug: project?.slug,
        })}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          type={ButtonType.Secondary}
          size={ButtonSize.Sm}
          disabled={!organization.isCurrentUserAdmin}
          {...withTooltip(T("project.details.edit.panel.repositories.fixGithubAppTooltip"), {
            visible: !organization.isCurrentUserAdmin,
          })}
        >
          <GithubLogo />
          {T("project.details.edit.panel.repositories.fixGithubApp")}
        </Button>
      </a>
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
