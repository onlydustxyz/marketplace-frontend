import { useContext } from "react";
import { CreateProjectContext, CreateProjectProvider } from "./ProjectCreation.context";
import {
  useProjectCreationFormStorage,
  useProjectCreationInstalledReposStorage,
  useProjectCreationStepStorage,
} from "./hooks/useProjectCreationStorage";
import { ProjectInformationsPage } from "./views/ProjectInformations/ProjectInformations";
import { ProjectCreationSteps } from "./types/ProjectCreationSteps";
import { GithubRepositoryPage } from "./views/GithubRepository";
import { GithubOrganizationPage } from "./views/GithubOrganizations/GithubOrganizations";
import {
  GITHUB_PERMISSIONS,
  useHasGithubPermissionOrLogin,
} from "src/hooks/useGithubUserPermissions/useGithubUserPermissions";

export const SafeProjectCreation = () => {
  const { currentStep } = useContext(CreateProjectContext);

  const ActiveStep = () => {
    switch (currentStep) {
      case ProjectCreationSteps.INFORMATIONS:
        return <ProjectInformationsPage />;
      case ProjectCreationSteps.REPOSITORIES:
        return <GithubRepositoryPage />;
      default:
        return <GithubOrganizationPage />;
    }
  };

  return ActiveStep();
};

export const ProjectCreation = () => {
  useHasGithubPermissionOrLogin(GITHUB_PERMISSIONS.READ_ORG);

  const formStorage = useProjectCreationFormStorage();
  const stepStorage = useProjectCreationStepStorage();
  const reposStorage = useProjectCreationInstalledReposStorage();

  return (
    <CreateProjectProvider
      initialProject={formStorage.getValue()}
      initialInstalledRepo={reposStorage.getValue()}
      initialStep={stepStorage.getValue()}
      formStorage={formStorage}
      stepStorage={stepStorage}
      reposStorage={reposStorage}
    >
      <SafeProjectCreation />
    </CreateProjectProvider>
  );

  //   TODO LOADING ?
  return null;
};

export default ProjectCreation;
