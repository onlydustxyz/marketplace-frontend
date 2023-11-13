import { useMemo } from "react";
import { Avatar } from "src/components/New/Avatar";
import { components } from "src/__generated/api";
import { Repository } from "./Repository";

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
    <div
      key={organization.name}
      className="flex w-full flex-col gap-3 rounded-2xl border border-card-border-light bg-card-background-light p-5"
    >
      <div className="flex items-center gap-2">
        <Avatar src={organization.avatarUrl ?? ""} alt={organization.name ?? ""} shape="square" />
        <p className="font-walsheim text-sm font-medium uppercase text-spaceBlue-200">{organization.name}</p>
      </div>
      <div className="grid grid-flow-row grid-cols-2 gap-x-5 gap-y-5">
        {installedRepo.map(repo => (
          <Repository key={repo.name} organization={organization} repository={repo} />
        ))}
      </div>
    </div>
  );
}
