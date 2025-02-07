import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import { UseGithubOrganizationsResponse } from "src/api/me/queries";

export namespace ClaimUtils {
  export const canDisplay = () => {
    return false;
  };

  export const canSubmit = ({
    project,
    organizations,
  }: {
    project?: UseGetProjectBySlugResponse;
    organizations?: UseGithubOrganizationsResponse[];
  }) => {
    if (!organizations) {
      return false;
    }

    const isAllOrganizationInstalled = project?.organizations?.every(org => {
      return !!(
        org.installationStatus !== "NOT_INSTALLED" &&
        organizations?.find(
          myOrg => myOrg.githubUserId === org.githubUserId && myOrg.installationStatus !== "NOT_INSTALLED"
        )
      );
    });

    return isAllOrganizationInstalled || false;
  };
}
