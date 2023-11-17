import Card from "src/components/Card";
import { MultiStepsForm } from "src/pages/ProjectCreation/components/MultiStepsForm";
import { useIntl } from "src/hooks/useIntl";
import { useContext } from "react";
import { CreateProjectContext } from "../../ProjectCreation.context";
import OrganizationList from "./components/OrganizationList";
import { useProjectCreationInstalledReposStorage } from "../../hooks/useProjectCreationStorage";

export const GithubOrganizationPage = () => {
  const { T } = useIntl();
  const {
    helpers: { next },
    organizations,
  } = useContext(CreateProjectContext);

  const installedOrganizations = organizations.filter(org => org.installed);
  const availableOrganizations = organizations.filter(org => !org.installed);
  const { getInstalledRepoValue } = useProjectCreationInstalledReposStorage();
  const installatedRepo = getInstalledRepoValue();
  return (
    <MultiStepsForm
      title={T("project.details.create.organizations.title")}
      description={T("project.details.create.organizations.description")}
      step={1}
      stepCount={3}
      next={next}
      nextDisabled={!!organizations.length}
    >
      <Card withBg={false}>
        <h2 className="font-medium uppercase">{T("project.details.create.organizations.installedOrganizations")}</h2>
        <OrganizationList
          installatedRepo={installatedRepo || []}
          organizations={installedOrganizations}
          emptyListFallBackText={T("project.details.create.organizations.installedOrganizationEmpty")}
        />
      </Card>

      <Card withBg={false} className="mt-6">
        <h2 className="font-medium uppercase">{T("project.details.create.organizations.availableOrganizations")}</h2>
        <OrganizationList
          installatedRepo={installatedRepo || []}
          organizations={availableOrganizations}
          emptyListFallBackText={T("project.details.create.organizations.availableOrganizationEmpty")}
        />
      </Card>
    </MultiStepsForm>
  );
};

export default GithubOrganizationPage;
