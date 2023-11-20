import { useMemo } from "react";
import { components } from "src/__generated/api";
import { Repository } from "./Repository";
import { VerticalListItemCard } from "src/components/New/Cards/VerticalListItemCard";
import { hasUnauthorizedInGithubRepo } from "src/utils/getOrgsWithUnauthorizedRepos";

type RepositoryOrganizationType = {
  organization: components["schemas"]["GithubOrganizationResponse"];
};

export function RepositoryOrganization({ organization }: RepositoryOrganizationType) {
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
        avatarAlt={organization?.name || organization?.login || ""}
        avatarSrc={organization?.avatarUrl || ""}
        hasUnauthorizedInGithubRepo={hasUnauthorizedInGithubRepo(organization.repos)}
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
