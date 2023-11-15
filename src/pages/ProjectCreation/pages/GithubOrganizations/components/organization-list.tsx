import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import GithubApi from "src/api/Github";
import { useInstallationByIdResponse } from "src/api/Github/queries";
import { useIntl } from "src/hooks/useIntl";
import { useOrganizationSession } from "../../../commons/hooks/useProjectCreationSession";
import Skeleton from "src/components/Skeleton";
import HorizontalListItemCard from "src/components/New/Cards/HorizontalListItemCard";
import { OrganizationSessionStorageInterface } from "src/types";

function isOrganizationAlreadyExist(
  organizations: OrganizationSessionStorageInterface[],
  newOrganization: useInstallationByIdResponse
) {
  return organizations.some(org => org?.organization?.login === newOrganization?.organization?.login);
}

export default function OrganizationList({ setIsValid }: { setIsValid: (isValid: boolean) => void }) {
  const { T } = useIntl();
  const [searchParams] = useSearchParams();
  const installation_id = searchParams.get("installation_id") ?? "";
  const navigate = useNavigate();
  const {
    storedValue: savedOrgsData,
    setValue: setSavedOrgsData,
    status: savedOrgsDataStatus,
  } = useOrganizationSession();

  const { data, isLoading, isError } = GithubApi.queries.useInstallationById({
    params: { installation_id },
    options: { retry: 1, enabled: !!installation_id },
  });

  useEffect(() => {
    if (data && savedOrgsDataStatus === "ready" && !isOrganizationAlreadyExist(savedOrgsData, data)) {
      console.log("data", data);
      const newData: OrganizationSessionStorageInterface = {
        ...data,
        organization: {
          ...data.organization,
          installationId: data.id,
        },
      };
      setSavedOrgsData([...savedOrgsData, newData]);
    }
  }, [data, savedOrgsDataStatus]);

  useEffect(() => {
    setIsValid(savedOrgsData.length > 0);
  }, [savedOrgsData]);

  useEffect(() => {
    if (!installation_id && savedOrgsDataStatus === "ready" && savedOrgsData.length === 0) {
      navigate("../");
    }
  }, [installation_id, savedOrgsDataStatus]);

  if (isLoading) {
    return <Skeleton variant="organizationItem" />;
  }

  if (isError) {
    // TODO Replace with error component
    return <div>Something went wrong!</div>;
  }

  return (
    <div>
      <h2 className="font-medium uppercase">
        {T("project.details.create.organizations.installedOn", { count: savedOrgsData?.length })}
      </h2>
      <ul className="flex flex-col gap-2 py-4 pb-6">
        {savedOrgsData?.map((installation: OrganizationSessionStorageInterface, index: number) => (
          <HorizontalListItemCard
            key={`${installation?.organization?.login}+${index}`}
            avatarUrl={installation?.organization?.avatarUrl ?? ""}
            title={installation?.organization?.name || installation?.organization?.login || ""}
            linkUrl={`https://github.com/organizations/${installation?.organization?.login}/settings/installations/${installation?.organization?.installationId}`}
          />
        ))}
      </ul>
    </div>
  );
}
