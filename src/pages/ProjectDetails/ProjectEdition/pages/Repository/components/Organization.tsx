import { useMemo } from "react";
import { Repository } from "./Repository";
import { VerticalListItemCard } from "src/components/New/Cards/VerticalListItemCard";
import { UseGithubOrganizationsResponse } from "src/api/me/queries";

type RepositoryOrganizationType = {
  organization: UseGithubOrganizationsResponse;
  installedRepos: number[];
};

export function RepositoryOrganization({ organization, installedRepos }: RepositoryOrganizationType) {
  const installedReposData = useMemo(
    () => organization.repos?.filter(repo => installedRepos.includes(repo.id)) || [],
    [organization, installedRepos]
  );

  if (installedReposData.length) {
    return (
      <VerticalListItemCard
        ContainerProps={{ className: " bg-card-background-base" }}
        key={organization.name || organization?.login}
        title={organization?.name || organization?.login || ""}
        avatarAlt={organization?.name || organization?.login || ""}
        avatarSrc={organization?.avatarUrl || ""}
      >
        <div className="grid grid-flow-row grid-cols-3 gap-x-5 gap-y-5">
          {installedReposData.map(repo => (
            <Repository key={repo.name} organization={organization} repository={repo} />
          ))}
        </div>
      </VerticalListItemCard>
    );
  }

  return null;
}
