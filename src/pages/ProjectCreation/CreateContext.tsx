import { createContext, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { useIntl } from "src/hooks/useIntl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateFormData } from "./commons/types/ProjectCreationType";
import { useResetSession } from "./commons/hooks/useProjectCreationSession";
import { ProjectCreationSteps } from "./commons/types/ProjectCreationSteps";

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
  formHelpers: {
    saveInSession: () => void;
  };
};

export const CreateContext = createContext<CreateProject>({
  form: {} as UseFormReturn<CreateFormData, unknown>,
  currentStep: ProjectCreationSteps.ORGANIZATIONS,
  formHelpers: {
    saveInSession: () => null,
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

export function CreateProjectProvider({ children, initialProject, formStorage, stepStorage }: CreateContextProps) {
  const { T } = useIntl();
  const [currentStep, setCurrentStep] = useState<ProjectCreationSteps>(ProjectCreationSteps.ORGANIZATIONS);
  const { reset: clearSession } = useResetSession();
  const form = useForm<CreateFormData>({
    mode: "all",
    defaultValues: initialProject || {},
    resolver: zodResolver(validationSchema),
  });

  const onSaveInSession = () => {
    formStorage.setValue(form.getValues());
  };

  const onSubmit = (formData: CreateFormData) => {
    // updateProject(formData);
    // TODO CREATE PROJECT
    form.reset(formData);
  };

  /* -- TODO : SYNC ORGANIZATION (check selected repo and remove or add orga -- */

  /* ----------------------------- TODO : ADD / REMOVE REPO ---------------------------- */

  /* ----------------------------- TODO : ROUTING ---------------------------- */

  return (
    <CreateContext.Provider
      value={{
        form,
        currentStep,
        formHelpers: {
          saveInSession: onSaveInSession,
        },
      }}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </CreateContext.Provider>
  );
}
