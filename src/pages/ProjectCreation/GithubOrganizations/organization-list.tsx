import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { components } from "src/__generated/api";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";
import { useRestfulData } from "src/hooks/useRestfulData/useRestfulData";
import { useSessionStorage } from "src/hooks/useSessionStorage/useSessionStorage";

function isOrganizationExist(organizations: components["schemas"]["InstallationResponse"][], newOrganization: components["schemas"]["InstallationResponse"]) {
  return organizations.some(org => org?.organization?.name === newOrganization?.organization?.name);
}

export default function OrganizationList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const installation_id = searchParams.get("installation_id") ?? "";
  const [savedOrgsData, setSavedOrgsData, savedOrgsDataStatus] = useSessionStorage<components["schemas"]["InstallationResponse"][]>(
    "OrganizationsType",
    JSON.parse(sessionStorage.getItem("OrganizationsType") || "[]")
  );

  const { data } = useRestfulData<components["schemas"]["InstallationResponse"]>({
    resourcePath: ApiResourcePaths.GET_INSTALLED_GITHUB_ORGANIZATION,
    pathParam: installation_id,
    method: "GET",
    enabled: !!installation_id,
    retry: 1,
  });

  useEffect(() => {
    if (data && !isOrganizationExist(savedOrgsData, data)) {
      setSavedOrgsData([...savedOrgsData, data]);
    }
  }, [data]);

  console.log("savedOrgsData", savedOrgsData);

  return (
    <div>
      <h2>
        INSTALLED ON {savedOrgsData?.length} ORGANANISATION{savedOrgsData?.length > 1 ? "S" : ""} :
      </h2>
    </div>
  );
}

//   if (!installation_id) {
//     return <div>Installation id is missing</div>;
//   }

//   const { data, isLoading, isError } = useRestfulData({
//     resourcePath: ApiResourcePaths.GET_INSTALLED_GITHUB_ORGANIZATION,
//     pathParam: installation_id,
//     method: "GET",
//   });

//   if (isLoading) {
//     // TODO Replace with skeleton component
//     return <div>Loading ...</div>;
//   }

//   if (isError) {
//     // TODO Replace with error component
//     return <div>Something went wrong!</div>;
//   }

{
  /* <ul className="flex flex-col gap-2 py-4 pb-6">
        {data?.map((repo: any, index: number) => (
          <div key={index} className="flex items-center gap-3">
            <RoundedImage
              src={repo?.organization.logoUrl}
              alt={repo?.organization.name}
              rounding={Rounding.Corners}
              size={ImageSize.Md}
            />
            <li key={index}>{repo?.organization.name}</li>
          </div>
        ))}
      </ul> */
}

// http://localhost:5173/p/create/organizations?installation_id=43267209&setup_action=install
