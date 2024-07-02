import { useContext } from "react";

import Card from "src/components/Card";
import { GithubSyncSettings } from "src/components/New/Ui/GithubSyncSettings";

import { useIntl } from "hooks/translate/use-translate";

import { EditContext } from "../../../EditContext";
import OrganizationList from "./components/OrganizationList";

export const EditPanelOrganization = () => {
  const { T } = useIntl();

  const { organizations, PoolingFeedback } = useContext(EditContext);

  const installedOrganizations = organizations.filter(org => org.installationStatus !== "NOT_INSTALLED");
  const availableOrganizations = organizations.filter(
    org => org.installationStatus === "NOT_INSTALLED" && org.isCurrentUserAdmin
  );

  return (
    <>
      <div className="flex flex-col gap-6">
        <div>
          <div className="text-title-s pb-2 font-normal text-greyscale-50">
            {T("project.details.create.organizations.title")}
          </div>
          <div className="text-body-s font-walsheim font-normal text-spaceBlue-100">
            {T("project.details.create.organizations.description")}
          </div>
        </div>
        <Card withBg={false}>
          <h2 className="font-medium uppercase">{T("project.details.create.organizations.installedOrganizations")}</h2>
          <OrganizationList
            organizations={installedOrganizations}
            emptyListFallBackText={T("project.details.create.organizations.installedOrganizationEmpty")}
            disabledTooltip={T("project.details.create.organizations.tooltipInstalledByAdmin")}
          />
        </Card>

        <Card withBg={false} className="mt-6">
          <h2 className="font-medium uppercase">{T("project.details.create.organizations.availableOrganizations")}</h2>
          <OrganizationList
            organizations={availableOrganizations}
            emptyListFallBackText={T("project.details.create.organizations.availableOrganizationEmpty")}
          />
        </Card>
      </div>
      <div className="mt-6">
        <GithubSyncSettings
          title={T("project.details.create.organizations.githubAppInformation.title")}
          settingsButton={T("project.details.create.organizations.githubAppInformation.button")}
          message={T("project.details.create.organizations.githubAppInformation.description")}
          showButton={T("project.details.create.organizations.githubAppInformation.showButton")}
          PoolingFeedback={PoolingFeedback}
        />
      </div>
    </>
  );
};
