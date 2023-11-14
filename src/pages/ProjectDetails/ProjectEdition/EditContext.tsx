import { useApolloClient } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, useEffect } from "react";
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
import { SelectedLeadType } from "src/pages/ProjectCreation/pages/ProjectInformations/components/ProjectLead/ProjectLead";
import { z } from "zod";
import { EditPanelProvider } from "./components/Panel/context";
import transformOrganization from "./utils/transformInstallationToOrganization";

interface EditContextProps {
  project: UseGetProjectBySlugResponse;
  children: React.ReactNode;
}

type Edit = {
  project?: UseGetProjectBySlugResponse;
  form?: UseFormReturn<EditFormData, unknown>;
  formHelpers: {
    addOrganization: (organization: components["schemas"]["ProjectGithubOrganizationResponse"]) => void;
    saveInSession: () => void;
    addRepository: (organizationId: number, repoId: number) => void;
    removeRepository: (organizationId: number, repoId: number) => void;
  };
};

export type EditFormData = components["schemas"]["UpdateProjectRequest"] & {
  organizations: components["schemas"]["ProjectGithubOrganizationResponse"][];
  projectLeads: SelectedLeadType[];
};

export const EditContext = createContext<Edit>({
  form: undefined,
  project: undefined,
  formHelpers: {
    addOrganization: () => null,
    addRepository: () => null,
    saveInSession: () => null,
    removeRepository: () => null,
  },
});

const validationSchema = z.object({
  logoUrl: z.string().optional(),
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
    ignoreContributionsBefore: z.coerce.date(),
  }),
});

export function EditProvider({ children, project }: EditContextProps) {
  const { T } = useIntl();
  const navigate = useNavigate();
  const showToaster = useShowToaster();
  const location = useLocation();
  const client = useApolloClient();

  const [searchParams] = useSearchParams();
  const installation_id = searchParams.get("installation_id") ?? "";

  const { data: installationData, isLoading: isInstallationLoading } = GithubApi.queries.useInstallationById({
    params: { installation_id },
    options: { retry: 1, enabled: !!installation_id },
  });

  const [storedValue, setValue, status, removeValue] = useSessionStorage<
    { form: EditFormData; dirtyFields: Array<keyof EditFormData> } | undefined
  >(`edit-project-${project.slug}`, undefined);

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
      projectLeads: [...project.leaders, ...project.invitedLeaders],
      organizations: project.organizations,
      rewardSettings: project.rewardSettings,
    },
    resolver: zodResolver(validationSchema),
  });

  const onAddOrganization = (organization: components["schemas"]["ProjectGithubOrganizationResponse"]) => {
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

  useEffect(() => {
    if (status === "ready" && storedValue) {
      storedValue.dirtyFields.forEach(field => {
        form.setValue(field, storedValue.form[field], { shouldDirty: true, shouldValidate: true });
      });
    }
  }, [status]);

  useEffect(() => {
    const transformedOrganization = transformOrganization(installationData);
    if (transformedOrganization) {
      onAddOrganization(transformedOrganization);
    }
  }, [installationData]);

  const { mutate: updateProject } = ProjectApi.mutations.useUpdateProject({
    params: { projectId: project?.id, projectSlug: project?.slug },
    options: {
      onSuccess: async data => {
        await client.refetchQueries({ include: ["GetProjectsForSidebar"] });
        showToaster(T("form.toast.success"));
        removeValue();

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
    form.reset(formData);
  };

  return (
    <EditContext.Provider
      value={{
        form,
        project,
        formHelpers: {
          addOrganization: onAddOrganization,
          addRepository: onAddRepository,
          saveInSession: onSaveInSession,
          removeRepository: onRemoveRepository,
        },
      }}
    >
      <EditPanelProvider openOnLoad={!!installation_id} isLoading={isInstallationLoading} project={project}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="h-full overflow-hidden">
          {children}
        </form>
      </EditPanelProvider>
    </EditContext.Provider>
  );
}
