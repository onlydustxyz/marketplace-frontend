import { Controller, useFormContext } from "react-hook-form";
import Link from "src/icons/Link";
import { FieldCombined } from "src/components/New/Field/Combined";
import { FieldImage } from "src/components/New/Field/File";
import { FieldInput } from "src/components/New/Field/Input";
import { FieldTextarea } from "src/components/New/Field/Textarea";
import { Flex } from "src/components/New/Layout/Flex";
import InformationLine from "src/icons/InformationLine";
import { FieldProjectLead } from "src/pages/ProjectCreation/pages/ProjectInformations/components/ProjectLead/ProjectLead";
import { FieldSwitch } from "src/components/New/Field/Switch";
import { useOrganizationSession } from "src/pages/ProjectCreation/commons/hooks/useProjectCreationSession";
import ProjectApi from "src/api/Project";
import { useIntl } from "src/hooks/useIntl";

interface createProjectInformation {
  githubRepoIds: number[];
  projectLead: { invited: number[] };
  inviteGithubUserIdsAsProjectLeads: number[];
  isLookingForContributors: boolean;
  longDescription: string;
  name: string;
  logoUrl?: string;
  moreInfo: {
    url: string;
    value: string;
  };
  shortDescription: string;
}

export function Information() {
  const { T } = useIntl();

  const { control, setValue } = useFormContext();

  const { storedValue: orgsSession, removeValue: removeOrgsSession } = useOrganizationSession();

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
      <Flex direction="col" gap={6} className="w-full">
        <Controller
          name="name"
          control={control}
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
          control={control}
          render={props => <FieldInput {...props.field} {...props.fieldState} label="Short description" />}
        />
        <Controller
          name="longDescription"
          control={control}
          render={props => <FieldTextarea {...props.field} {...props.fieldState} label="Long description" />}
        />
        <Controller
          name="logoUrl"
          control={control}
          render={props => (
            <FieldImage<string>
              {...props.field}
              {...props.fieldState}
              label="Project visual"
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
          control={control}
          render={({ field: { onChange, value } }) => (
            <FieldCombined onChange={onChange} name="moreInfo" label={"More info"} className="gap-2">
              {onChangeField => [
                <FieldInput
                  key="moreInfo.url"
                  name="moreInfo.url"
                  value={value?.url}
                  fieldClassName="flex-1"
                  onChange={event => onChangeField({ ...value, url: event.target.value })}
                  startIcon={({ className }) => <Link className={className} />}
                />,
                <FieldInput
                  key="moreInfo.value"
                  name="moreInfo.value"
                  value={value?.value}
                  fieldClassName="w-[180px] max-w-full"
                  onChange={event => onChangeField({ ...value, value: event.target.value })}
                />,
              ]}
            </FieldCombined>
          )}
        />
        <Controller
          name="projectLead"
          control={control}
          render={({ field: { value, name } }) => (
            <FieldProjectLead
              onChange={({ invited }) => {
                // setValue("inviteGithubUserIdsAsProjectLeads", invited, { shouldDirty: true });
                setValue("projectLead", invited, { shouldDirty: true });
              }}
              id={name}
              value={value}
            />
          )}
        />
        <Controller
          name="isLookingForContributors"
          control={control}
          render={props => (
            <FieldSwitch
              {...props.field}
              {...props.fieldState}
              label="Accept new applications"
              switchLabel="Looking for contributors"
            />
          )}
        />
      </Flex>
    </Flex>
  );
}
