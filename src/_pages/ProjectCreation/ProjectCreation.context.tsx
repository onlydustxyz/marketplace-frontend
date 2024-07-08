import { zodResolver } from "@hookform/resolvers/zod";
import { projectsCategoriesApiClient } from "api-client/resources/project-categories";
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";

import EcosystemApi from "src/api/Ecosystems";
import ProjectApi from "src/api/Project";
import MeApi from "src/api/me";
import { UseGithubOrganizationsResponse } from "src/api/me/queries";
import useMutationAlert from "src/api/useMutationAlert";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import { AutoSaveForm } from "src/hooks/useAutoSave/AutoSaveForm";
import { usePooling, usePoolingFeedback } from "src/hooks/usePooling/usePooling";
import { StorageInterface } from "src/hooks/useStorage/Storage";

import { TSelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete.types";

import { NEXT_ROUTER } from "constants/router";

import { useIntl } from "hooks/translate/use-translate";

import { STORAGE_KEY_CREATE_PROJECT_FORM, useResetStorage } from "./hooks/useProjectCreationStorage";
import { ProjectCreationSteps, ProjectCreationStepsNext, ProjectCreationStepsPrev } from "./types/ProjectCreationSteps";
import { CreateFormData, CreateFormDataRepos } from "./types/ProjectCreationType";
import { onSyncOrganizations } from "./utils/syncOrganization";
import { watchInstalledRepoStorage } from "./utils/watchInstalledRepoStorage";

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
  organizations: UseGithubOrganizationsResponse[];
  organizationsLoading: boolean;
  PoolingFeedback: React.ReactElement;
  ecosystems: TSelectAutocomplete.Item[];
  projectCategories: TSelectAutocomplete.Item[];
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
  ecosystems: [],
  projectCategories: [],
  organizations: [],
  organizationsLoading: false,
  PoolingFeedback: <></>,
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
  ecosystems: z.array(z.object({ id: z.number().or(z.string()) })).optional(),
  projectCategories: z.array(z.object({ id: z.number().or(z.string()) })).optional(),
  categorySuggestions: z.array(z.string()),
  moreInfos: z
    .array(
      z
        .object({
          url: z.string().trim().nullable(),
          value: z.string().nullable(),
        })
        .refine(data => !!data.url || (!data.url && !data.value) || (!!data.url && !!data.value), {
          path: ["url"],
          // not translated because it's not used in a react component
          message: "Please fill the information url",
        })
    )
    .min(0)
    .optional()
    .nullable(),
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
  const backgroundRef = useRef<HTMLFormElement | null>(null);
  const { T } = useIntl();
  const [enableAutoSaved, setEnableAutoSaved] = useState<boolean>(true);
  const [installedRepos, setInstalledRepos] = useState<number[]>(initialInstalledRepo || []);
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<ProjectCreationSteps>(
    initialStep || ProjectCreationSteps.ORGANIZATIONS
  );
  const searchParams = useSearchParams();
  const installation_id = searchParams.get("installation_id") ?? "";

  const { reset: clearStorage } = useResetStorage();

  // Polling the organizations every second knowing that user can delete and installation
  // and the related github event can take an unknown delay to be triggered
  const { refetchOnWindowFocus, refetchInterval, onRefetching, onForcePooling } = usePooling({
    limites: 5,
    delays: 3000,
  });

  const {
    data: organizationsData,
    isRefetching,
    isLoading,
    refetch,
  } = MeApi.queries.useGithubOrganizations({
    options: {
      retry: 1,
      refetchOnWindowFocus,
      refetchInterval,
    },
  });
  const { data: ecosystemsData } = EcosystemApi.queries.useGetEcosystems({});
  const { data: categoriesData } = projectsCategoriesApiClient.queries.useGetProjectCategories({});

  const PoolingFeedback = usePoolingFeedback({
    onForcePooling,
    isLoading,
    isRefetching,
    fetch: refetch,
    ui: {
      label: T("project.details.create.syncOganizations"),
    },
  });

  useEffect(() => {
    onRefetching(isRefetching);
  }, [isRefetching]);

  const { mutate: createProject, ...restCreateProjectMutation } = ProjectApi.mutations.useCreateProject({
    options: {
      onSuccess: data => {
        clearStorage();
        if (data?.projectSlug) {
          router.push(NEXT_ROUTER.projects.details.root(data.projectSlug));
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
    defaultValues: initialProject
      ? {
          ...initialProject,
          moreInfos: initialProject?.moreInfos?.length > 0 ? initialProject.moreInfos : [{ url: "", value: "" }],
          ecosystems: initialProject?.ecosystems,
          ecosystemIds: (initialProject?.ecosystems || []).map(({ id }) => `${id}`),
          categorySuggestions: [],
          projectCategories: initialProject?.projectCategories,
          categoryIds: (initialProject?.projectCategories || []).map(({ id }) => `${id}`),
        }
      : {
          moreInfos: [{ url: "", value: "" }],
        },
    resolver: zodResolver(validationSchema),
  });

  const onSaveInSession = () => {
    formStorage.setValue(form.getValues());
  };

  const onSubmit = () => {
    setEnableAutoSaved(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { search, projectLeads, selectedRepos, ecosystems, projectCategories, moreInfos, ...formData } =
      form.getValues();
    createProject({
      ...formData,
      isLookingForContributors: formData.isLookingForContributors || false,
      githubRepoIds: selectedRepos.map(repo => repo.repoId),
      ecosystemIds: ecosystems?.map(ecosystem => `${ecosystem.id}`),
      categoryIds: projectCategories?.map(cat => `${cat.id}`),
      moreInfos: (moreInfos || []).filter(info => info.url !== "").map(info => ({ url: info.url, value: info.value })),
    });
  };

  const isOrgsExist = (orgId: number) => {
    return !!(organizationsData || [])?.find(org => org.githubUserId === orgId);
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
      if (backgroundRef?.current) {
        backgroundRef.current.scrollTop = 0;
      }
    },
    [currentStep]
  );

  const next = useCallback(() => {
    goTo(ProjectCreationStepsNext[currentStep]);
  }, [currentStep]);

  const prev = useCallback(() => {
    goTo(ProjectCreationStepsPrev[currentStep]);
  }, [currentStep]);

  const EcoSystems = useMemo(() => {
    return (ecosystemsData?.ecosystems || []).map(({ name, id, logoUrl }) => ({
      id,
      label: name,
      value: id,
      image: logoUrl,
    }));
  }, [ecosystemsData]);

  const projectCategories: TSelectAutocomplete.Item[] = useMemo(() => {
    return (categoriesData?.categories || []).map(({ name, id, iconSlug }) => ({
      id,
      label: name,
      value: id,
      iconSlug,
    }));
  }, [categoriesData]);

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
        ecosystems: EcoSystems,
        projectCategories,
        organizationsLoading: isLoading && !organizationsData?.length,
        organizations: (organizationsData || []).sort((a, b) => a.login.localeCompare(b.login)),
        PoolingFeedback,
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
        <form
          ref={backgroundRef}
          className="flex h-full items-start justify-center overflow-auto p-2 pb-36 md:items-center md:overflow-visible md:p-6 md:pb-0"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {children}
          {enableAutoSaved && (
            <AutoSaveForm<CreateFormData> delay={1000} form={form} storage_key={STORAGE_KEY_CREATE_PROJECT_FORM} />
          )}
        </form>
      </Background>
    </CreateProjectContext.Provider>
  );
}
