import { useContext } from "react";

import { EditContext } from "src/_pages/ProjectDetails/ProjectEdition/EditContext";
import { UseGithubOrganizationsResponse } from "src/api/me/queries";
import HorizontalListItemCard from "src/components/New/Cards/HorizontalListItemCard";
import AddLine from "src/icons/AddLine";
import PencilLine from "src/icons/PencilLine";
import { getGithubSetupLink } from "src/utils/githubSetupLink";

import { Link } from "components/ds/link/link";
import { Typography } from "components/layout/typography/typography";

interface OrganizationListProps {
  organizations: UseGithubOrganizationsResponse[];
  emptyListFallBackText: string;
  disabledTooltip?: string;
}

export default function OrganizationList({
  organizations,
  emptyListFallBackText,
  disabledTooltip,
}: OrganizationListProps) {
  const {
    githubWorklow: { run },
    project,
  } = useContext(EditContext);

  if (organizations.length) {
    return (
      <ul className="flex flex-col gap-2 py-4 pb-6">
        {organizations.map((org, index) => {
          const linkUrl = getGithubSetupLink({
            id: org.githubUserId,
            login: org.login,
            installationId: org.installationId,
            installed: org.installationStatus !== "NOT_INSTALLED",
            isAPersonalOrganization: org.isPersonal,
            projectSlug: project?.slug,
          });

          const titleComponentArg = org.htmlUrl
            ? {
                TitleComponent: (
                  <Link href={org.htmlUrl}>
                    <Typography variant="body-m">{org.name || org.login}</Typography>
                  </Link>
                ),
              }
            : {};

          return (
            <HorizontalListItemCard
              key={`${org.login}+${index}`}
              avatarUrl={org.avatarUrl ?? ""}
              title={org.name || org.login || ""}
              linkUrl={linkUrl}
              linkClick={run}
              linkIcon={org.installationStatus !== "NOT_INSTALLED" ? <PencilLine /> : <AddLine />}
              isExternalFlow={org.installationStatus !== "NOT_INSTALLED"}
              disabled={!org.isCurrentUserAdmin}
              tooltip={disabledTooltip}
              {...titleComponentArg}
            />
          );
        })}
      </ul>
    );
  }

  return <p className="mt-3 text-gray-500">{emptyListFallBackText}</p>;
}
