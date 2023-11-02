import Background, { BackgroundRoundedBorders } from "src/components/Background";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { MultiStepsForm } from "src/pages/ProjectCreation/components/MultiStepsForm";
import { Flex } from "src/components/New/Layout/Flex";
import { FieldCheckbox } from "src/components/New/Field/Checkbox";
import { useMemo } from "react";
import { GithubRepositoryCountError } from "./GithubRepositoryCountError";
import { GithubRepositoryCount } from "./GithubRepositoryCount";
export interface createProjectInformation {
  organisations: {
    name: string;
    logoUrl: string;
    repos: {
      githubId: number;
      shortDescription: string;
      name: string;
      selected?: boolean;
    }[];
  }[];
}

const validationSchema = z.object({
  organisations: z
    .array(
      z.object({
        name: z.string(),
        repos: z.array(z.object({ githubId: z.number(), selected: z.boolean().optional() })),
      })
    )
    .refine(
      organisations => {
        const test = organisations.filter(organisation => organisation.repos.find(repo => repo.selected)).length > 0;
        console.log("test", test);
        return organisations.filter(organisation => organisation.repos.find(repo => repo.selected)).length > 0;
      },
      {
        message: "Phone numbers dont match",
      }
    ),
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
        selected: true,
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
    watch,
    setValue,
    trigger,
    formState: { isValid },
  } = useForm<createProjectInformation>({
    mode: "all",
    resolver: zodResolver(validationSchema),
    defaultValues: {
      organisations: fakeData,
    },
  });

  const organisation = watch("organisations") || [];

  const onSubmit = (formData: createProjectInformation) => {
    console.log("formData", formData);
  };

  const onCheckboxChange = (value: boolean, repoId: number, organisationName: string) => {
    const findOrganisation = organisation.find(org => org.name === organisationName);

    if (findOrganisation) {
      const findRepo = findOrganisation.repos.find(repo => repo.githubId === repoId);
      if (findRepo) {
        findRepo.selected = value;
        setValue("organisations", [...organisation], { shouldDirty: true });
        trigger("organisations");
      }
    }
  };

  const selectedReposCounts = useMemo(() => {
    return {
      selected: organisation.reduce((acc, org) => {
        return acc + org.repos.filter(repo => repo.selected).length;
      }, 0),
      total: organisation.reduce((acc, org) => {
        return acc + org.repos.length;
      }, 0),
    };
  }, [organisation]);

  const footerRightElement = useMemo(() => {
    if (selectedReposCounts.selected === 0) {
      return <GithubRepositoryCountError />;
    }

    return <GithubRepositoryCount total={selectedReposCounts.total} selected={selectedReposCounts.selected} />;
  }, [selectedReposCounts]);

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
          footerRightElement={footerRightElement}
        >
          <Flex direction="col" gap={8}>
            <Controller
              name="organisations"
              control={control}
              render={({ field: { value } }) => (
                <>
                  {(value || []).map(organisation => (
                    <div
                      key={organisation.name}
                      className="flex flex-col gap-2 rounded-2xl border border-card-border-light bg-card-background-light p-5"
                    >
                      <div className="grid grid-flow-row grid-cols-2 gap-x-5 gap-y-5">
                        {organisation.repos.map(repo => (
                          <label key={repo.name}>
                            <div className="flex basis-1/2 cursor-pointer flex-col gap-2 rounded-2xl border border-card-border-heavy bg-card-background-heavy p-5 shadow-heavy">
                              <Flex justify="start" item="start" direction="col" gap={2}>
                                <Flex justify="between" item="center" className="w-full">
                                  <h3 className="text-body-m-bold">{repo.name}</h3>
                                  <FieldCheckbox
                                    onChange={value => onCheckboxChange(value, repo.githubId, organisation.name)}
                                    value={repo.selected}
                                    name={`repository-${repo.githubId}`}
                                    fieldClassName={"inline-flex w-auto"}
                                  />
                                </Flex>
                                <p className="text-body-s text-greyscale-200">{repo.shortDescription}</p>
                              </Flex>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
            />
          </Flex>
        </MultiStepsForm>
      </form>
    </Background>
  );
};

export default GithubRepositoryPage;
