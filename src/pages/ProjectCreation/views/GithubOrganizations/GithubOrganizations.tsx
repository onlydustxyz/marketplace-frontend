import Card from "src/components/Card";
import { MultiStepsForm } from "src/pages/ProjectCreation/components/MultiStepsForm";
import { useIntl } from "src/hooks/useIntl";
import { useContext } from "react";
import { CreateProjectContext } from "../../ProjectCreation.context";
import OrganizationList from "./components/OrganizationList";
import GithubLogo from "src/icons/GithubLogo";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { OAuthGithubConfigLink } from "src/utils/githubSetupLink";
import InformationLine from "src/icons/InformationLine";

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
      <div className="card-light mt-8 flex w-full flex-col items-start justify-start gap-6 rounded-2xl border bg-transparent p-5">
        <p className="text-center font-walsheim text-sm font-medium uppercase">
          {T("project.details.create.organizations.githubAppInformation.title")}
        </p>
        <div className="center flex w-full items-center gap-5">
          <a href={OAuthGithubConfigLink} target="_blank" rel="noopener noreferrer" className="w-full">
            <Button type={ButtonType.Secondary} size={ButtonSize.Sm} className="w-full">
              <GithubLogo />
              {T("project.details.create.organizations.githubAppInformation.button")}
            </Button>
          </a>
          {PoolingFeedback}
        </div>
        <div className="flex flex-row items-start justify-start gap-2">
          <InformationLine className="text-base leading-4 text-spaceBlue-200" />
          <p className="text-body-s font-walsheim font-normal text-spaceBlue-200">
            {T("project.details.create.organizations.githubAppInformation.description")}
          </p>
        </div>
      </div>
    </MultiStepsForm>
  );
};

export default GithubOrganizationPage;
