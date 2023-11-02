import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { components } from "src/__generated/api";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { useRestfulData } from "src/hooks/useRestfulData/useRestfulData";
import { useSessionStorage } from "src/hooks/useSessionStorage/useSessionStorage";

type ExtendedInstallationResponse = components["schemas"]["InstallationResponse"] & {
  organization: {
    installationId: string;
  };
};

function isOrganizationAlreadyExist(organizations: ExtendedInstallationResponse[], newOrganization: ExtendedInstallationResponse) {
  return organizations.some(org => org?.organization?.name === newOrganization?.organization?.name);
}

export default function OrganizationList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const installation_id = searchParams.get("installation_id") ?? "";
  const [savedOrgsData, setSavedOrgsData, savedOrgsDataStatus] = useSessionStorage<ExtendedInstallationResponse[]>(
    "OrganizationsType", []);

  const { data, isLoading, isError } = useRestfulData<ExtendedInstallationResponse>({
    resourcePath: ApiResourcePaths.GET_INSTALLED_GITHUB_ORGANIZATION,
    pathParam: installation_id,
    method: "GET",
    enabled: !!installation_id,
    retry: 1,
  });

  useEffect(() => {
    if (data && savedOrgsDataStatus === "getted" && !isOrganizationAlreadyExist(savedOrgsData, data)) {
      const newData: ExtendedInstallationResponse = {
        ...data,
        organization: {
          ...data.organization,
          installationId: installation_id,
        },
      };
      setSavedOrgsData([...savedOrgsData, newData]);
    }
  }, [data, savedOrgsDataStatus]);

  if (!installation_id) {
    return <div>Installation id is missing</div>;
  }

  if (isLoading) {
    // TODO Replace with skeleton component
    return <div>Loading ...</div>;
  }

  if (isError) {
    // TODO Replace with error component
    return <div>Something went wrong!</div>;
  }

  return (
    <div>
      <h2>
        INSTALLED ON {savedOrgsData?.length} ORGANANISATION{savedOrgsData?.length > 1 ? "S" : ""} :
      </h2>
      <ul className="flex flex-col gap-2 py-4 pb-6">
        {savedOrgsData?.map((installation: components["schemas"]["InstallationResponse"], index: number) => (
          <div key={index} className="flex items-center gap-3 ">
            <RoundedImage
              src={installation?.organization?.logoUrl ?? ""}
              alt={installation?.organization?.name ?? ""}
              rounding={Rounding.Corners}
              size={ImageSize.Md}
            />
            <li key={index}>{installation?.organization?.name}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}