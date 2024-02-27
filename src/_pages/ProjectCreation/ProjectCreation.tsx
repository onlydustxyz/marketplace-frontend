"use client";

import { useContext } from "react";

import { CreateProjectContext, CreateProjectProvider } from "./ProjectCreation.context";
import {
  useProjectCreationFormStorage,
  useProjectCreationInstalledReposStorage,
  useProjectCreationStepStorage,
} from "./hooks/useProjectCreationStorage";
import { ProjectCreationSteps } from "./types/ProjectCreationSteps";
import { GithubOrganizationPage } from "./views/GithubOrganizations/GithubOrganizations";
import { GithubRepositoryPage } from "./views/GithubRepository";
import { ProjectInformationsPage } from "./views/ProjectInformations/ProjectInformations";

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
};

export default ProjectCreation;
