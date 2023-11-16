import { UseOrganizationsByGithubUserIdResponse } from "src/api/Github/queries";
import HorizontalListItemCard from "src/components/New/Cards/HorizontalListItemCard";
import AddLine from "src/icons/AddLine";
import PencilLine from "src/icons/PencilLine";

interface OrganizationListProps {
  organizations: UseOrganizationsByGithubUserIdResponse[];
  emptyListFallBackText: string;
}

export default function OrganizationList({ organizations, emptyListFallBackText }: OrganizationListProps) {
  if (organizations.length) {
    return (
      <ul className="flex flex-col gap-2 py-4 pb-6">
        {organizations.map((org, index) => {
          const linkUrl = org.installed
            ? `https://github.com/organizations/${org.login}/settings/installations/${org.id}`
            : `${import.meta.env.VITE_GITHUB_INSTALLATION_URL}/permissions?target_id=${org.id}`;

          return (
            <HorizontalListItemCard
              key={`${org.login}+${index}`}
              avatarUrl={org.avatarUrl ?? ""}
              title={org.name || org.login || ""}
              linkUrl={linkUrl}
              linkIcon={org.installed ? <PencilLine /> : <AddLine />}
              isExternalFlow={org.installed}
            />
          );
        })}
      </ul>
    );
  }

  return <p className="text-center text-gray-500">{emptyListFallBackText}</p>;
}
