import { createContext } from "react";
import { UseProjectDetailsResponse } from "src/api/Project/queries";
import { UseFormReturn, useForm } from "react-hook-form";
import { components } from "src/__generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface EditContextProps {
  project: UseProjectDetailsResponse;
  children: React.ReactNode;
}

type Edit = {
  project?: UseProjectDetailsResponse;
  form?: UseFormReturn<EditFormData, unknown>;
  formHelpers: {
    addRepository: (organizationId: number, repoId: number) => void;
    removeRepository: (organizationId: number, repoId: number) => void;
  };
};

export type EditFormData = components["schemas"]["UpdateProjectRequest"] & {
  organizations: components["schemas"]["ProjectGithubOrganizationResponse"][];
};

export const EditContext = createContext<Edit>({
  form: undefined,
  project: undefined,
  formHelpers: {
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
  githubRepoIds: z.array(z.number()).min(1),
  projectLeadsToKeep: z.array(z.string()).min(1),
  shortDescription: z.string().min(1),
});

export function EditProvider({ children, project }: EditContextProps) {
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

  return (
    <EditContext.Provider
      value={{
        form,
        project,
        formHelpers: {
          addRepository: onAddRepository,
          removeRepository: onRemoveRepository,
        },
      }}
    >
      {children}
    </EditContext.Provider>
  );
}
