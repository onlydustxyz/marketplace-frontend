import Background, { BackgroundRoundedBorders } from "src/components/Background";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { MultiStepsForm } from "src/pages/ProjectCreation/components/MultiStepsForm";
import { Flex } from "src/components/New/Layout/Flex";
import { FieldCheckbox } from "src/components/New/Field/Checkbox";
import { useCallback, useEffect, useMemo } from "react";
import { GithubRepositoryCountError } from "./GithubRepositoryCountError";
import { GithubRepositoryCount } from "./GithubRepositoryCount";
import { Avatar } from "src/components/New/Avatar";
import { FieldInput } from "src/components/New/Field/Input";
import SearchLine from "src/icons/SearchLine";
import { OrganizationSessionStorageInterface, useOrganizationSession } from "../useProjectCreationSession";

type Organization = OrganizationSessionStorageInterface;
export interface createProjectInformation {
  organizations: Organization[];
}

const validationSchema = z.object({
  organizations: z
    .array(
      z.object({
        repos: z.array(z.object({ githubId: z.number(), selected: z.boolean().optional() })),
      })
    )
    .refine(
      organizations => {
        return organizations.filter(organization => organization.repos.find(repo => repo.selected)).length > 0;
      },
      {
        message: "",
      }
    ),
});

export const GithubRepositoryPage = () => {
  const [savedOrgsData, setSavedOrgsData, savedOrgsDataStatus] = useOrganizationSession();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    getValues,
    reset,
    formState: { isValid },
  } = useForm<createProjectInformation & { search?: string }>({
    mode: "all",
    resolver: zodResolver(validationSchema),
    defaultValues: {
      organizations: [],
    },
  });

  useEffect(() => {
    if (savedOrgsDataStatus === "getted") {
      reset({ organizations: savedOrgsData });
    }
  }, [savedOrgsDataStatus]);

  useEffect(() => {
    return () => {
      const values = getValues();
      setSavedOrgsData(values.organizations);
    };
  }, []);

  const organization = watch("organizations") || [];
  const search = watch("search");

  const onSubmit = (formData: createProjectInformation) => {
    console.log("formData", formData);
  };

  const onCheckboxChange = (value: boolean, repoId: number | undefined, organizationName: string | undefined) => {
    const findOrganization = organization.find(org => org.organization.name === organizationName);

    if (findOrganization && repoId) {
      const findRepo = (findOrganization.repos || []).find(repo => repo.githubId === repoId);
      if (findRepo) {
        findRepo.selected = value;
        setValue("organizations", [...organization], { shouldDirty: true });
        trigger("organizations");
      }
    }
  };

  const selectedReposCounts = useMemo(() => {
    return {
      selected: organization.reduce((acc, org) => {
        return acc + (org.repos || []).filter(repo => repo.selected).length;
      }, 0),
      total: organization.reduce((acc, org) => {
        return acc + (org.repos || []).length;
      }, 0),
    };
  }, [organization]);

  const footerRightElement = useMemo(() => {
    if (selectedReposCounts.selected === 0) {
      return <GithubRepositoryCountError />;
    }

    return <GithubRepositoryCount total={selectedReposCounts.total} selected={selectedReposCounts.selected} />;
  }, [selectedReposCounts]);

  const filterOrganizationBySearch = useCallback(
    (value: Organization[]) => {
      if (!search) {
        return value;
      }

      return value
        .map(org => {
          const findRepos = org.repos?.filter(repo => repo.name?.includes(search));
          if (!findRepos || findRepos.length === 0) {
            return undefined;
          }

          return {
            ...org,
            repos: findRepos,
          };
        })
        .filter(org => org !== undefined) as Organization[];
    },
    [search]
  );

  return (
    <Background roundedBorders={BackgroundRoundedBorders.Full}>
      <form className="flex items-center justify-center p-4 pt-[72px]" onSubmit={handleSubmit(onSubmit)}>
        <MultiStepsForm
          title="Which repositories will you need?"
          description="Only repositories from organization where github app is installed are listed. "
          step={2}
          stepCount={3}
          submit
          submitDisabled={!isValid}
          prev="../organization"
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
              name="organizations"
              control={control}
              render={({ field: { value } }) => (
                <>
                  {filterOrganizationBySearch(value || []).map(organization => (
                    <div
                      key={organization.organization.name}
                      className="flex w-full flex-col gap-3 rounded-2xl border border-card-border-light bg-card-background-light p-5"
                    >
                      <Flex justify="start" item="center" gap={2}>
                        <Avatar
                          src={organization.organization.logoUrl || ""}
                          alt={organization.organization.name || ""}
                          size="6"
                          shape="square"
                        />
                        <p className=" text-sm font-medium uppercase">{organization.organization.name}</p>
                      </Flex>
                      <div className="grid grid-flow-row grid-cols-2 gap-x-5 gap-y-5">
                        {(organization.repos || []).map(repo =>
                          search && !repo.name?.includes(search) ? null : (
                            <label key={repo.name}>
                              <div className="flex basis-1/2 cursor-pointer flex-col gap-2 rounded-2xl border border-card-border-heavy bg-card-background-heavy p-5 shadow-heavy">
                                <Flex justify="start" item="start" direction="col" gap={2}>
                                  <Flex justify="between" item="center" className="w-full">
                                    <h3 className="text-body-m-bold">{repo.name}</h3>
                                    <FieldCheckbox
                                      onChange={value =>
                                        onCheckboxChange(value, repo.githubId, organization.organization.name)
                                      }
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
