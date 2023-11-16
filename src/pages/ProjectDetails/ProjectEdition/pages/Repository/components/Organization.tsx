import { useMemo } from "react";
import { Repository } from "./Repository";
import { VerticalListItemCard } from "src/components/New/Cards/VerticalListItemCard";
import { EditOrganizationMerged } from "../../../EditContext";

type RepositoryOrganizationType = {
  organization: EditOrganizationMerged;
  installedRepos: number[];
};

export function RepositoryOrganization({ organization, installedRepos }: RepositoryOrganizationType) {
  const installedRepo = useMemo(
    () => organization.repos?.filter(repo => installedRepos.includes(repo.id)) || [],
    [organization, installedRepos]
  );

  console.log("installedRepo", installedRepo, organization.name);

  if (installedRepo.length) {
    return (
      <VerticalListItemCard
        ContainerProps={{ className: " bg-card-background-base" }}
        key={organization.name || organization?.login}
        title={organization?.name || organization?.login || ""}
        avatarAlt={organization?.name || organization?.login || ""}
        avatarSrc={organization?.avatarUrl || ""}
      >
        <div className="grid grid-flow-row grid-cols-3 gap-x-5 gap-y-5">
          {installedRepo.map(repo => (
            <Repository key={repo.name} organization={organization} repository={repo} />
          ))}
        </div>
      </VerticalListItemCard>
    );
  }

  return null;
}
