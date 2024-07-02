import { UseGithubOrganizationsResponse } from "src/api/me/queries";
import HorizontalListItemCard from "src/components/New/Cards/HorizontalListItemCard";
import SkeletonOrganizationList from "src/components/Skeleton/SkeletonOrganizationList";
import AddLine from "src/icons/AddLine";
import PencilLine from "src/icons/PencilLine";
import { getGithubSetupLink } from "src/utils/githubSetupLink";

import { Link } from "components/ds/link/link";
import { Typography } from "components/layout/typography/typography";

interface OrganizationListProps {
  organizations: UseGithubOrganizationsResponse[];
  emptyListFallBackText: string;
  loading?: boolean;
  installatedRepo: number[];
  disabledTooltip?: string;
}

export default function OrganizationList({
  organizations,
  emptyListFallBackText,
  installatedRepo,
  loading,
  disabledTooltip,
}: OrganizationListProps) {
  if (loading || organizations.length) {
    return (
      <ul className="flex flex-col gap-3 py-4 pb-6">
        {organizations.map((org, index) => {
          const linkUrl = getGithubSetupLink({
            id: org.githubUserId,
            login: org.login,
            installationId: org.installationId,
            installed: org.installationStatus !== "NOT_INSTALLED",
            isAPersonalOrganization: org.isPersonal,
          });

          return (
            <HorizontalListItemCard
              disabled={installatedRepo.includes(org.githubUserId) || !org.isCurrentUserAdmin}
              key={`${org.login}+${index}`}
              avatarUrl={org.avatarUrl ?? ""}
              title={org.name || org.login || ""}
              linkUrl={linkUrl}
              linkIcon={org.installationStatus !== "NOT_INSTALLED" ? <PencilLine /> : <AddLine />}
              isExternalFlow={org.installationStatus !== "NOT_INSTALLED"}
              tooltip={disabledTooltip}
              TitleComponent={
                <Link href={org.htmlUrl ?? `https://github.com/${org.login}`}>
                  <Typography variant="body-m">{org.name || org.login}</Typography>
                </Link>
              }
            />
          );
        })}
        {loading ? (
          <>
            <SkeletonOrganizationList />
            <SkeletonOrganizationList />
          </>
        ) : null}
      </ul>
    );
  }

  return <p className="mt-3 text-gray-500">{emptyListFallBackText}</p>;
}
