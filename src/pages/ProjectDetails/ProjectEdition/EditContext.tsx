import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useEffect } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { components } from "src/__generated/api";
import ProjectApi from "src/api/Project";
import { useUpdateProjectBody } from "src/api/Project/mutations";
import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import { useIntl } from "src/hooks/useIntl";
import { useSessionStorage } from "src/hooks/useSessionStorage/useSessionStorage";
import { useShowToaster } from "src/hooks/useToaster";
import { SelectedLeadType } from "src/pages/ProjectCreation/pages/ProjectInformations/components/ProjectLead/ProjectLead";
import { z } from "zod";

interface EditContextProps {
  project: UseGetProjectBySlugResponse;
  children: React.ReactNode;
}

type Edit = {
  project?: UseGetProjectBySlugResponse;
  form?: UseFormReturn<EditFormData, unknown>;
  formHelpers: {
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
});

export function EditProvider({ children, project }: EditContextProps) {
  const { T } = useIntl();
  const navigate = useNavigate();
  const showToaster = useShowToaster();
  const queryClient = useQueryClient();

  const [storedValue, setValue, status, removeValue] = useSessionStorage<EditFormData | undefined>(
    `edit-project-${project.slug}`,
    undefined
  );

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
    },
    resolver: zodResolver(validationSchema),
  });

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
    setValue(form.getValues());
  };

  useEffect(() => {
    if (status === "ready" && storedValue) {
      form.reset({ ...storedValue });
    }
  }, [status]);

  // console.log("----DEBUG FORM VALUE ----", form.getValues());
  // console.log("form ERRRO", form.formState.errors);

  const { mutate: updateProject } = ProjectApi.mutations.useUpdateProject({
    params: { projectId: project?.id },
    options: {
      onSuccess: async data => {
        //TODO: replace pathname with project slug
        console.log("data", data);
        showToaster(T("form.toast.success"));
        removeValue();
        queryClient.invalidateQueries();

        // if (id === response .id && slug === response .slug) {
        //   // Don't do anything as the user is on right page
        // } else if (id === response .id && slug !== response .slug) {
        //     navigate("/products/" + response .id + "/" + response .slug);
        // history.replace({ pathname: `/product/${this.props.product.id}`})
        // navigate(to, { replace: true });
        // } else {}
      },
    },
  });

  const onSubmit = (formData: EditFormData) => {
    // console.log("SUBMIT, formData", formData);
    // console.log("FORM VALUES", form.getValues());

    const test: useUpdateProjectBody = {
      ...formData,
      //TODO: rewards settings mapping
      rewardSettings: {
        ignoreCodeReviews: false,
        ignoreContributionsBefore: undefined,
        ignoreIssues: false,
        ignorePullRequests: false,
      },
    };

    updateProject(test);
    form.reset(test);
  };

  return (
    <EditContext.Provider
      value={{
        form,
        project,
        formHelpers: {
          addRepository: onAddRepository,
          saveInSession: onSaveInSession,
          removeRepository: onRemoveRepository,
        },
      }}
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="overflow-hidden">
        {children}
      </form>
    </EditContext.Provider>
  );
}
