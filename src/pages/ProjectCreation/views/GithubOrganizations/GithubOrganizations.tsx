import Card from "src/components/Card";
import { MultiStepsForm } from "src/pages/ProjectCreation/components/MultiStepsForm";
import { useIntl } from "src/hooks/useIntl";
import { useContext } from "react";
import { CreateProjectContext } from "../../ProjectCreation.context";
import OrganizationList from "./components/OrganizationList";
import { GithubSyncSettings } from "src/components/New/Ui/GithubSyncSettings";

export const GithubOrganizationPage = () => {
  const { T } = useIntl();
  const {
    helpers: { next },
    installedRepos,
    organizations,
    organizationsLoading,
    PoolingFeedback,
  } = useContext(CreateProjectContext);

  const installedOrganizations = organizations.filter(org => org.installed);
  const availableOrganizations = organizations.filter(org => !org.installed);
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
          settingsButton={T("project.details.create.organizations.githubAppInformation.button")}
          message={T("project.details.create.organizations.githubAppInformation.description")}
          PoolingFeedback={PoolingFeedback}
        />
      </div>
    </MultiStepsForm>
  );
};

export default GithubOrganizationPage;
