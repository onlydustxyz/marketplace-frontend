import { Controller, useForm } from "react-hook-form";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import { FieldCombined } from "src/components/New/Field/Combined";
import { FieldProjectLead } from "src/components/New/Field/Custom/ProjectLead/ProjectLead";
import { FieldImage } from "src/components/New/Field/File";
import { FieldInput } from "src/components/New/Field/Input";
import { FieldSwitch } from "src/components/New/Field/Switch";
import { FieldTextarea } from "src/components/New/Field/Textarea";
import { Flex } from "src/components/New/Layout/Flex";
import InformationLine from "src/icons/InformationLine";
import Link from "src/icons/Link";
import { MultiStepsForm } from "src/pages/ProjectCreation/components/MultiStepsForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useInformationSession, useOrganizationSession } from "../../hooks/useProjectCreationSession";
import validationSchema from "./utils/ProjectInformations.validation";
import ProjectApi from "src/api/Project";
import { getSelectedRepoIds } from "./utils/ProjectInformations.utils";
import { usePagesControl } from "../../hooks/usePagesControl";

interface createProjectInformation {
  githubRepoIds: number[];
  projectLead: { invited: number[] };
  inviteGithubUserIdsAsProjectLeads: number[];
  isLookingForContributors: boolean;
  longDescription: string;
  name: string;
  image?: File;
  moreInfo: {
    url: string;
    value: string;
  };
  shortDescription: string;
}

export const ProjectInformationsPage = () => {
  usePagesControl("information");
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
  });

  const [savedOrgsData] = useOrganizationSession();
  const [savedFormData, setSavedFormData, savedFormDataStatus] = useInformationSession<createProjectInformation>();
  const { mutate } = ProjectApi.mutations.useCreateProject({});

  useEffect(() => {
    if (savedFormDataStatus === "getted") {
      reset({ ...savedFormData, image: undefined });
    }
  }, [savedFormDataStatus]);

  const onSubmit = (formData: createProjectInformation) => {
    const repoIds = getSelectedRepoIds(savedOrgsData);
    mutate({
      ...formData,
      moreInfo: [formData.moreInfo],
      githubRepoIds: repoIds,
    });
  };

  useEffect(() => {
    return () => {
      setSavedFormData(getValues());
    };
  }, []);

  return (
    <Background roundedBorders={BackgroundRoundedBorders.Full}>
      <form className="flex items-center justify-center p-4 pt-[72px]" onSubmit={handleSubmit(onSubmit)}>
        <MultiStepsForm
          title="Tell us about your project!"
          description="Please install the github app on the desired github organisation(s) containing the repositories you want to add."
          step={3}
          stepCount={3}
          submit
          submitDisabled={!isValid}
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
                    label="Project name"
                    infoMessage={{
                      children: "This will be used to define your project URL",
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
                name="image"
                control={control}
                render={props => <FieldImage {...props.field} {...props.fieldState} label="Project visual" />}
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
                      setValue("inviteGithubUserIdsAsProjectLeads", invited, { shouldDirty: true });
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
        </MultiStepsForm>
      </form>
    </Background>
  );
};

export default ProjectInformationsPage;
