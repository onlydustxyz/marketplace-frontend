import Lightbulb from "src/assets/icons/Lightbulb";
import { IMAGES } from "src/assets/img";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import Button, { ButtonSize } from "src/components/Button";
import Card from "src/components/Card";
import GithubLogo from "src/icons/GithubLogo";
import { useContext, useEffect, useMemo } from "react";
import { useResetSession } from "./commons/hooks/useProjectCreationSession";
import { useIntl } from "src/hooks/useIntl";
import { CreateProjectContext, CreateProjectProvider } from "./CreateContext";
import {
  useProjectCreationFormStorage,
  useProjectCreationStepStorage,
} from "./commons/hooks/useProjectCreationStorage";
import { ProjectInformationsPage } from "./pages/ProjectInformations";
import { ProjectCreationSteps } from "./commons/types/ProjectCreationSteps";
import { GithubRepositoryPage } from "./pages/GithubRepository";
import { GithubOrganizationPage } from "./pages/GithubOrganizations";

export const SafeProjectCreationOld = () => {
  const { T } = useIntl();
  const { reset } = useResetSession();

  useEffect(() => {
    reset();
  }, []);

  return (
    <Background roundedBorders={BackgroundRoundedBorders.Full} className="flex justify-center">
      <div className="flex h-full items-center justify-center">
        <Card
          fullWidth={true}
          padded={false}
          className="relative flex w-full max-w-[688px] flex-col items-center p-12 pt-[72px]"
        >
          <div className="absolute top-0 -translate-y-1/2">
            <img src={IMAGES.gradient.compass} className="h-[72px] w-[72px]"></img>
          </div>
          <div className="flex flex-col items-center gap-12">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm font-medium uppercase text-spaceBlue-200">
                  {T("project.details.create.intro.upperTitle")}
                </span>
                <div className="text-center font-belwe text-3xl font-normal text-greyscale-50">
                  {T("project.details.create.intro.title")}
                </div>
              </div>
              <p className="whitespace-pre-line text-center text-greyscale-50">
                {T("project.details.create.intro.description")}
              </p>
            </div>
            <div className="flex flex-col items-center gap-6">
              <a href={import.meta.env.VITE_GITHUB_INSTALLATION_URL}>
                <Button size={ButtonSize.Lg}>
                  <GithubLogo className="h-6 w-6" />
                  {T("project.details.create.intro.button")}
                </Button>
              </a>
              <div
                id="onboarding-skip"
                className="flex items-center gap-2 align-baseline font-medium text-spaceBlue-200"
              >
                <Lightbulb className="h-6 w-6 fill-spaceBlue-200" />
                <span>{T("project.details.create.intro.disclaimer")}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Background>
  );
};

export const SafeProjectCreation = () => {
  const { T } = useIntl();
  const { reset } = useResetSession();
  const { currentStep } = useContext(CreateProjectContext);

  useEffect(() => {
    reset();
  }, []);

  const ActiveStep = useMemo(() => {
    switch (currentStep) {
      case ProjectCreationSteps.INFORMATIONS:
        return <ProjectInformationsPage />;
      case ProjectCreationSteps.REPOSITORIES:
        return <GithubRepositoryPage />;
      default:
        return <GithubOrganizationPage />;
    }
  }, [currentStep]);

  return ActiveStep;
};

export const ProjectCreation = () => {
  const { storedFormStatus, storedFormValue, saveFormData, removeFormValue } = useProjectCreationFormStorage();
  const { storedStepValue, storedStepStatus, saveStep, removeStepValue } = useProjectCreationStepStorage();
  //   const { reset } = useResetSession();

  //   useEffect(() => {
  //     reset();
  //   }, []);

  if (storedFormStatus === "ready" && storedStepStatus === "ready") {
    return (
      <CreateProjectProvider
        initialProject={storedFormValue}
        initialStep={storedStepValue}
        formStorage={{ setValue: saveFormData, removeValue: removeFormValue }}
        stepStorage={{ setValue: saveStep, removeValue: removeStepValue }}
      >
        <SafeProjectCreation />
      </CreateProjectProvider>
    );
  }

  //   TODO LOADING ?
  return null;
};

export default ProjectCreation;
