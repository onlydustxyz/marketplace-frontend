import { createContext, useEffect, useMemo, useRef, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { generatePath, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { RoutePaths } from "src/App";
import { components } from "src/__generated/api";
import ProjectApi from "src/api/Project";
import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
import { EditPanelProvider } from "./components/Panel/context";
import { ConfirmationModal } from "./components/ConfirmationModal/ConfirmationModal";
import { FieldProjectLeadValue } from "src/pages/ProjectCreation/views/ProjectInformations/components/ProjectLead/ProjectLead";
import { zodResolver } from "@hookform/resolvers/zod";
import { uniqWith } from "lodash";
import { UseGithubOrganizationsResponse } from "src/api/me/queries";
import MeApi from "src/api/me";
import { useSessionStorage } from "src/hooks/useStorage/useStorage";
import { usePooling, usePoolingFeedback } from "src/hooks/usePooling/usePooling";
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
};

export interface EditFormDataRepos {
  repoId: number;
  orgId: number;
}

export type EditFormData = components["schemas"]["UpdateProjectRequest"] & {
  projectLeads: FieldProjectLeadValue;
  selectedRepos: EditFormDataRepos[];
  githubRepos: Array<{ id: number; isAuthorizedInGithubApp?: boolean }>;
};

export const EditContext = createContext<Edit>({
  form: undefined,
  project: undefined,
  organizations: [],
  PoolingFeedback: <></>,
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
});

const SESSION_KEY = "edit-project-";

export function EditProvider({ children, project }: EditContextProps) {
  const { T } = useIntl();

  const validationSchema = useEditValidationSchema();

  const navigate = useNavigate();
  const showToaster = useShowToaster();
  const location = useLocation();
  const poolingCount = useRef(0);
  const [searchParams] = useSearchParams();
  const installation_id = searchParams.get("installation_id") ?? "";
  const [inGithubWorkflow, setInGithubWorkflow] = useState(false);

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
    defaultValues: {
      name: project.name,
      logoUrl: project.logoUrl,
      shortDescription: project.shortDescription,
      longDescription: project.longDescription,
      moreInfos: project.moreInfos,
      githubRepos: (project.repos || []).map(repo => ({
        id: repo.id,
        isAuthorizedInGithubApp: repo.isAuthorizedInGithubApp,
      })),
      isLookingForContributors: project.hiring,
      inviteGithubUserIdsAsProjectLeads: project.invitedLeaders.map(leader => leader.githubUserId),
      projectLeadsToKeep: project.leaders.map(leader => leader.id),
      projectLeads: { invited: project.invitedLeaders, toKeep: project.leaders },
      rewardSettings: project.rewardSettings,
    },
    resolver: zodResolver(validationSchema),
  });

  const mergeOrganization = useMemo(() => {
    const merged = (project.organizations || [])?.map(projectOrg => {
      const findInMe = (organizationsData || []).find(meOrg => meOrg.id === projectOrg.id);
      if (findInMe) {
        return {
          ...findInMe,
          ...projectOrg,
          installed: findInMe.installed,
          isCurrentUserAdmin: findInMe.isCurrentUserAdmin,
          repos: uniqWith([...(projectOrg.repos || []), ...(findInMe.repos || [])], (arr, oth) => arr.id === oth.id),
        };
      }
      return projectOrg;
    });
    return uniqWith([...(merged || []), ...(organizationsData || [])], (arr, oth) => arr.id === oth.id);
  }, [organizationsData, project]);

  const onAddRepository = (organizationId: number, repoId: number) => {
    const githubRepos = [...(form.getValues("githubRepos") || [])];

    const findOrganization = mergeOrganization.find(org => org.id === organizationId);
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
    const findOrganization = mergeOrganization.find(org => org.id === organizationId);
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

  const { mutate: updateProject } = ProjectApi.mutations.useUpdateProject({
    params: { projectId: project?.id, projectSlug: project?.slug },
    options: {
      onSuccess: async (data, queryClient) => {
        showToaster(T("form.toast.success"));
        clearSession();
        form.reset(form.getValues());

        // Replace the current path on the history stack if different
        const newPathname = `${generatePath(RoutePaths.ProjectDetailsEdit, {
          projectKey: data.projectSlug,
        })}`;

        // Navigate before invalidating queries so the new data can use the updated params
        navigate(newPathname, { replace: true, state: location.state });

        queryClient.invalidateQueries({ queryKey: MeApi.tags.all });
        queryClient.invalidateQueries({ queryKey: ProjectApi.tags.detail_by_slug(data.projectSlug) });
      },
    },
  });

  const onSubmit = (formData: EditFormData) => {
    const { githubRepos, ...rest } = formData;
    const githubRepoIds = githubRepos.map(repo => repo.id);
    updateProject({ ...rest, githubRepoIds });
  };

  useEffect(() => {
    form.trigger();
  }, []);

  return (
    <EditContext.Provider
      value={{
        form,
        project,
        organizations: mergeOrganization,
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
