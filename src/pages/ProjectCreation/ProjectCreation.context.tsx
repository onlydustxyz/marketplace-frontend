import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { useIntl } from "src/hooks/useIntl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateFormData, CreateFormDataRepos } from "./types/ProjectCreationType";
import { ProjectCreationSteps, ProjectCreationStepsNext, ProjectCreationStepsPrev } from "./types/ProjectCreationSteps";
import { useAuth } from "src/hooks/useAuth";
import GithubApi from "src/api/Github";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import Button, { ButtonSize } from "src/components/Button";
import { UseOrganizationsByGithubUserIdResponse } from "src/api/Github/queries";
import useMutationAlert from "src/api/useMutationAlert";
import ProjectApi from "src/api/Project";
import { generatePath, useNavigate, useSearchParams } from "react-router-dom";
import { RoutePaths } from "src/App";
import { AutoSaveForm } from "src/hooks/useAutoSave/AutoSaveForm";
import { STORAGE_KEY_CREATE_PROJECT_FORM, useResetStorage } from "./hooks/useProjectCreationStorage";
import { onSyncOrganizations } from "./utils/syncOrganization";
import { watchInstalledRepoStorage } from "./utils/watchInstalledRepoStorage";
import { StorageInterface } from "src/hooks/useStorage/Storage";

/**
 * @interface CreateContextProps
 * @property {CreateFormData | undefined} initialProject - Initial project data.
 * @property {ProjectCreationSteps | undefined} initialStep - Initial step in project creation.
 * @property {number[] | undefined} initialInstalledRepo - Initially installed repositories.
 * @property {React.ReactNode} children - React components.
 * @property {StorageInterface<CreateFormData | undefined>} formStorage - Storage for form data.
 * @property {StorageInterface<ProjectCreationSteps>} stepStorage - Storage for step information.
 * @property {StorageInterface<number[]>} reposStorage - Storage for repository information.
 */
interface CreateContextProps {
  initialProject: CreateFormData | undefined;
  initialStep: ProjectCreationSteps | undefined;
  initialInstalledRepo: number[] | undefined;
  children: React.ReactNode;
  formStorage: StorageInterface<CreateFormData | undefined>;
  stepStorage: StorageInterface<ProjectCreationSteps>;
  reposStorage: StorageInterface<number[]>;
}

type CreateProject = {
  form: UseFormReturn<CreateFormData, unknown>;
  currentStep: ProjectCreationSteps;
  installedRepos: number[];
  organizations: UseOrganizationsByGithubUserIdResponse[];
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
  installedRepos: [],
  organizations: [],
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

export function CreateProjectProvider({
  children,
  initialProject,
  initialInstalledRepo,
  formStorage,
  stepStorage,
  initialStep,
  reposStorage,
}: CreateContextProps) {
  const { T } = useIntl();
  const [installedRepos, setInstalledRepos] = useState<number[]>(initialInstalledRepo || []);
  const navigate = useNavigate();
  const poolingCount = useRef(0);
  const [currentStep, setCurrentStep] = useState<ProjectCreationSteps>(
    initialStep || ProjectCreationSteps.ORGANIZATIONS
  );
  const [searchParams] = useSearchParams();
  const installation_id = searchParams.get("installation_id") ?? "";

  const { githubUserId } = useAuth();
  const { reset: clearStorage } = useResetStorage();
  const { data: organizationsData } = GithubApi.queries.useOrganizationsByGithubUserId({
    params: { githubUserId },
    // Polling the organizations every second knowing that user can delete and installation
    // and the related github event can take an unknown delay to be triggered
    //   options: { retry: 1, enabled: !!githubUserId, refetchInterval: 20000 },
    options: {
      retry: 1,
      enabled: !!githubUserId && poolingCount.current <= 10,
      refetchOnWindowFocus: () => {
        poolingCount.current = 0;
        return true;
      },
      refetchInterval: () => {
        if (poolingCount.current < 5) {
          poolingCount.current = poolingCount.current + 1;
          return 2000;
        }
        return 0;
      },
    },
  });

  const { mutate: createProject, ...restCreateProjectMutation } = ProjectApi.mutations.useCreateProject({
    options: {
      onSuccess: data => {
        clearStorage();
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
    if (installation_id) {
      const newInstalledRepoStorage = watchInstalledRepoStorage({
        organizations: organizationsData || [],
        installedRepo: [...new Set([...(reposStorage.getValue() || []), parseInt(installation_id)])],
      });
      reposStorage.setValue(newInstalledRepoStorage);
      setInstalledRepos(newInstalledRepoStorage);
    }
  }, [installation_id, organizationsData]);

  useEffect(() => {
    if (organizationsData) {
      const filteredSelectedRepos = onSyncOrganizations({
        organizations: organizationsData || [],
        selectedRepos: form.getValues("selectedRepos") || [],
      });
      if (filteredSelectedRepos) {
        form.setValue("selectedRepos", filteredSelectedRepos, { shouldDirty: true, shouldValidate: true });
      }
    }
  }, [organizationsData, installation_id]);

  return (
    <CreateProjectContext.Provider
      value={{
        form,
        currentStep,
        installedRepos,
        organizations: organizationsData || [],
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
          <AutoSaveForm<CreateFormData> delay={1000} form={form} storage_key={STORAGE_KEY_CREATE_PROJECT_FORM} />
        </form>
      </Background>
    </CreateProjectContext.Provider>
  );
}
