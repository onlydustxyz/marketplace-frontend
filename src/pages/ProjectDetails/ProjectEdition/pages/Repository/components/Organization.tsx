import { useMemo } from "react";
import { components } from "src/__generated/api";
import { Repository } from "./Repository";
import { VerticalListItemCard } from "src/components/New/Cards/VerticalListItemCard";

type RepositoryOrganizationType = {
  organization: components["schemas"]["ProjectGithubOrganizationResponse"];
};

export function RepositoryOrganization({ organization }: RepositoryOrganizationType) {
  const installedRepo = useMemo(
    () => organization.repos?.filter(repo => repo.isIncludedInProject) || [],
    [organization]
  );

  if (installedRepo.length === 0) {
    return null;
  }

  return (
    <VerticalListItemCard
      ContainerProps={{ className: " bg-card-background-base" }}
      key={organization.name || organization?.login}
      title={organization?.name || organization?.login || ""}
      avatarAlt={organization?.name || organization?.login || ""}
      avatarSrc={organization?.avatarUrl || ""}
    >
      <div className="grid grid-flow-row grid-cols-2 gap-x-5 gap-y-5">
        {installedRepo.map(repo => (
          <Repository key={repo.name} organization={organization} repository={repo} />
        ))}
      </div>
    </VerticalListItemCard>
  );
}
