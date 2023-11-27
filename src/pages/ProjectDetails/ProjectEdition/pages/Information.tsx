import { useContext } from "react";
import { Controller } from "react-hook-form";
import ProjectApi from "src/api/Project";
import { FieldCombined } from "src/components/New/Field/Combined";
import { FieldImage } from "src/components/New/Field/File";
import { FieldInput } from "src/components/New/Field/Input";
import { FieldSwitch } from "src/components/New/Field/Switch";
import { FieldTextarea } from "src/components/New/Field/Textarea";
import { Flex } from "src/components/New/Layout/Flex";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
import InformationLine from "src/icons/InformationLine";
import Link from "src/icons/Link";
import {
  FieldProjectLead,
  SelectedLeadType,
} from "src/pages/ProjectCreation/views/ProjectInformations/components/ProjectLead/ProjectLead";
import { EditContext } from "../EditContext";
import { RewardableContributionsField } from "../RewardableContributionsField";

export function Information() {
  const { T } = useIntl();
  const showToaster = useShowToaster();
  const { form } = useContext(EditContext);

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
        className="border-card-light w-full divide-y divide-card-border-light [&>*:first-child]:pt-0 [&>*:last-child]:pb-0 [&>*]:py-4"
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
          render={({ field: { onChange, value } }) => (
            <FieldCombined
              onChange={onChange}
              name="moreInfos"
              label={T("project.details.edit.informations.fields.moreInfo.label")}
              className="gap-2"
            >
              {onChangeField => [
                <FieldInput
                  key="moreInfos.url"
                  name="moreInfos.url"
                  value={value?.[0].url}
                  fieldClassName="flex-1"
                  onChange={event => {
                    onChangeField([{ ...(value?.[0] || {}), url: event.target.value }]);
                  }}
                  startIcon={({ className }) => <Link className={className} />}
                />,
                <FieldInput
                  key="moreInfos.value"
                  name="moreInfos.value"
                  value={value?.[0].value}
                  placeholder={T("project.details.create.informations.form.fields.moreInfo.placeholderLabel")}
                  fieldClassName=" w-1/3 max-w-full"
                  onChange={event => {
                    onChangeField([{ ...(value?.[0] || {}), value: event.target.value }]);
                  }}
                />,
              ]}
            </FieldCombined>
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
