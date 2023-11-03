import Background, { BackgroundRoundedBorders } from "src/components/Background";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { MultiStepsForm } from "src/pages/ProjectCreation/components/MultiStepsForm";
import { Flex } from "src/components/New/Layout/Flex";
import { FieldCheckbox } from "src/components/New/Field/Checkbox";
import { useCallback, useMemo } from "react";
import { GithubRepositoryCountError } from "./GithubRepositoryCountError";
import { GithubRepositoryCount } from "./GithubRepositoryCount";
import { Avatar } from "src/components/New/Avatar";
import { FieldInput } from "src/components/New/Field/Input";
import SearchLine from "src/icons/SearchLine";

interface Organisation {
  name: string;
  logoUrl: string;
  repos: {
    githubId: number;
    shortDescription: string;
    name: string;
    selected?: boolean;
  }[];
}
export interface createProjectInformation {
  organisations: Organisation[];
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
        return organisations.filter(organisation => organisation.repos.find(repo => repo.selected)).length > 0;
      },
      {
        message: "",
      }
    ),
});

export const fakeRepoData = [
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
        selected: true,
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
        selected: true,
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
  } = useForm<createProjectInformation & { search?: string }>({
    mode: "all",
    resolver: zodResolver(validationSchema),
    defaultValues: {
      organisations: fakeRepoData,
    },
  });

  const organisation = watch("organisations") || [];
  const search = watch("search");

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

  const filterOrganizationBySearch = useCallback(
    (value: Organisation[]) => {
      if (!search) {
        return value;
      }

      return value
        .map(org => {
          const findRepos = org.repos.filter(repo => repo.name.includes(search));
          if (findRepos.length === 0) {
            return undefined;
          }

          return {
            ...org,
            repos: findRepos,
          };
        })
        .filter(org => org !== undefined) as Organisation[];
    },
    [search]
  );
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
              name="search"
              control={control}
              render={props => (
                <FieldInput
                  placeholder="Search repository"
                  {...props.field}
                  {...props.fieldState}
                  startIcon={({ className }) => <SearchLine className={className} />}
                />
              )}
            />
            <Controller
              name="organisations"
              control={control}
              render={({ field: { value } }) => (
                <>
                  {filterOrganizationBySearch(value || []).map(organisation => (
                    <div
                      key={organisation.name}
                      className="flex flex-col gap-3 rounded-2xl border border-card-border-light bg-card-background-light p-5"
                    >
                      <Flex justify="start" item="center" gap={2}>
                        <Avatar src={organisation.logoUrl} alt={organisation.name} size="6" shape="square" />
                        <p className=" text-sm font-medium uppercase">{organisation.name}</p>
                      </Flex>
                      <div className="grid grid-flow-row grid-cols-2 gap-x-5 gap-y-5">
                        {organisation.repos.map(repo =>
                          search && !repo.name.includes(search) ? null : (
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
                          )
                        )}
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
