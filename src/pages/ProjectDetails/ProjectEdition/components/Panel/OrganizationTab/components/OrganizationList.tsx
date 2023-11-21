import { useContext } from "react";
import { UseGithubOrganizationsResponse } from "src/api/me/queries";
import HorizontalListItemCard from "src/components/New/Cards/HorizontalListItemCard";
import AddLine from "src/icons/AddLine";
import PencilLine from "src/icons/PencilLine";
import { EditContext } from "src/pages/ProjectDetails/ProjectEdition/EditContext";

interface OrganizationListProps {
  organizations: UseGithubOrganizationsResponse[];
  emptyListFallBackText: string;
}

export default function OrganizationList({ organizations, emptyListFallBackText }: OrganizationListProps) {
  const {
    githubWorklow: { run },
    project,
  } = useContext(EditContext);
  const getLinkUrl = (org: UseGithubOrganizationsResponse) => {
    if (org.installed && org.installationId) {
      return `https://github.com/organizations/${org.login}/settings/installations/${org.installationId}`;
    }

    return `${import.meta.env.VITE_GITHUB_INSTALLATION_URL}/permissions?target_id=${org.id}?state=${project?.slug}`;
  };

  if (organizations.length) {
    return (
      <ul className="flex flex-col gap-2 py-4 pb-6">
        {organizations.map((org, index) => {
          const linkUrl = getLinkUrl(org);

          return (
            <HorizontalListItemCard
              key={`${org.login}+${index}`}
              avatarUrl={org.avatarUrl ?? ""}
              title={org.name || org.login || ""}
              linkUrl={linkUrl}
              linkClick={run}
              linkIcon={org.installed ? <PencilLine /> : <AddLine />}
              isExternalFlow={org.installed}
            />
          );
        })}
      </ul>
    );
  }

  return <p className="mt-3 text-gray-500">{emptyListFallBackText}</p>;
}
