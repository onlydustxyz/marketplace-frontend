import { createContext, useEffect, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { generatePath, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ProjectRoutePaths, RoutePaths } from "src/App";
import { components } from "src/__generated/api";
import GithubApi from "src/api/Github";
import ProjectApi from "src/api/Project";
import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import { useIntl } from "src/hooks/useIntl";
import { useSessionStorage } from "src/hooks/useSessionStorage/useSessionStorage";
import { useShowToaster } from "src/hooks/useToaster";
import { z } from "zod";
import { EditPanelProvider } from "./components/Panel/context";
import transformInstallationToOrganization from "./utils/transformInstallationToOrganization";
import { ConfirmationModal } from "./components/ConfirmationModal/ConfirmationModal";
import { FieldProjectLeadValue } from "src/pages/ProjectCreation/pages/ProjectInformations/components/ProjectLead/ProjectLead";
import { zodResolver } from "@hookform/resolvers/zod";

interface EditContextProps {
  project: UseGetProjectBySlugResponse;
  children: React.ReactNode;
}

type Edit = {
  project?: UseGetProjectBySlugResponse;
  form?: UseFormReturn<EditFormData, unknown>;
  githubWorklow: {
    run: () => void;
    inGithubWorkflow: boolean;
  };
  formHelpers: {
    addOrganization: (organization: components["schemas"]["GithubOrganizationResponse"]) => void;
    saveInSession: () => void;
    resetBeforLeave: () => void;
    triggerSubmit: () => void;
    addRepository: (organizationId: number, repoId: number) => void;
    removeRepository: (organizationId: number, repoId: number) => void;
  };
};

export type EditFormData = components["schemas"]["UpdateProjectRequest"] & {
  organizations: components["schemas"]["GithubOrganizationResponse"][];
  projectLeads: FieldProjectLeadValue;
};

export const EditContext = createContext<Edit>({
  form: undefined,
  project: undefined,
  formHelpers: {
    addOrganization: () => null,
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
  logoUrl: z.string(),
  inviteGithubUserIdsAsProjectLeads: z.array(z.number()).optional(),
  isLookingForContributors: z.boolean().nullish().optional(),
  longDescription: z.string().min(1),
  moreInfo: z.array(
    z.object({
      url: z.string().min(1),
      value: z.string().min(1),
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
  const navigate = useNavigate();
  const showToaster = useShowToaster();
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const installation_id = searchParams.get("installation_id") ?? "";
  const [inGithubWorkflow, setInGithubWorkflow] = useState(false);
  const { data: installationData, isLoading: isInstallationLoading } = GithubApi.queries.useInstallationById({
    params: { installation_id },
    options: { retry: 1, enabled: !!installation_id },
  });

  const [storedValue, setValue, status, removeValue, clearSessionPattern] = useSessionStorage<
    { form: EditFormData; dirtyFields: Array<keyof EditFormData> } | undefined
  >(`${SESSION_KEY}${project.slug}`, undefined);

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
      organizations: project.organizations,
      rewardSettings: project.rewardSettings,
    },
    resolver: zodResolver(validationSchema),
  });

  const onAddOrganization = (organization: components["schemas"]["GithubOrganizationResponse"]) => {
    const organizations = [...form.getValues("organizations")];
    const findOrganization = organizations.find(org => org.id === organization.id);
    if (!findOrganization) {
      organizations.push(organization);
      form.setValue("organizations", organizations, { shouldDirty: true, shouldValidate: true });
    }
  };

  const onAddRepository = (organizationId: number, repoId: number) => {
    const organizations = [...form.getValues("organizations")];
    const githubRepoIds = [...(form.getValues("githubRepoIds") || [])];
    const findOrganization = organizations.find(org => org.id === organizationId);
    if (findOrganization) {
      const findRepo = (findOrganization.repos || []).find(repo => repo.id === repoId);
      if (findRepo) {
        findRepo.isIncludedInProject = true;
        githubRepoIds.push(findRepo.id);
        form.setValue("organizations", organizations, { shouldDirty: true, shouldValidate: true });
        form.setValue("githubRepoIds", githubRepoIds, { shouldDirty: true, shouldValidate: true });
      }
    }
  };

  const onRemoveRepository = (organizationId: number, repoId: number) => {
    const organizations = [...form.getValues("organizations")];
    const githubRepoIds = [...(form.getValues("githubRepoIds") || [])];
    const findOrganization = organizations.find(org => org.id === organizationId);
    if (findOrganization) {
      const findRepo = (findOrganization.repos || []).find(repo => repo.id === repoId);
      if (findRepo) {
        findRepo.isIncludedInProject = false;
        const findRepoIndex = githubRepoIds.findIndex(id => id === findRepo.id);
        if (findRepoIndex !== -1) {
          githubRepoIds.splice(findRepoIndex, 1);
          form.setValue("organizations", organizations, { shouldDirty: true, shouldValidate: true });
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

    setValue({ form: form.getValues(), dirtyFields: dirtykeys });
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
    removeValue();
  };

  const clearSession = () => {
    clearSessionPattern(SESSION_KEY);
    removeValue();
  };

  useEffect(() => {
    if (status === "ready" && storedValue) {
      const storage = { ...storedValue };
      storedValue.dirtyFields.forEach(field => {
        form.setValue(field, storage.form[field], { shouldDirty: true, shouldValidate: true });
      });
      clearSession();
    } else if (status === "ready") {
      clearSession();
    }
  }, [status]);

  useEffect(() => {
    const transformedOrganization = transformInstallationToOrganization(installationData);
    if (transformedOrganization) {
      onAddOrganization(transformedOrganization);
    }
  }, [installationData]);

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
        formHelpers: {
          addOrganization: onAddOrganization,
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
      <EditPanelProvider openOnLoad={!!installation_id} isLoading={isInstallationLoading} project={project}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="h-full overflow-hidden">
          {children}
        </form>
        <ConfirmationModal />
      </EditPanelProvider>
    </EditContext.Provider>
  );
}
