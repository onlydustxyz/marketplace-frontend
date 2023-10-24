import { Controller, useForm } from "react-hook-form";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import { FieldImage } from "src/components/New/Field/File";
import { FieldInput } from "src/components/New/Field/Input";
import { FieldTextarea } from "src/components/New/Field/Textarea";
import { Flex } from "src/components/New/Layout/Flex";
import InformationLine from "src/icons/InformationLine";
import { MultiStepsForm } from "src/pages/ProjectCreation/components/MultiStepsForm";

interface createProjectInformation {
  githubRepoIds: string;
  inviteGithubUserIdsAsProjectLeads: string;
  isLookingForContributors: string;
  longDescription: string;
  name: string;
  image?: string;
  shortDescription: string;
}

export const ProjectInformationsPage = () => {
  const { control } = useForm<createProjectInformation>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: true,
  });

  return (
    <Background roundedBorders={BackgroundRoundedBorders.Full}>
      <form className="flex h-screen items-center justify-center">
        <MultiStepsForm
          title="Tell us about your project!"
          description="Please install the github app on the desired github organisation(s) containing the repositories you want to add."
          step={3}
          stepCount={3}
          next="/create-project/select-repos"
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
            </Flex>
          </Flex>
        </MultiStepsForm>
      </form>
    </Background>
  );
};

export default ProjectInformationsPage;
