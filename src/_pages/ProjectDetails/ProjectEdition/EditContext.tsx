import { zodResolver } from "@hookform/resolvers/zod";
import { projectsCategoriesApiClient } from "api-client/resources/project-categories";
import { uniqWith } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useEffect, useMemo, useRef, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { components } from "src/__generated/api";
import { FieldProjectLeadValue } from "src/_pages/ProjectCreation/views/ProjectInformations/components/ProjectLead/ProjectLead";
import EcosystemApi from "src/api/Ecosystems";
import ProjectApi from "src/api/Project";
import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import MeApi from "src/api/me";
import { UseGithubOrganizationsResponse } from "src/api/me/queries";
import { usePooling, usePoolingFeedback } from "src/hooks/usePooling/usePooling";
import { usePosthog } from "src/hooks/usePosthog";
import { useSessionStorage } from "src/hooks/useStorage/useStorage";
import { useShowToaster } from "src/hooks/useToaster";
import { MoreInfosField } from "src/types";

import { TSelectAutocomplete } from "components/ds/form/select-autocomplete/select-autocomplete.types";

import { NEXT_ROUTER } from "constants/router";

import { useIntl } from "hooks/translate/use-translate";

import { useProjectDetailsLastAddedRepoStorage } from "../hooks/useProjectDetailsStorage";
import { ConfirmationModal } from "./components/ConfirmationModal/ConfirmationModal";
import { EditPanelProvider } from "./components/Panel/context";
import { useEditValidationSchema } from "./hooks/useValidationSchema";

interface EditContextProps {
  project: UseGetProjectBySlugResponse;
  children: React.ReactNode;
}

type Edit = {
  project?: UseGetProjectBySlugResponse;
  form?: UseFormReturn<EditFormData, unknown>;
  organizations: UseGithubOrganizationsResponse[];
  PoolingFeedback: React.ReactElement;
  ecosystems: TSelectAutocomplete.Item[];
  projectCategories: TSelectAutocomplete.Item[];
  githubWorklow: {
    run: () => void;
    inGithubWorkflow: boolean;
  };
  formHelpers: {
    saveInSession: () => void;
    resetBeforLeave: () => void;
    triggerSubmit: () => void;
    addRepository: (organizationId: number, repoId: number) => void;
    removeRepository: (organizationId: number, repoId: number) => void;
  };
  isSubmitting: boolean;
};

export interface EditFormDataRepos {
  repoId: number;
  orgId: number;
}

export type EditFormData = Omit<components["schemas"]["UpdateProjectRequest"], "moreInfos"> & {
  projectLeads: FieldProjectLeadValue;
  ecosystems: TSelectAutocomplete.Item[];
  projectCategories: TSelectAutocomplete.Item[];
  categorySuggestions: string[];
  selectedRepos: EditFormDataRepos[];
  githubRepos: Array<{ id: number; isAuthorizedInGithubApp?: boolean }>;
  moreInfos: MoreInfosField[];
};

export const EditContext = createContext<Edit>({
  form: undefined,
  project: undefined,
  organizations: [],
  PoolingFeedback: <></>,
  ecosystems: [],
  projectCategories: [],
  formHelpers: {
    resetBeforLeave: () => null,
    triggerSubmit: () => null,
    addRepository: () => null,
    saveInSession: () => null,
    removeRepository: () => null,
  },
  githubWorklow: {
    run: () => null,
    inGithubWorkflow: false,
  },
  isSubmitting: false,
});

const SESSION_KEY = "edit-project-";

