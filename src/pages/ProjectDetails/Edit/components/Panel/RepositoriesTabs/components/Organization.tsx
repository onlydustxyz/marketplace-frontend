import { FC } from "react";
import { VerticalListItemCard } from "src/components/New/Cards/VerticalListItemCard";
import { components } from "src/__generated/api";

export interface OrganizationProps {
  organization: components["schemas"]["ProjectGithubOrganizationResponse"];
}
export const Organization: FC<OrganizationProps> = ({ organization }) => {
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
          <p>coucou</p>
          <p>coucou</p>
          <p>coucou</p>
        </div>
      </VerticalListItemCard>
    </div>
  );
};
