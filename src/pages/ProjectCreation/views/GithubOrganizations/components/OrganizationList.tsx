import { UseGithubOrganizationsResponse } from "src/api/me/queries";
import HorizontalListItemCard from "src/components/New/Cards/HorizontalListItemCard";
import { useIntl } from "src/hooks/useIntl";
import AddLine from "src/icons/AddLine";
import PencilLine from "src/icons/PencilLine";
import { getGithubAppLinkUrl } from "src/utils/github";

interface OrganizationListProps {
  organizations: UseGithubOrganizationsResponse[];
  emptyListFallBackText: string;
  installatedRepo: number[];
}

export default function OrganizationList({
  organizations,
  emptyListFallBackText,
  installatedRepo,
}: OrganizationListProps) {
  const { T } = useIntl();

  if (organizations.length) {
    return (
      <ul className="flex flex-col gap-2 py-4 pb-6">
        {organizations.map((org, index) => {
          return (
            <HorizontalListItemCard
              disabled={installatedRepo.includes(org.id)}
              key={`${org.login}+${index}`}
              avatarUrl={org.avatarUrl ?? ""}
              title={org.name || org.login || ""}
              linkUrl={getGithubAppLinkUrl(org)}
              linkIcon={org.installed ? <PencilLine /> : <AddLine />}
              isExternalFlow={org.installed}
              tooltip={T("project.details.create.organizations.tooltip")}
            />
          );
        })}
      </ul>
    );
  }

  return <p className="mt-3 text-gray-500">{emptyListFallBackText}</p>;
}