export function EditProvider({ children, project }: EditContextProps) {
  const { T } = useIntl();

  const validationSchema = useEditValidationSchema();
  const lastAddedRepoStorage = useProjectDetailsLastAddedRepoStorage(project.slug);
  const router = useRouter();
  const showToaster = useShowToaster();
  const poolingCount = useRef(0);
  const searchParams = useSearchParams();
  const installation_id = searchParams.get("installation_id") ?? "";
  const [inGithubWorkflow, setInGithubWorkflow] = useState(false);
  const { capture } = usePosthog();

  const { refetchOnWindowFocus, refetchInterval, onRefetching, onForcePooling } = usePooling({
    limites: 4,
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

  useEffect(() => {
    if (isRefetching) {
      poolingCount.current = poolingCount.current + 1;
    }
  }, [isRefetching]);

  const formStorage = useSessionStorage<{ form: EditFormData; dirtyFields: Array<keyof EditFormData> } | undefined>({
    key: `${SESSION_KEY}${project.slug}`,
    initialValue: undefined,
  });

  const form = useForm<EditFormData>({
    mode: "all",
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    if (project) {
      form.reset({
        name: project.name,
        logoUrl: project.logoUrl,
        shortDescription: project.shortDescription,
        longDescription: project.longDescription,
        moreInfos: project.moreInfos?.length
          ? project.moreInfos.map(info => ({ ...info, id: uuidv4() }))
          : [{ url: "", value: "", id: uuidv4() }],
        githubRepos: (project.organizations?.flatMap(organization => organization.repos) || []).map(repo => ({
          id: repo.id,
          isAuthorizedInGithubApp: repo.isAuthorizedInGithubApp,
        })),
        isLookingForContributors: project.hiring,
        inviteGithubUserIdsAsProjectLeads: project.invitedLeaders.map(leader => leader.githubUserId),
        projectLeadsToKeep: project.leaders.map(leader => leader.id),
        projectLeads: { invited: project.invitedLeaders, toKeep: project.leaders },
        ecosystems: (project?.ecosystems || []).map(({ name, id, logoUrl }) => ({
          id,
          label: name,
          value: id,
          image: logoUrl,
        })),
        projectCategories: (project?.categories || []).map(({ name, id, iconSlug }) => ({
          id,
          label: name,
          value: id,
          iconSlug,
        })),
        categorySuggestions: project.categorySuggestions || [],
        ecosystemIds: (project?.ecosystems || []).map(({ id }) => id),
        categoryIds: (project?.categories || []).map(({ id }) => id),
        rewardSettings: {
          ...project.rewardSettings,
          ignoreContributionsBefore: project.rewardSettings?.ignoreContributionsBefore ?? project.createdAt,
        },
      });
    }
  }, [project]);

  const mergeOrganization = useMemo(() => {
    const merged = (project.organizations || [])?.map(projectOrg => {
      const findInMe = (organizationsData || []).find(meOrg => meOrg.githubUserId === projectOrg.githubUserId);
      if (findInMe) {
        return {
          ...findInMe,
          ...projectOrg,
          installed: findInMe.installationStatus !== "NOT_INSTALLED",
          installationId: findInMe.installationId,
          isPersonal: findInMe.isPersonal,
          isCurrentUserAdmin: findInMe.isCurrentUserAdmin,
          repos: uniqWith([...(projectOrg.repos || []), ...(findInMe.repos || [])], (arr, oth) => arr.id === oth.id),
        };
      }
      return projectOrg;
    });

    return uniqWith(
      [...(merged || []), ...(organizationsData || [])],
      (arr, oth) => arr.githubUserId === oth.githubUserId
    ).sort((a, b) => a.login.localeCompare(b.login));
  }, [organizationsData, project]);

  const onAddRepository = (organizationId: number, repoId: number) => {
    const githubRepos = [...(form.getValues("githubRepos") || [])];

    const findOrganization = mergeOrganization.find(org => org.githubUserId === organizationId);
    if (findOrganization) {
      const findRepo = (findOrganization.repos || []).find(repo => repo.id === repoId);
      if (findRepo) {
        githubRepos.push({ id: findRepo.id, isAuthorizedInGithubApp: findRepo.isAuthorizedInGithubApp });
        form.setValue("githubRepos", githubRepos, { shouldDirty: true, shouldValidate: true });
      }
    }
  };

  const onRemoveRepository = (organizationId: number, repoId: number) => {
    const githubRepos = [...(form.getValues("githubRepos") || [])];
    const findOrganization = mergeOrganization.find(org => org.githubUserId === organizationId);
    if (findOrganization) {
      const findRepo = (findOrganization.repos || []).find(repo => repo.id === repoId);
      if (findRepo) {
        const findRepoIndex = githubRepos.findIndex(repo => repo.id === findRepo.id);
        if (findRepoIndex !== -1) {
          githubRepos.splice(findRepoIndex, 1);
          form.setValue("githubRepos", githubRepos, { shouldDirty: true, shouldValidate: true });
        }
      }
    }
  };

  const onSaveInSession = () => {
    const dirtyField = { ...form.formState.dirtyFields } as { [key: string]: boolean | undefined };
    const dirtykeys = Object.keys(dirtyField)
      .map(key => (dirtyField[key] ? key : undefined))
      .filter(Boolean) as Array<keyof EditFormData>;

    formStorage.setValue({ form: form.getValues(), dirtyFields: dirtykeys });
  };

  const runGithubWorkflow = () => {
    setInGithubWorkflow(true);
    onSaveInSession();
  };

  const onTriggerSubmit = () => {
    return form.handleSubmit(onSubmit)();
  };

  const onResetBeforLeave = () => {
    form.reset();
    formStorage.removeValue();
  };

  const clearSession = () => {
    formStorage.removePattern(SESSION_KEY);
    formStorage.removeValue();
  };

  useEffect(() => {
    const storedValue = formStorage.getValue();
    if (storedValue) {
      const storage = { ...storedValue };
      storedValue.dirtyFields.forEach(field => {
        form.setValue(field, storage.form[field], { shouldDirty: true, shouldValidate: true });
      });
    }
    formStorage.removeValue();
  }, []);

  const { mutateAsync: updateProject, isPending: isSubmitting } = ProjectApi.mutations.useUpdateProject({
    params: { projectId: project?.id, projectSlug: project?.slug },
    options: {
      onSuccess: async (data, queryClient) => {
        if (form.formState.dirtyFields.githubRepos) {
          lastAddedRepoStorage.setValue(new Date().toISOString());
        }
        formStorage.removeValue();
        showToaster(T("form.toast.success"));
        clearSession();

        // Replace the current path on the history stack if different

        if (data.projectSlug !== project.slug) {
          const newPathname = NEXT_ROUTER.projects.details.edit(data.projectSlug);

          // Navigate before invalidating queries so the new data can use the updated params
          router.replace(newPathname, { scroll: false });

          queryClient.invalidateQueries({ queryKey: MeApi.tags.all });
        }
        queryClient.invalidateQueries({ queryKey: ProjectApi.tags.detail_by_slug(data.projectSlug) });
      },
    },
  });

  const onSubmit = (formData: EditFormData) => {
    const { githubRepos, moreInfos, ecosystems, projectCategories, ...rest } = formData;
    const githubRepoIds = githubRepos.map(repo => repo.id);
    updateProject({
      ...rest,
      githubRepoIds,
      moreInfos: (moreInfos || []).filter(info => info.url !== "").map(info => ({ url: info.url, value: info.value })),
      ecosystemIds: ecosystems?.map(ecosystem => `${ecosystem.id}`),
      categoryIds: projectCategories?.map(cat => `${cat.id}`),
    }).then(() => {
      capture("project_information_changed");
    });
  };

  useEffect(() => {
    form.trigger();
  }, []);

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

  return (
    <EditContext.Provider
      value={{
        form,
        project,
        organizations: mergeOrganization,
        ecosystems: EcoSystems,
        projectCategories,
        PoolingFeedback,
        formHelpers: {
          addRepository: onAddRepository,
          resetBeforLeave: onResetBeforLeave,
          saveInSession: onSaveInSession,
          triggerSubmit: onTriggerSubmit,
          removeRepository: onRemoveRepository,
        },
        githubWorklow: {
          inGithubWorkflow,
          run: runGithubWorkflow,
        },
        isSubmitting,
      }}
    >
      <EditPanelProvider openOnLoad={!!installation_id} isLoading={false} project={project}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="h-full overflow-hidden">
          {children}
        </form>
        <ConfirmationModal />
      </EditPanelProvider>
    </EditContext.Provider>
  );
}
