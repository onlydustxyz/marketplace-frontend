import { Controller, useForm } from "react-hook-form";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import { FieldCombined } from "src/components/New/Field/Combined";
import { FieldProjectLead } from "src/components/New/Field/Custom/ProjectLead/ProjectLead";
import { FieldImage } from "src/components/New/Field/File";
import { FieldInput } from "src/components/New/Field/Input";
import { FieldTextarea } from "src/components/New/Field/Textarea";
import { Flex } from "src/components/New/Layout/Flex";
import InformationLine from "src/icons/InformationLine";
import Link from "src/icons/Link";
import { MultiStepsForm } from "src/pages/ProjectCreation/components/MultiStepsForm";

interface createProjectInformation {
  githubRepoIds: string;
  inviteGithubUserIdsAsProjectLeads: string;
  isLookingForContributors: string;
  longDescription: string;
  name: string;
  image?: string;
  moreInfo?: {
    url: string;
    value: string;
  };
  shortDescription: string;
}

export const ProjectInformationsPage = () => {
  const { control, handleSubmit } = useForm<createProjectInformation>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    defaultValues: {
      moreInfo: {
        url: "test url",
        value: "test value",
      },
    },
  });

  const onSubmit = (formData: createProjectInformation) => {
    console.log("formData", formData);
  };

  return (
    <Background roundedBorders={BackgroundRoundedBorders.Full}>
      <form className="flex h-screen items-center justify-center" onSubmit={handleSubmit(onSubmit)}>
        <MultiStepsForm
          title="Tell us about your project!"
          description="Please install the github app on the desired github organisation(s) containing the repositories you want to add."
          step={3}
          stepCount={3}
          submit
        >
          <Flex direction="col" gap={8}>
            <Flex direction="col" gap={6}>
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
              <FieldProjectLead />
            </Flex>
          </Flex>
        </MultiStepsForm>
      </form>
    </Background>
  );
};

export default ProjectInformationsPage;
