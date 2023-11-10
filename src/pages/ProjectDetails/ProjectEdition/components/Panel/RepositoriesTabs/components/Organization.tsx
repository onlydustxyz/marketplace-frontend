import { FC, useMemo } from "react";
import { VerticalListItemCard } from "src/components/New/Cards/VerticalListItemCard";
import { components } from "src/__generated/api";

export interface OrganizationProps {
  organization: components["schemas"]["ProjectGithubOrganizationResponse"];
}
export const Organization: FC<OrganizationProps> = ({ organization }) => {
  const unInstalledRepo = useMemo(
    // () => organization.repos?.filter(repo => !repo.isIncludedInProject) || [],
    () => organization.repos?.filter(repo => repo.isIncludedInProject) || [],
    [organization]
  );
  return (
    <div>
      <VerticalListItemCard
        ContainerProps={{ className: "bg-transparent" }}
        key={organization.name || organization?.login}
        title={organization?.name || organization?.login || ""}
        avatarAlt={organization?.name || organization?.login || ""}
        avatarSrc={organization?.avatarUrl || ""}
      >
        <div>
          {unInstalledRepo.map(repo => (
            <div className="card-light rounded-large border p-4 shadow-light" key={repo.id}>
              {repo.name}
            </div>
          ))}
        </div>
      </VerticalListItemCard>
    </div>
  );
};
