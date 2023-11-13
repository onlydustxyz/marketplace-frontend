import { Controller } from "react-hook-form";
import Link from "src/icons/Link";
import { FieldCombined } from "src/components/New/Field/Combined";
import { FieldImage } from "src/components/New/Field/File";
import { FieldInput } from "src/components/New/Field/Input";
import { FieldTextarea } from "src/components/New/Field/Textarea";
import { Flex } from "src/components/New/Layout/Flex";
import InformationLine from "src/icons/InformationLine";
import { FieldProjectLead } from "src/pages/ProjectCreation/pages/ProjectInformations/components/ProjectLead/ProjectLead";
import { FieldSwitch } from "src/components/New/Field/Switch";
import ProjectApi from "src/api/Project";
import { useIntl } from "src/hooks/useIntl";
import { useContext } from "react";
import { EditContext } from "../EditContext";

export function Information() {
  const { T } = useIntl();
  const { form } = useContext(EditContext);

  const {
    mutate: uploadProjectLogo,
    isSuccess: successUploadLogo,
    isPending: loadingUploadLogo,
  } = ProjectApi.mutations.useUploadLogo({
    options: {
      onSuccess: data => {
        // noop
      },
    },
  });

  return (
    <Flex direction="col" gap={8} className="w-full">
      <Flex
        direction="col"
        className={
          "border-card-light  w-full divide-y divide-card-border-light [&>*:first-child]:pt-0 [&>*:last-child]:pb-0 [&>*]:py-4"
        }
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
              label={T("project.details.edit.informations.fields.long.label")}
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
          name="moreInfo"
          control={form?.control}
          render={({ field: { onChange, value } }) => (
            <FieldCombined
              onChange={onChange}
              name="moreInfo"
              label={T("project.details.edit.informations.fields.moreInfo.label")}
              className="gap-2"
            >
              {onChangeField => [
                <FieldInput
                  key="moreInfo.url"
                  name="moreInfo.url"
                  value={value?.[0].url}
                  fieldClassName="flex-1"
                  onChange={event => onChangeField({ ...value, url: event.target.value })}
                  startIcon={({ className }) => <Link className={className} />}
                />,
                <FieldInput
                  key="moreInfo.value"
                  name="moreInfo.value"
                  value={value?.[0].value}
                  fieldClassName="w-[180px] max-w-full"
                  onChange={event => onChangeField({ ...value, value: event.target.value })}
                />,
              ]}
            </FieldCombined>
          )}
        />
        <Controller
          name="projectLeads"
          control={form?.control}
          render={({ field: { value } }) => (
            <FieldProjectLead
              githubUserId="" // check what is this
              onChange={({ invited }) => {
                form?.setValue("projectLeads", invited, { shouldDirty: true });
              }}
              value={{ invited: value }}
            />
          )}
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
