import { Controller } from "react-hook-form";
import { FieldCombined } from "src/components/New/Field/Combined";
import { FieldProjectLead } from "src/pages/ProjectCreation/views/ProjectInformations/components/ProjectLead/ProjectLead";
import { FieldImage } from "src/components/New/Field/File";
import { FieldInput } from "src/components/New/Field/Input";
import { FieldSwitch } from "src/components/New/Field/Switch";
import { FieldTextarea } from "src/components/New/Field/Textarea";
import { Flex } from "src/components/New/Layout/Flex";
import InformationLine from "src/icons/InformationLine";
import Link from "src/icons/Link";
import { MultiStepsForm } from "src/pages/ProjectCreation/components/MultiStepsForm";
import { useContext } from "react";
import ProjectApi from "src/api/Project";
import { useIntl } from "src/hooks/useIntl";
import Button from "src/components/Button";
import CheckLine from "src/icons/CheckLine";
import { CreateProjectContext } from "../../ProjectCreation.context";

export const ProjectInformationsPage = () => {
  const { T } = useIntl();
  const {
    form,
    helpers: { prev },
  } = useContext(CreateProjectContext);

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
        <Button htmlType="submit" disabled={!form.formState.isValid || form.formState.isSubmitting}>
          <CheckLine className="-ml-1 text-2xl" /> {T("common.publish")}
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
            name="moreInfo"
            control={form.control}
            render={({ field: { onChange, value } }) => (
              <FieldCombined
                onChange={onChange}
                name="moreInfo"
                label={T("project.details.create.informations.form.fields.moreInfo.label")}
                className="gap-2"
              >
                {onChangeField => [
                  <FieldInput
                    key="moreInfo.url"
                    name="moreInfo.url"
                    value={value?.url}
                    fieldClassName="flex-1"
                    placeholder={T("project.details.create.informations.form.fields.moreInfo.placeholderLink")}
                    onChange={event => onChangeField({ ...value, url: event.target.value })}
                    startIcon={({ className }) => <Link className={className} />}
                  />,
                  <FieldInput
                    key="moreInfo.value"
                    name="moreInfo.value"
                    value={value?.value}
                    placeholder={T("project.details.create.informations.form.fields.moreInfo.placeholderLabel")}
                    fieldClassName="w-[180px] max-w-full"
                    onChange={event => onChangeField({ ...value, value: event.target.value })}
                  />,
                ]}
              </FieldCombined>
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
