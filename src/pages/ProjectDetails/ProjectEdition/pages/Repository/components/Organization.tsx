import { useMemo } from "react";
import { components } from "src/__generated/api";
import { Repository } from "./Repository";
import { VerticalListItemCard } from "src/components/New/Cards/VerticalListItemCard";
import { hasUnauthorizedInGithubRepo } from "src/utils/getOrgsWithUnauthorizedRepos";
import InfoIcon from "src/assets/icons/InfoIcon";

import GithubLogo from "src/icons/GithubLogo";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";

type RepositoryOrganizationType = {
  organization: components["schemas"]["GithubOrganizationResponse"];
};

export function RepositoryOrganization({ organization }: RepositoryOrganizationType) {
  const { T } = useIntl();
  const hasUnauthorizedRepos = hasUnauthorizedInGithubRepo(organization.repos);

  const components = {
    errorAvatar: (
      <div className="rounded-lg bg-orange-900 p-2 text-orange-500">
        <InfoIcon className="w-3,5 h-3.5" />
      </div>
    ),
    action: (
      <a
        href={`https://github.com/organizations/${organization?.login}/settings/installations/${organization?.installationId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button type={ButtonType.Secondary} size={ButtonSize.Sm}>
          <GithubLogo />
          {T("project.details.edit.panel.repositories.fixGithubApp")}
        </Button>
      </a>
    ),
  };

  const installedRepo = useMemo(
    () => organization.repos?.filter(repo => repo.isIncludedInProject) || [],
    [organization]
  );

  if (installedRepo.length) {
    return (
      <VerticalListItemCard
        ContainerProps={{ className: " bg-card-background-base gap-5" }}
        key={organization.name || organization?.login}
        title={organization?.name || organization?.login || ""}
        avatarComponent={hasUnauthorizedRepos ? components.errorAvatar : undefined}
        actionComponent={hasUnauthorizedRepos ? components.action : undefined}
        avatarAlt={organization?.name || organization?.login || ""}
        avatarSrc={organization?.avatarUrl || ""}
        hasUnauthorizedInGithubRepo={hasUnauthorizedRepos}
      >
        <div className="grid grid-flow-row grid-cols-1 gap-x-5 gap-y-5 lg:grid-cols-2 xl:grid-cols-3">
          {installedRepo.map(repo => (
            <Repository key={repo.name} organization={organization} repository={repo} />
          ))}
        </div>
      </VerticalListItemCard>
    );
  }

  return null;
}
