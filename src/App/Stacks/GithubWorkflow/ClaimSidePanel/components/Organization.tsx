import { useMemo } from "react";

import { useStackGithubWorkflowTutorial } from "src/App/Stacks/Stacks";
import { components } from "src/__generated/api";
import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import { UseGithubOrganizationsResponse } from "src/api/me/queries";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { Avatar } from "src/components/New/Avatar";
import CheckLine from "src/icons/CheckLine";
import GithubLogo from "src/icons/GithubLogo";
import { getGithubSetupLink } from "src/utils/githubSetupLink";

import { useIntl } from "hooks/translate/use-translate";

export interface ClaimBannerOrganizationProps {
  project: UseGetProjectBySlugResponse;
  organization: components["schemas"]["GithubOrganizationResponse"];
  myOrganizations: UseGithubOrganizationsResponse[];
}

enum organizationStatusEnum {
  installed = "installed",
  shouldGrant = "shouldGrant",
  shouldInstall = "shouldInstall",
}

export default function ClaimBannerOrganization({
  organization,
  myOrganizations,
  project,
}: ClaimBannerOrganizationProps) {
  const { T } = useIntl();
  const [openTutorial] = useStackGithubWorkflowTutorial();
  const myOrganization = useMemo(
    () => myOrganizations.find(org => org.githubUserId === organization.githubUserId),
    [myOrganizations, organization]
  );

  const organizationInstalled = organization.installationStatus !== "NOT_INSTALLED";
  const myOrganizationInstalled = myOrganization?.installationStatus !== "NOT_INSTALLED";

  const githubLink = getGithubSetupLink({
    id: organization.githubUserId,
    login: organization.login,
    installationId: organization.installationId,
    installed: organizationInstalled,
    isAPersonalOrganization: organization.isPersonal,
    projectSlug: project?.slug,
    isClaim: true,
  });

  const organizationStatus: organizationStatusEnum = useMemo(() => {
    if (myOrganization && !organizationInstalled && !myOrganizationInstalled && myOrganization.isCurrentUserAdmin) {
      return organizationStatusEnum.shouldInstall;
    }

    if (myOrganization && !organizationInstalled && !myOrganizationInstalled && !myOrganization.isCurrentUserAdmin) {
      return organizationStatusEnum.shouldGrant;
    }

    if (!myOrganization) {
      return organizationStatusEnum.shouldGrant;
    }

    return organizationStatusEnum.installed;
  }, [myOrganization, organization]);

  return (
    <div className="w-full rounded-2xl border border-card-border-light bg-card-background-light p-4 shadow-light">
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex flex-row items-center justify-start gap-2">
          <Avatar src={organization.avatarUrl} alt={organization.name} size="6" shape="square" />
          <p className="text-body-m">{organization.name || organization.login}</p>
        </div>
        <div>
          {organizationStatus === organizationStatusEnum.shouldInstall ? (
            <a href={githubLink}>
              <Button type={ButtonType.Primary} size={ButtonSize.Sm}>
                <GithubLogo />
                {T("project.claim.panel.installButton")}
              </Button>
            </a>
          ) : null}

          {organizationStatus === organizationStatusEnum.shouldGrant ? (
            <Button
              type={ButtonType.Secondary}
              size={ButtonSize.Sm}
              onClick={() => openTutorial({ projectSlug: project.slug })}
            >
              <GithubLogo />
              {T("project.claim.panel.grantButton")}
            </Button>
          ) : null}
          {organizationStatus === organizationStatusEnum.installed ? (
            <CheckLine className=" text-base leading-6 text-spacePurple-500" />
          ) : null}
        </div>
      </div>
    </div>
  );
}
