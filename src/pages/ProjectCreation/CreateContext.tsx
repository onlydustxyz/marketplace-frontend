import { createContext, useCallback, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { useIntl } from "src/hooks/useIntl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateFormData, CreateFormDataRepos } from "./commons/types/ProjectCreationType";
import { useResetSession } from "./commons/hooks/useProjectCreationSession";
import {
  ProjectCreationSteps,
  ProjectCreationStepsNext,
  ProjectCreationStepsPrev,
} from "./commons/types/ProjectCreationSteps";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import Button, { ButtonSize } from "src/components/Button";

interface CreateContextProps {
  initialProject: CreateFormData | undefined;
  initialStep: ProjectCreationSteps | undefined;
  children: React.ReactNode;
  formStorage: {
    setValue: (values: CreateFormData) => void;
    removeValue: () => void;
  };
  stepStorage: {
    setValue: (values: ProjectCreationSteps) => void;
    removeValue: () => void;
  };
}

type CreateProject = {
  form: UseFormReturn<CreateFormData, unknown>;
  currentStep: ProjectCreationSteps;
  formFn: {
    addRepository: (data: CreateFormDataRepos) => void;
    removeRepository: (data: CreateFormDataRepos) => void;
  };
  helpers: {
    saveInSession: () => void;
    goTo: (step: ProjectCreationSteps) => void;
    next: () => void;
    prev: () => void;
  };
};

export const CreateProjectContext = createContext<CreateProject>({
  form: {} as UseFormReturn<CreateFormData, unknown>,
  currentStep: ProjectCreationSteps.ORGANIZATIONS,
  helpers: {
    saveInSession: () => null,
    goTo: () => null,
    next: () => null,
    prev: () => null,
  },
  formFn: {
    addRepository: () => null,
    removeRepository: () => null,
  },
});

const validationSchema = z.object({
  logoUrl: z.string().optional(),
  inviteGithubUserIdsAsProjectLeads: z.array(z.number()).optional(),
  isLookingForContributors: z.boolean().nullish().optional(),
  longDescription: z.string().min(1),
  moreInfo: z.object({
    url: z.string().min(1),
    value: z.string().min(1),
  }),

  name: z.string().min(1),
  shortDescription: z.string().min(1),
});

export function CreateProjectProvider({ children, initialProject, formStorage, stepStorage }: CreateContextProps) {
  const { T } = useIntl();
  const [currentStep, setCurrentStep] = useState<ProjectCreationSteps>(ProjectCreationSteps.ORGANIZATIONS);
  const { reset: clearSession } = useResetSession();
  const form = useForm<CreateFormData>({
    mode: "all",
    defaultValues: initialProject || {},
    resolver: zodResolver(validationSchema),
  });

  const onSaveInSession = () => {
    formStorage.setValue(form.getValues());
  };

  const onSubmit = (formData: CreateFormData) => {
    // updateProject(formData);
    // TODO CREATE PROJECT
    form.reset(formData);
  };

  /* -- TODO : SYNC ORGANIZATION (check selected repo and remove or add orga -- */

  /* ----------------------------- TODO : ADD / REMOVE REPO ---------------------------- */

  const isOrgsExist = (orgId: string) => {
    // TODO to implement
    return true;
  };
  const addRepository = (data: CreateFormDataRepos) => {
    const formValues = form.getValues();
    const repos = [...(formValues.selectedRepos || [])];

    // add check on org ID
    if (isOrgsExist(data.orgId)) {
      const findRepo = repos.find(repo => repo.repoId === data.repoId);
      if (!findRepo) {
        repos.push(data);
        form.setValue("selectedRepos", repos);
      }
    }
  };

  const removeRepository = (data: CreateFormDataRepos) => {
    const formValues = form.getValues();
    const repos = [...(formValues.selectedRepos || [])];

    if (isOrgsExist(data.orgId)) {
      const findRepoIndex = repos.findIndex(repo => repo.repoId === data.repoId);
      if (findRepoIndex !== -1) {
        repos.splice(findRepoIndex, 1);
        form.setValue("selectedRepos", repos);
      }
    }
  };

  /* ----------------------------- TODO : ROUTING ---------------------------- */

  const goTo = useCallback(
    (step: ProjectCreationSteps) => {
      stepStorage.setValue(step);
      setCurrentStep(step);
    },
    [currentStep]
  );

  const next = useCallback(() => {
    const step = ProjectCreationStepsNext[currentStep];
    stepStorage.setValue(step);
    setCurrentStep(step);
  }, [currentStep]);

  const prev = useCallback(() => {
    const step = ProjectCreationStepsPrev[currentStep];
    stepStorage.setValue(step);
    setCurrentStep(step);
  }, [currentStep]);

  return (
    <CreateProjectContext.Provider
      value={{
        form,
        currentStep,
        helpers: {
          saveInSession: onSaveInSession,
          goTo,
          prev,
          next,
        },
        formFn: {
          addRepository,
          removeRepository,
        },
      }}
    >
      <Background roundedBorders={BackgroundRoundedBorders.Full} innerClassName="h-full">
        <form className="flex h-full items-center justify-center md:p-6" onSubmit={form.handleSubmit(onSubmit)}>
          {children}
          {/* /* ------------------------------- DEBUG CODE ------------------------------- */}
          <div className="fixed right-10 top-24 z-40 flex gap-2">
            <Button size={ButtonSize.Sm} onClick={() => goTo(ProjectCreationSteps.ORGANIZATIONS)}>
              Organization
            </Button>
            <Button size={ButtonSize.Sm} onClick={() => goTo(ProjectCreationSteps.REPOSITORIES)}>
              Repositories
            </Button>
            <Button size={ButtonSize.Sm} onClick={() => goTo(ProjectCreationSteps.INFORMATIONS)}>
              Information
            </Button>
          </div>
        </form>
      </Background>
    </CreateProjectContext.Provider>
  );
}
