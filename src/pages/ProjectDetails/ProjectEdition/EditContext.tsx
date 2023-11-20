import { createContext, useEffect, useMemo, useRef, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { generatePath, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ProjectRoutePaths, RoutePaths } from "src/App";
import { components } from "src/__generated/api";
import ProjectApi from "src/api/Project";
import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
import { z } from "zod";
import { EditPanelProvider } from "./components/Panel/context";
import { ConfirmationModal } from "./components/ConfirmationModal/ConfirmationModal";
import { FieldProjectLeadValue } from "src/pages/ProjectCreation/views/ProjectInformations/components/ProjectLead/ProjectLead";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "src/hooks/useAuth";
import { uniqWith } from "lodash";
import { UseGithubOrganizationsResponse } from "src/api/me/queries";
import MeApi from "src/api/me";
import { useSessionStorage } from "src/hooks/useStorage/useStorage";

interface EditContextProps {
  project: UseGetProjectBySlugResponse;
  children: React.ReactNode;
}

type Edit = {
  project?: UseGetProjectBySlugResponse;
  form?: UseFormReturn<EditFormData, unknown>;
  organizations: UseGithubOrganizationsResponse[];
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
};

export const EditContext = createContext<Edit>({
  form: undefined,
  project: undefined,
  organizations: [],
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

const validationSchema = z.object({
  logoUrl: z.string().nullish(),
  inviteGithubUserIdsAsProjectLeads: z.array(z.number()).optional(),
  isLookingForContributors: z.boolean().nullish().optional(),
  longDescription: z.string().min(1),
  moreInfo: z.array(
    z.object({
      url: z.string().min(1).nullish(),
      value: z.string().min(1).nullish(),
    })
  ),
  name: z.string().min(1),
  githubRepoIds: z.array(z.number()).min(1),
  projectLeadsToKeep: z.array(z.string()).min(1),
  shortDescription: z.string().min(1),
  rewardSettings: z.object({
    ignorePullRequests: z.boolean().nullish().optional(),
    ignoreIssues: z.boolean().nullish().optional(),
    ignoreCodeReviews: z.boolean().nullish().optional(),
    ignoreContributionsBefore: z.coerce.date().optional(),
  }),
});

const SESSION_KEY = "edit-project-";

export function EditProvider({ children, project }: EditContextProps) {
  const { T } = useIntl();
  const { githubUserId } = useAuth();
  const navigate = useNavigate();
  const showToaster = useShowToaster();
  const location = useLocation();
  const poolingCount = useRef(0);
  const [searchParams] = useSearchParams();
  const installation_id = searchParams.get("installation_id") ?? "";
  const [inGithubWorkflow, setInGithubWorkflow] = useState(false);

  const { data: organizationsData } = MeApi.queries.useGithubOrganizations({
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
      moreInfo: [
        {
          url: project.moreInfoUrl,
          value: "website",
        },
      ],
      githubRepoIds: (project.repos || []).map(repo => repo.id),
      isLookingForContributors: project.hiring,
      inviteGithubUserIdsAsProjectLeads: project.invitedLeaders.map(leader => leader.githubUserId),
      projectLeadsToKeep: project.leaders.map(leader => leader.id),
      projectLeads: { invited: project.invitedLeaders, toKeep: project.leaders },
      rewardSettings: project.rewardSettings,
    },
    resolver: zodResolver(validationSchema),
  });

  const mergeOrganization = useMemo(() => {
    return uniqWith([...(project.organizations || []), ...(organizationsData || [])], (arr, oth) => arr.id === oth.id);
  }, [organizationsData, project]);

  const onAddRepository = (organizationId: number, repoId: number) => {
    const githubRepoIds = [...(form.getValues("githubRepoIds") || [])];
    const findOrganization = mergeOrganization.find(org => org.id === organizationId);
    if (findOrganization) {
      const findRepo = (findOrganization.repos || []).find(repo => repo.id === repoId);
      if (findRepo) {
        githubRepoIds.push(findRepo.id);
        form.setValue("githubRepoIds", githubRepoIds, { shouldDirty: true, shouldValidate: true });
      }
    }
  };

  const onRemoveRepository = (organizationId: number, repoId: number) => {
    const githubRepoIds = [...(form.getValues("githubRepoIds") || [])];
    const findOrganization = mergeOrganization.find(org => org.id === organizationId);
    if (findOrganization) {
      const findRepo = (findOrganization.repos || []).find(repo => repo.id === repoId);
      if (findRepo) {
        const findRepoIndex = githubRepoIds.findIndex(id => id === findRepo.id);
        if (findRepoIndex !== -1) {
          githubRepoIds.splice(findRepoIndex, 1);
          form.setValue("githubRepoIds", githubRepoIds, { shouldDirty: true, shouldValidate: true });
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
      onSuccess: async data => {
        showToaster(T("form.toast.success"));
        clearSession();

        // Replace the current path on the history stack if different
        const newPathname = `${generatePath(RoutePaths.ProjectDetails, {
          projectKey: data.projectSlug,
        })}/${ProjectRoutePaths.Edit}`;

        if (location.pathname !== newPathname) {
          navigate(newPathname, { replace: true, state: location.state });
        }
      },
    },
  });

  const onSubmit = (formData: EditFormData) => {
    updateProject(formData);
    form.reset(form.getValues());
  };

  return (
    <EditContext.Provider
      value={{
        form,
        project,
        organizations: mergeOrganization,
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
