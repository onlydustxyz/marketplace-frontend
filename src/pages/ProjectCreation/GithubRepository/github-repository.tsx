import Background, { BackgroundRoundedBorders } from "src/components/Background";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { MultiStepsForm } from "src/pages/ProjectCreation/components/MultiStepsForm";
import { Flex } from "src/components/New/Layout/Flex";
import { FieldRepository } from "src/components/New/Field/Custom/RepositorySelector/RepositorySelector";
export interface createProjectInformation {
  githubRepoIds: number[];
}

const validationSchema = z.object({
  githubRepoIds: z.array(z.number()),
});

const fakeData = [
  {
    name: "Madara",
    logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/4137005338789730434.png",
    repos: [
      {
        name: "kakarot",
        shortDescription: "ZK-EVM type 2.5 written in Cairo, leveraging STARK proof system.",
        githubId: 123,
      },
      {
        name: "kakarot2",
        shortDescription: "ZK-EVM type 2.5 written in Cairo, leveraging STARK proof system.",
        githubId: 1232,
      },
      {
        name: "kakarot3",
        shortDescription: "ZK-EVM type 2.5 written in Cairo, leveraging STARK proof system.",
        githubId: 1233,
      },
    ],
  },
  {
    name: "Madara2",
    logoUrl: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/4137005338789730434.png",
    repos: [
      {
        name: "kakarot4",
        shortDescription: "ZK-EVM type 2.5 written in Cairo, leveraging STARK proof system.",
        githubId: 456,
      },
      {
        name: "kakarot5",
        shortDescription: "ZK-EVM type 2.5 written in Cairo, leveraging STARK proof system.",
        githubId: 4562,
      },
      {
        name: "kakarot6",
        shortDescription: "ZK-EVM type 2.5 written in Cairo, leveraging STARK proof system.",
        githubId: 4563,
      },
    ],
  },
];

export const GithubRepositoryPage = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<createProjectInformation>({
    mode: "all",
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = (formData: createProjectInformation) => {
    console.log("formData", formData);
  };

  return (
    <Background roundedBorders={BackgroundRoundedBorders.Full}>
      <form className="flex items-center justify-center p-4 pt-[72px]" onSubmit={handleSubmit(onSubmit)}>
        <MultiStepsForm
          title="Which repositories will you need?"
          description="Only repositories from organisation where github app is installed are listed. "
          step={2}
          stepCount={3}
          submit
          submitDisabled={!isValid}
          prev="../organisation"
        >
          <Flex direction="col" gap={8}>
            <Controller
              name="githubRepoIds"
              control={control}
              render={({ field: { value, name, onChange } }) => (
                <FieldRepository onChange={onChange} id={name} value={value} organisations={fakeData} />
              )}
            />
          </Flex>
        </MultiStepsForm>
      </form>
    </Background>
  );
};

export default GithubRepositoryPage;
