import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { components } from "src/__generated/api";
import { useOrganizationSession } from "src/pages/ProjectCreation/commons/hooks/useProjectCreationSession";
import { OrganizationSessionStorageInterface } from "src/types";
import { useIntl } from "src/hooks/useIntl";
import HorizontalListItemCard from "src/components/New/Cards/HorizontalListItemCard";
import { EditContext } from "../../../EditContext";

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
  const { T } = useIntl();
  const [searchParams] = useSearchParams();
  const installation_id = searchParams.get("installation_id") ?? "";
  const { form, project } = useContext(EditContext); 
  const organizations = form?.watch("organizations");

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

  console.log("organizations", organizations);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="pb-2 font-belwe text-2xl font-normal text-greyscale-50">
          {T("project.details.create.organizations.title")}
        </div>
        <div className="font-walsheim text-base font-normal text-spaceBlue-100">
          {T("project.details.create.organizations.description")}
        </div>
      </div>
      <ul className="flex flex-col gap-2 py-4 pb-6">
        {savedOrgsData?.map((installation: OrganizationSessionStorageInterface, index: number) => (
          <HorizontalListItemCard
            key={`${installation?.organization?.name}+${index}`}
            imageUrl={installation?.organization?.logoUrl ?? ""}
            title={installation?.organization?.name ?? ""}
            linkUrl={`https://github.com/organizations/${installation?.organization?.name}/settings/installations/${installation?.organization?.installationId}`}
          />
        ))}
      </ul>
    </div>
  );
};
