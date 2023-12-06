import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import { UseGithubOrganizationsResponse } from "src/api/me/queries";

export namespace ClaimUtils {
  export const canDisplay = ({ project }: { project?: UseGetProjectBySlugResponse }) => {
    if (project && project.leaders.length === 0 && project.invitedLeaders.length === 0) {
      return true;
    }

    return false;
  };

  export const canSubmit = ({
    project,
    organizations,
  }: {
    project?: UseGetProjectBySlugResponse;
    organizations?: UseGithubOrganizationsResponse[];
  }) => {
    if (!canDisplay({ project })) {
      return false;
    }

    const isAllOrganizationInstalled = project?.organizations?.every(org => {
      if (org.installed) {
        return true;
      }

      return !!organizations?.find(myOrg => myOrg.githubUserId === org.githubUserId && myOrg.installed);
    });

    return isAllOrganizationInstalled || false;
  };
}
