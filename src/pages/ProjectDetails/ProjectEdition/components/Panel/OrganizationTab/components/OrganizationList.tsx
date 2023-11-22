import { useContext } from "react";
import { UseGithubOrganizationsResponse } from "src/api/me/queries";
import HorizontalListItemCard from "src/components/New/Cards/HorizontalListItemCard";
import AddLine from "src/icons/AddLine";
import PencilLine from "src/icons/PencilLine";
import { EditContext } from "src/pages/ProjectDetails/ProjectEdition/EditContext";
import { getGithubSetupLink } from "src/utils/githubSetupLink";

interface OrganizationListProps {
  organizations: UseGithubOrganizationsResponse[];
  emptyListFallBackText: string;
}

export default function OrganizationList({ organizations, emptyListFallBackText }: OrganizationListProps) {
  const {
    githubWorklow: { run },
    project,
  } = useContext(EditContext);

  if (organizations.length) {
    return (
      <ul className="flex flex-col gap-2 py-4 pb-6">
        {organizations.map((org, index) => {
          const linkUrl = getGithubSetupLink({
            id: org.id,
            login: org.login,
            installationId: org.installationId,
            installed: org.installed,
            isAPersonalOrganization: org.isPersonal,
            projectSlug: project?.slug,
          });

          return (
            <HorizontalListItemCard
              key={`${org.login}+${index}`}
              avatarUrl={org.avatarUrl ?? ""}
              title={org.name || org.login || ""}
              linkUrl={linkUrl}
              linkClick={run}
              linkIcon={org.installed ? <PencilLine /> : <AddLine />}
              isExternalFlow={org.installed}
              disabled={!org.isCurrentUserAdmin}
            />
          );
        })}
      </ul>
    );
  }

  return <p className="mt-3 text-gray-500">{emptyListFallBackText}</p>;
}
