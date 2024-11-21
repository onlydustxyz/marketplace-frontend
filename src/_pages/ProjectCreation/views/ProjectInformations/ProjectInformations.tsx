import { useContext } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

import { MultiStepsForm } from "src/_pages/ProjectCreation/components/MultiStepsForm";
import { FieldProjectLead } from "src/_pages/ProjectCreation/views/ProjectInformations/components/ProjectLead/ProjectLead";
import { EcosystemSelect } from "src/_pages/ProjectCreation/views/ProjectInformations/components/ecosystem-select/ecosystem-select";
import { MoreInfosField } from "src/_pages/ProjectDetails/ProjectEdition/pages/Information/components/MoreInfosField";
import ProjectApi from "src/api/Project";
import Button, { ButtonOnBackground } from "src/components/Button";
import { FieldImage } from "src/components/New/Field/FileImage";
import { FieldInput } from "src/components/New/Field/Input";
import { FieldSwitch } from "src/components/New/Field/Switch";
import { FieldTextarea } from "src/components/New/Field/Textarea";
import { Flex } from "src/components/New/Layout/Flex";
import { Spinner } from "src/components/Spinner/Spinner";
import CheckLine from "src/icons/CheckLine";
import InformationLine from "src/icons/InformationLine";

import { ProjectCategoriesSelect } from "components/features/project-categories/project-categories-select/project-categories-select";

import { useIntl } from "hooks/translate/use-translate";

import { CreateProjectContext } from "../../ProjectCreation.context";
import { CreateFormData } from "../../types/ProjectCreationType";

export const ProjectInformationsPage = () => {
  const { T } = useIntl();
  const {
    form,
    ecosystems,
    projectCategories,
    isSubmitting,
    helpers: { prev },
  } = useContext(CreateProjectContext);
  const suggested = form?.watch("categorySuggestions") || [];
  const {
    mutate: uploadProjectLogo,
    isSuccess: successUploadLogo,
    isPending: loadingUploadLogo,
  } = ProjectApi.mutations.useUploadLogo({
    options: {
      onSuccess: data => {
        form.setValue("logoUrl", data.url, { shouldDirty: true, shouldValidate: true });
      },
    },
  });

  return (
    <MultiStepsForm
      title={T("project.details.create.informations.title")}
      step={3}
      stepCount={3}
      submitButton={
        <Button
          htmlType="submit"
          onBackground={ButtonOnBackground.Blue}
          disabled={!form.formState?.isValid || isSubmitting}
          className="w-full md:w-auto"
        >
          {isSubmitting ? <Spinner /> : <CheckLine className="-ml-1 text-2xl" />}
          {T("common.publish")}
        </Button>
      }
      prev={prev}
    >
      <Flex direction="col" gap={8}>
        <Flex direction="col" gap={6} className="w-full">
          <Controller
            name="name"
            control={form.control}
            render={props => (
              <FieldInput
                {...props.field}
                {...props.fieldState}
                label={T("project.details.create.informations.form.fields.name.label")}
                placeholder={T("project.details.create.informations.form.fields.name.placeholder")}
                infoMessage={{
                  children: T("project.details.create.informations.form.fields.name.info"),
                  icon: ({ className }) => <InformationLine className={className} />,
                }}
              />
            )}
          />
          <Controller
            name="shortDescription"
            control={form.control}
            render={props => (
              <FieldInput
                {...props.field}
                {...props.fieldState}
                placeholder={T("project.details.create.informations.form.fields.short.placeholder")}
                label={T("project.details.create.informations.form.fields.short.label")}
              />
            )}
          />
          <Controller
            name="longDescription"
            control={form.control}
            render={props => (
              <FieldTextarea
                {...props.field}
                {...props.fieldState}
                rows={10}
                placeholder={T("project.details.create.informations.form.fields.long.placeholder")}
                label={T("project.details.create.informations.form.fields.long.label")}
              />
            )}
          />
          <Controller
            name="logoUrl"
            control={form.control}
            render={props => (
              <FieldImage
                {...props.field}
                {...props.fieldState}
                placeholder={T("project.details.create.informations.form.fields.logo.placeholder")}
                label={T("project.details.create.informations.form.fields.logo.label")}
                max_size_mo={10}
                upload={{
                  mutate: uploadProjectLogo,
                  success: successUploadLogo,
                  loading: loadingUploadLogo,
                }}
              />
            )}
          />
          <Controller
            name="moreInfos"
            control={form.control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <MoreInfosField
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                {...{ onChange, value, form: form as UseFormReturn<CreateFormData, unknown> as any, error }}
              />
            )}
          />
          <Controller
            name="projectLeads"
            control={form.control}
            render={({ field: { value, name } }) => (
              <FieldProjectLead
                name={name}
                value={{ invited: value, toKeep: [] }}
                onChange={({ invited }) => {
                  form.setValue(
                    "inviteGithubUserIdsAsProjectLeads",
                    invited.map(lead => lead.githubUserId).filter(Boolean) as number[],
                    { shouldDirty: true }
                  );
                  form.setValue("projectLeads", invited, { shouldDirty: true });
                }}
              />
            )}
          />
          <Controller
            name="ecosystems"
            control={form?.control}
            render={({ field: { value, name } }) => (
              <EcosystemSelect
                ecosystems={ecosystems}
                name={name}
                selected={value}
                onChange={selected => {
                  form?.setValue("ecosystems", selected, { shouldDirty: true });
                }}
              />
            )}
          />
          <Controller
            name="projectCategories"
            control={form?.control}
            render={({ field: { value, name } }) => (
              <ProjectCategoriesSelect
                suggested={suggested}
                categories={projectCategories}
                name={name}
                selected={value}
                onChange={selected => {
                  form?.setValue("projectCategories", selected, { shouldDirty: true });
                }}
                onChangeSuggestion={selected => {
                  form?.setValue("categorySuggestions", selected, { shouldDirty: true });
                }}
              />
            )}
          />
          <Controller
            name="isLookingForContributors"
            control={form.control}
            render={props => (
              <FieldSwitch
                {...props.field}
                {...props.fieldState}
                switchLabel={T("project.details.create.informations.form.fields.jobs.subLabel")}
                label={T("project.details.create.informations.form.fields.jobs.label")}
              />
            )}
          />
        </Flex>
      </Flex>
    </MultiStepsForm>
  );
};

export default ProjectInformationsPage;
