import { Controller, useForm } from "react-hook-form";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import { FieldCombined } from "src/components/New/Field/Combined";
import { FieldProjectLead } from "src/pages/ProjectCreation/pages/ProjectInformations/components/ProjectLead/ProjectLead";
import { FieldImage } from "src/components/New/Field/File";
import { FieldInput } from "src/components/New/Field/Input";
import { FieldSwitch } from "src/components/New/Field/Switch";
import { FieldTextarea } from "src/components/New/Field/Textarea";
import { Flex } from "src/components/New/Layout/Flex";
import InformationLine from "src/icons/InformationLine";
import Link from "src/icons/Link";
import { MultiStepsForm } from "src/pages/ProjectCreation/commons/components/MultiStepsForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  useInformationSession,
  useOrganizationSession,
  useResetSession,
} from "../../commons/hooks/useProjectCreationSession";
import validationSchema from "./utils/ProjectInformations.validation";
import ProjectApi from "src/api/Project";
import { getSelectedRepoIds } from "./utils/ProjectInformations.utils";
import useMutationAlert from "src/api/useMutationAlert";
import { useIntl } from "src/hooks/useIntl";
import { useProjectCreatePageGuard } from "../../commons/hooks/useProjectCreatePageGuard";
import { generatePath, useNavigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import Button from "src/components/Button";
import CheckLine from "src/icons/CheckLine";

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

export const ProjectInformationsPage = () => {
  const { T } = useIntl();
  const navigate = useNavigate();

  useProjectCreatePageGuard("information");
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { isValid },
  } = useForm<createProjectInformation>({
    mode: "all",
    resolver: zodResolver(validationSchema),
    defaultValues: {
      isLookingForContributors: false,
    },
  });

  const { storedValue: orgsSession } = useOrganizationSession();
  const {
    storedValue: formSession,
    setValue: setFormSession,
    status: formSessionStatus,
  } = useInformationSession<createProjectInformation>();

  const { reset: resetSession } = useResetSession();

  const { mutate, ...restCreateProjectMutation } = ProjectApi.mutations.useCreateProject({
    options: {
      onSuccess: data => {
        resetSession();
        if (data?.projectSlug) {
          navigate(generatePath(RoutePaths.ProjectDetails, { projectKey: data.projectSlug }));
        }
      },
    },
  });

  const {
    mutate: uploadProjectLogo,
    isSuccess: successUploadLogo,
    isPending: loadingUploadLogo,
  } = ProjectApi.mutations.useUploadLogo({
    options: {
      onSuccess: data => {
        setValue("logoUrl", data.url);
      },
    },
  });

  useMutationAlert({
    mutation: restCreateProjectMutation,
    success: {
      message: T("project.details.create.submit.success"),
    },
    error: {
      message: T("project.details.create.submit.error"),
    },
  });

  const onSubmit = (formData: createProjectInformation) => {
    const repoIds = getSelectedRepoIds(orgsSession);
    mutate({
      ...formData,
      isLookingForContributors: formData.isLookingForContributors || false,
      moreInfo: [formData.moreInfo],
      githubRepoIds: repoIds,
    });
  };

  useEffect(() => {
    if (formSessionStatus === "ready") {
      reset({ ...formSession });
    }
  }, [formSessionStatus]);

  useEffect(() => {
    return () => {
      setFormSession(getValues());
    };
  }, []);

  return (
    <Background roundedBorders={BackgroundRoundedBorders.Full} innerClassName="h-full">
      <form className="flex h-full items-center justify-center md:p-6" onSubmit={handleSubmit(onSubmit)}>
        <MultiStepsForm
          title={T("project.details.create.informations.title")}
          step={3}
          stepCount={3}
          submitButton={
            <Button htmlType="submit" disabled={!isValid}>
              <CheckLine className="-ml-1 text-2xl" /> {T("common.publish")}
            </Button>
          }
          prev="../repository"
        >
          <Flex direction="col" gap={8}>
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
                control={control}
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
                control={control}
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
                control={control}
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
                name="projectLead"
                control={control}
                render={({ field: { value, name } }) => (
                  <FieldProjectLead
                    onChange={({ invited }) => {
                      setValue("inviteGithubUserIdsAsProjectLeads", invited, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                    }}
                    githubUserId={name}
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
                    switchLabel={T("project.details.create.informations.form.fields.jobs.subLabel")}
                    label={T("project.details.create.informations.form.fields.jobs.label")}
                  />
                )}
              />
            </Flex>
          </Flex>
        </MultiStepsForm>
      </form>
    </Background>
  );
};

export default ProjectInformationsPage;
