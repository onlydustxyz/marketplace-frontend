import Card from "src/components/Card";
import { MultiStepsForm } from "src/pages/ProjectCreation/components/MultiStepsForm";
import { useIntl } from "src/hooks/useIntl";
import { useContext } from "react";
import { CreateProjectContext } from "../../ProjectCreation.context";
import OrganizationList from "./components/OrganizationList";
import GithubLogo from "src/icons/GithubLogo";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { OAuthGithubConfigLink } from "src/utils/githubSetupLink";

export const GithubOrganizationPage = () => {
  const { T } = useIntl();
  const {
    helpers: { next },
    installedRepos,
    organizations,
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
        />
      </Card>

      <Card withBg={false} className="mt-6">
        <h2 className="font-medium uppercase">{T("project.details.create.organizations.availableOrganizations")}</h2>
        <OrganizationList
          installatedRepo={installedRepos || []}
          organizations={availableOrganizations}
          emptyListFallBackText={T("project.details.create.organizations.availableOrganizationEmpty")}
        />
      </Card>
      <div className="card-light mt-6 flex w-full flex-col items-center justify-start gap-6 rounded-2xl border p-4">
        <div className="flex flex-row items-center justify-center gap-0.5">
          <p className="mt-3 text-center text-gray-500">
            {T("project.details.create.organizations.githubAppInformation.title")}
          </p>
        </div>
        <a href={OAuthGithubConfigLink} target="_blank" rel="noopener noreferrer">
          <Button type={ButtonType.Secondary} size={ButtonSize.Sm}>
            <GithubLogo />
            {T("project.details.create.organizations.githubAppInformation.button")}
          </Button>
        </a>
      </div>
    </MultiStepsForm>
  );
};

export default GithubOrganizationPage;
