import { useEffect } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { components } from "src/__generated/api";
import { useOrganizationSession } from "src/pages/ProjectCreation/commons/hooks/useProjectCreationSession";
import { OutletContext } from "src/pages/ProjectDetails/View";
import { OrganizationSessionStorageInterface } from "src/types";

function transformOrganizations(
  orgs: components["schemas"]["ProjectGithubOrganizationResponse"][]
): OrganizationSessionStorageInterface[] {
  return orgs.map(org => ({
    organization: {
      name: org.name ?? "",
      logoUrl: org.avatarUrl ?? "", // TODO ask backend for consistent naming
      installationId: org.id?.toString() ?? "", // TODO ask backend to add installationId
    },
    repos:
      org.repos?.map(repo => ({
        name: repo.name ?? "",
        shortDescription: repo.description ?? "", // TODO ask backend for consistent naming
        githubId: repo.id ?? 0, // TODO ask backend for consistent naming
      })) ?? [],
  }));
}

export const EditPanelOrganization = () => {
  const [searchParams] = useSearchParams();
  const installation_id = searchParams.get("installation_id") ?? "";
  const { project } = useOutletContext<OutletContext>();
  const {
    storedValue: savedOrgsData,
    setValue: setSavedOrgsData,
    status: savedOrgsDataStatus,
  } = useOrganizationSession();

  useEffect(() => {
    if (!installation_id && project && savedOrgsDataStatus === "ready") {
      setSavedOrgsData(transformOrganizations(project?.organizations ?? []));
    }
  }, [project, savedOrgsDataStatus]);

  return <div>edit panel organization</div>;
};
