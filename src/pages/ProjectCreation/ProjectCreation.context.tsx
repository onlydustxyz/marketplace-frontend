import { createContext, useCallback, useEffect, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { useIntl } from "src/hooks/useIntl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateFormData, CreateFormDataRepos } from "./types/ProjectCreationType";
import { useResetSession } from "./hooks/useProjectCreationSession";
import { ProjectCreationSteps, ProjectCreationStepsNext, ProjectCreationStepsPrev } from "./types/ProjectCreationSteps";
import { useAuth } from "src/hooks/useAuth";
import GithubApi from "src/api/Github";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import Button, { ButtonSize } from "src/components/Button";
import { UseOrganizationsByGithubUserIdResponse } from "src/api/Github/queries";
import useMutationAlert from "src/api/useMutationAlert";
import ProjectApi from "src/api/Project";
import { generatePath, useNavigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import { AutoSaveForm } from "src/hooks/useAutoSave/AutoSaveForm";
import { STORAGE_KEY_CREATE_PROJECT_FORM } from "./hooks/useProjectCreationStorage";

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
  organizations: UseOrganizationsByGithubUserIdResponse[];
  formFn: {
    addRepository: (data: CreateFormDataRepos) => void;
    removeRepository: (data: CreateFormDataRepos) => void;
  };
  helpers: {
    saveInSession: () => void;
    syncOrganizations: () => void;
    goTo: (step: ProjectCreationSteps) => void;
    next: () => void;
    prev: () => void;
  };
};

export const CreateProjectContext = createContext<CreateProject>({
  form: {} as UseFormReturn<CreateFormData, unknown>,
  currentStep: ProjectCreationSteps.ORGANIZATIONS,
  organizations: [],
  helpers: {
    saveInSession: () => null,
    syncOrganizations: () => null,
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

export function CreateProjectProvider({
  children,
  initialProject,
  formStorage,
  stepStorage,
  initialStep,
}: CreateContextProps) {
  const { T } = useIntl();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<ProjectCreationSteps>(
    initialStep || ProjectCreationSteps.ORGANIZATIONS
  );

  const { githubUserId } = useAuth();
  const { reset: clearSession } = useResetSession();
  const { data: organizationsData, isLoading: isOrganizationsLoading } =
    GithubApi.queries.useOrganizationsByGithubUserId({
      params: { githubUserId },
      // Polling the organizations every second knowing that user can delete and installation
      // and the related github event can take an unknown delay to be triggered
      options: { retry: 1, enabled: !!githubUserId, refetchInterval: 20000 },
    });

  const { mutate: createProject, ...restCreateProjectMutation } = ProjectApi.mutations.useCreateProject({
    options: {
      onSuccess: data => {
        clearSession();
        if (data?.projectSlug) {
          navigate(generatePath(RoutePaths.ProjectDetails, { projectKey: data.projectSlug }));
        }
      },
    },
  });

  useMutationAlert({
    mutation: restCreateProjectMutation,
    success: {
      message: T("project.details.create.submit.success"),
    },
    error: {
      message: T("project.details.create.submit.error"),
    },
  });

  const form = useForm<CreateFormData>({
    mode: "all",
    defaultValues: initialProject || {},
    resolver: zodResolver(validationSchema),
  });

  const onSaveInSession = () => {
    formStorage.setValue(form.getValues());
  };

  const onSubmit = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { search, selectedRepos, ...formData } = form.getValues();
    createProject({
      ...formData,
      isLookingForContributors: formData.isLookingForContributors || false,
      moreInfo: [formData.moreInfo],
      githubRepoIds: selectedRepos.map(repo => repo.repoId),
    });
  };

  const onSyncOrganizations = () => {
    const selectedRepos = form.getValues().selectedRepos;
    if (selectedRepos?.length && organizationsData) {
      const organizationIds = new Set(organizationsData?.map(org => org.id));
      const filteredRepos = selectedRepos?.filter(repo => organizationIds.has(repo.orgId));
      form.setValue("selectedRepos", filteredRepos, { shouldDirty: true, shouldValidate: true });
    }

    return;
  };

  const isOrgsExist = (orgId: number) => {
    return !!(organizationsData || [])?.find(org => org.id === orgId);
  };

  const addRepository = (data: CreateFormDataRepos) => {
    const formValues = form.getValues();
    const repos = [...(formValues.selectedRepos || [])];

    if (isOrgsExist(data.orgId)) {
      const findRepo = repos.find(repo => repo.repoId === data.repoId);
      if (!findRepo) {
        repos.push(data);
        form.setValue("selectedRepos", repos, { shouldDirty: true, shouldValidate: true });
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
        form.setValue("selectedRepos", repos, { shouldDirty: true, shouldValidate: true });
      }
    }
  };

  const goTo = useCallback(
    (step: ProjectCreationSteps) => {
      stepStorage.setValue(step);
      setCurrentStep(step);
    },
    [currentStep]
  );

  const next = useCallback(() => {
    goTo(ProjectCreationStepsNext[currentStep]);
  }, [currentStep]);

  const prev = useCallback(() => {
    goTo(ProjectCreationStepsPrev[currentStep]);
  }, [currentStep]);

  useEffect(() => {
    onSyncOrganizations();
  }, [organizationsData]);

  return (
    <CreateProjectContext.Provider
      value={{
        form,
        currentStep,
        organizations: organizationsData || [],
        helpers: {
          saveInSession: onSaveInSession,
          syncOrganizations: onSyncOrganizations,
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
          <AutoSaveForm<CreateFormData> delay={1000} form={form} storage_key={STORAGE_KEY_CREATE_PROJECT_FORM} />
        </form>
      </Background>
    </CreateProjectContext.Provider>
  );
}
