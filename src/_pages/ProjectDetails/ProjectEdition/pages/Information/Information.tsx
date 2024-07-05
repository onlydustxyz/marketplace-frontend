import { useContext } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

import {
  FieldProjectLead,
  SelectedLeadType,
} from "src/_pages/ProjectCreation/views/ProjectInformations/components/ProjectLead/ProjectLead";
import { EcosystemSelect } from "src/_pages/ProjectCreation/views/ProjectInformations/components/ecosystem-select/ecosystem-select";
import ProjectApi from "src/api/Project";
import { FieldImage } from "src/components/New/Field/FileImage";
import { FieldInput } from "src/components/New/Field/Input";
import { FieldSwitch } from "src/components/New/Field/Switch";
import { FieldTextarea } from "src/components/New/Field/Textarea";
import { Flex } from "src/components/New/Layout/Flex";
import { useShowToaster } from "src/hooks/useToaster";
import InformationLine from "src/icons/InformationLine";

import { ProjectCategoriesSelect } from "components/features/project-categories/project-categories-select/project-categories-select";

import { useIntl } from "hooks/translate/use-translate";

import { EditContext, EditFormData } from "../../EditContext";
import { RewardableContributionsField } from "../../RewardableContributionsField";
import { MoreInfosField } from "./components/MoreInfosField";

export function Information() {
  const { T } = useIntl();
  const showToaster = useShowToaster();
  const { form, ecosystems, projectCategories } = useContext(EditContext);

  const {
    mutate: uploadProjectLogo,
    isSuccess: successUploadLogo,
    isPending: loadingUploadLogo,
  } = ProjectApi.mutations.useUploadLogo({
    options: {
      onSuccess: data => {
        showToaster(T("project.details.edit.toasts.logoUpdate"));
        form?.setValue("logoUrl", data.url, { shouldDirty: true });
      },
    },
  });

  function handleProjectLeadsChange({ invited, toKeep }: { invited: SelectedLeadType[]; toKeep: SelectedLeadType[] }) {
    const invitedUsers = invited.map(lead => lead.githubUserId).filter(Boolean) as number[];
    const usersToKeep = toKeep.map(lead => lead.id).filter(Boolean) as string[];

    form?.setValue("inviteGithubUserIdsAsProjectLeads", invitedUsers, { shouldDirty: true });
    form?.setValue("projectLeadsToKeep", usersToKeep, { shouldDirty: true });
    form?.setValue("projectLeads", { invited, toKeep }, { shouldDirty: true });
  }

  return (
    <Flex direction="col" gap={8} className="w-full">
      <Flex
        direction="col"
        className="border-card-light w-full divide-y divide-card-border-light [&>*:first-child]:pt-0 [&>*:last-child]:pb-0 [&>*]:py-6"
      >
        <Controller
          name="name"
          control={form?.control}
          render={props => (
            <FieldInput
              {...props.field}
              {...props.fieldState}
              label={T("project.details.edit.informations.fields.name.label")}
              placeholder={T("project.details.edit.informations.fields.name.placeholder")}
              errorMessage={props.fieldState.error?.message}
              infoMessage={{
                children: T("project.details.edit.informations.fields.name.info"),
                icon: ({ className }) => <InformationLine className={className} />,
              }}
            />
          )}
        />
        <Controller
          name="shortDescription"
          control={form?.control}
          render={props => (
            <FieldInput
              {...props.field}
              {...props.fieldState}
              errorMessage={props.fieldState.error?.message}
              label={T("project.details.edit.informations.fields.short.label")}
            />
          )}
        />
        <Controller
          name="longDescription"
          control={form?.control}
          render={props => (
            <FieldTextarea
              {...props.field}
              {...props.fieldState}
              errorMessage={props.fieldState.error?.message}
              rows={4}
              label={T("project.details.edit.informations.fields.long.label")}
              autogrow
            />
          )}
        />
        <Controller
          name="logoUrl"
          control={form?.control}
          render={props => (
            <FieldImage
              {...props.field}
              {...props.fieldState}
              label={T("project.details.edit.informations.fields.logo.label")}
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
          control={form?.control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <MoreInfosField
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              {...{ onChange, value, form: form as UseFormReturn<EditFormData, unknown> as any, error }}
            />
          )}
        />
        <Controller
          name="projectLeads"
          control={form?.control}
          render={({ field: { value, name } }) => (
            <FieldProjectLead
              name={name}
              value={value}
              onChange={({ invited, toKeep }) => handleProjectLeadsChange({ invited, toKeep })}
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
              categories={projectCategories}
              name={name}
              selected={value}
              onChange={selected => {
                form?.setValue("projectCategories", selected, { shouldDirty: true });
              }}
            />
          )}
        />
        <Controller
          name="rewardSettings"
          control={form?.control}
          render={props => {
            return (
              <RewardableContributionsField
                {...props.field}
                onChange={data => {
                  form?.setValue("rewardSettings", data, { shouldDirty: true });
                }}
              />
            );
          }}
        />
        <Controller
          name="isLookingForContributors"
          control={form?.control}
          render={props => (
            <FieldSwitch
              {...props.field}
              {...props.fieldState}
              label={T("project.details.edit.informations.fields.hire.label")}
              switchLabel={T("project.details.edit.informations.fields.hire.subLabel")}
            />
          )}
        />
      </Flex>
    </Flex>
  );
}
