import { UseOrganizationsByGithubUserIdResponse } from "src/api/Github/queries";
import HorizontalListItemCard from "src/components/New/Cards/HorizontalListItemCard";
import AddLine from "src/icons/AddLine";
import PencilLine from "src/icons/PencilLine";

interface OrganizationListProps {
  organizations: UseOrganizationsByGithubUserIdResponse[];
  emptyListFallBackText: string;
  installatedRepo: number[];
}

export default function OrganizationList({
  organizations,
  emptyListFallBackText,
  installatedRepo,
}: OrganizationListProps) {
  if (organizations.length) {
    return (
      <ul className="flex flex-col gap-2 py-4 pb-6">
        {organizations.map((org, index) => {
          const linkUrl = org.installed
            ? // TODO when org installed is true, use installationId instead of org.id
              `https://github.com/organizations/${org.login}/settings/installations/${org.id}`
            : `${import.meta.env.VITE_GITHUB_INSTALLATION_URL}/permissions?target_id=${org.id}`;

          return (
            <HorizontalListItemCard
              disabled={installatedRepo.includes(org.id)}
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

  return <p className="mt-3 text-gray-500">{emptyListFallBackText}</p>;
}
