import { useContext } from "react";

import { MultiStepsForm } from "src/_pages/ProjectCreation/components/MultiStepsForm";
import Card from "src/components/Card";
import { GithubSyncSettings } from "src/components/New/Ui/GithubSyncSettings";

import { useIntl } from "hooks/translate/use-translate";

import { CreateProjectContext } from "../../ProjectCreation.context";
import OrganizationList from "./components/OrganizationList";

export const GithubOrganizationPage = () => {
  const { T } = useIntl();
  const {
    helpers: { next },
    installedRepos,
    organizations,
    organizationsLoading,
    PoolingFeedback,
  } = useContext(CreateProjectContext);

  const installedOrganizations = organizations.filter(org => org.installationStatus !== "NOT_INSTALLED");
  const availableOrganizations = organizations.filter(
    org => org.installationStatus === "NOT_INSTALLED" && org.isCurrentUserAdmin
  );

  return (
    <MultiStepsForm
      title={T("project.details.create.organizations.title")}
      description={T("project.details.create.organizations.description")}
      step={1}
      stepCount={3}
      next={next}
      nextDisabled={!organizations.length}
    >
      <Card withBg={false}>
        <h2 className="font-medium uppercase">{T("project.details.create.organizations.installedOrganizations")}</h2>
        <OrganizationList
          installatedRepo={installedRepos || []}
          organizations={installedOrganizations}
          emptyListFallBackText={T("project.details.create.organizations.installedOrganizationEmpty")}
          loading={organizationsLoading}
          disabledTooltip={T("project.details.create.organizations.tooltipInstalledByAdmin")}
        />
      </Card>

      <Card withBg={false} className="mt-6">
        <h2 className="font-medium uppercase">{T("project.details.create.organizations.availableOrganizations")}</h2>
        <OrganizationList
          installatedRepo={installedRepos || []}
          organizations={availableOrganizations}
          emptyListFallBackText={T("project.details.create.organizations.availableOrganizationEmpty")}
          loading={organizationsLoading}
        />
      </Card>
      <div className="mt-6">
        <GithubSyncSettings
          title={T("project.details.create.organizations.githubAppInformation.title")}
          showButton={T("project.details.create.organizations.githubAppInformation.showButton")}
          settingsButton={T("project.details.create.organizations.githubAppInformation.button")}
          message={T("project.details.create.organizations.githubAppInformation.description")}
          PoolingFeedback={PoolingFeedback}
        />
      </div>
    </MultiStepsForm>
  );
};

export default GithubOrganizationPage;
