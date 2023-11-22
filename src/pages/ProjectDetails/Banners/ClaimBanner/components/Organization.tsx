import { useMemo } from "react";
import { components } from "src/__generated/api";
import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import { UseGithubOrganizationsResponse } from "src/api/me/queries";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { Avatar } from "src/components/New/Avatar";
import { useIntl } from "src/hooks/useIntl";
import CheckLine from "src/icons/CheckLine";
import GithubLogo from "src/icons/GithubLogo";
import { getGithubSetupLink } from "src/utils/githubSetupLink";

export interface ClaimBannerOrganizationProps {
  project: UseGetProjectBySlugResponse;
  organization: components["schemas"]["GithubOrganizationResponse"];
  myOrganizations: UseGithubOrganizationsResponse[];
}
export default function ClaimBannerOrganization({
  organization,
  myOrganizations,
  project,
}: ClaimBannerOrganizationProps) {
  const { T } = useIntl();
  const myOrganization = useMemo(
    () => myOrganizations.find(org => org.id === organization.id && org.isCurrentUserAdmin),
    [myOrganizations, organization]
  );

  const githubLink = getGithubSetupLink({
    id: organization.id,
    login: organization.login,
    installationId: organization.installationId,
    installed: organization.installed,
    isAPersonalOrganization: organization.isPersonal,
    projectSlug: project?.slug,
    isClaim: true,
  });

  return (
    <div className="w-full rounded-2xl border border-card-border-light bg-card-background-light p-4 shadow-light">
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex flex-row items-center justify-start gap-2">
          <Avatar src={organization.avatarUrl} alt={organization.name} size="6" shape="square" />
          <p className="text-body-m">{organization.name || organization.login}</p>
        </div>
        <div>
          {myOrganization && !organization.installed ? (
            <a href={githubLink}>
              <Button type={ButtonType.Primary} size={ButtonSize.Sm}>
                <GithubLogo />
                {T("project.claim.panel.grantButton")}
              </Button>
            </a>
          ) : null}
          {myOrganization && organization.installed ? (
            <CheckLine className=" text-base leading-6 text-spacePurple-500" />
          ) : null}
        </div>
      </div>
    </div>
  );
}
