import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import GithubApi from "src/api/Github";
import { useInstallationByIdResponse } from "src/api/Github/queries";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import Card from "src/components/Card";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import { useIntl } from "src/hooks/useIntl";
import PencilLine from "src/icons/PencilLine";
import {
  OrganizationSessionStorageInterface,
  useOrganizationSession,
} from "../../../commons/hooks/useProjectCreationSession";

function isOrganizationAlreadyExist(
  organizations: OrganizationSessionStorageInterface[],
  newOrganization: useInstallationByIdResponse
) {
  return organizations.some(org => org?.organization?.name === newOrganization?.organization?.name);
}

export default function OrganizationList() {
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
    params: { installation_id: installation_id },
  });

  useEffect(() => {
    if (data && savedOrgsDataStatus === "getted" && !isOrganizationAlreadyExist(savedOrgsData, data)) {
      const newData: OrganizationSessionStorageInterface = {
        ...data,
        organization: {
          ...data.organization,
          installationId: installation_id,
        },
      };
      setSavedOrgsData([...savedOrgsData, newData]);
    }
  }, [data, savedOrgsDataStatus]);

  useEffect(() => {
    if (!installation_id && savedOrgsDataStatus === "getted" && savedOrgsData.length === 0) {
      navigate("../");
    }
  }, [installation_id, savedOrgsDataStatus]);

  // if (!installation_id) {
  //   return <div>Installation id is missing</div>;
  // }

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
      <h2 className="font-medium uppercase">
        {T("project.details.create.organizations.installedOn", { count: savedOrgsData?.length })}
      </h2>
      <ul className="flex flex-col gap-2 py-4 pb-6">
        {savedOrgsData?.map((installation: OrganizationSessionStorageInterface, index: number) => (
          <Card className="shadow-medium" key={installation?.organization?.name}>
            <div key={index} className="flex items-center gap-3 ">
              <RoundedImage
                src={installation?.organization?.logoUrl ?? ""}
                alt={installation?.organization?.name ?? ""}
                rounding={Rounding.Corners}
                size={ImageSize.Md}
              />
              <li key={index} className="flex-1">
                {installation?.organization?.name}
              </li>
              <a
                href={`https://github.com/organizations/${installation?.organization?.name}
                        /settings/installations/${installation?.organization?.installationId}`}
                target="blank"
              >
                <Button
                  size={ButtonSize.Sm}
                  type={ButtonType.Secondary}
                  iconOnly
                  data-testid="close-add-work-item-panel-btn"
                >
                  <PencilLine />
                </Button>
              </a>
            </div>
          </Card>
        ))}
      </ul>
    </div>
  );
}
