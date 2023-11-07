import Background, { BackgroundRoundedBorders } from "src/components/Background";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { MultiStepsForm } from "src/pages/ProjectCreation/commons/components/MultiStepsForm";
import { Flex } from "src/components/New/Layout/Flex";
import { FieldCheckbox } from "src/components/New/Field/Checkbox";
import { useEffect } from "react";
import { Avatar } from "src/components/New/Avatar";
import { FieldInput } from "src/components/New/Field/Input";
import SearchLine from "src/icons/SearchLine";
import {
  OrganizationSessionStorageInterface,
  useOrganizationSession,
} from "../../commons/hooks/useProjectCreationSession";
import { useRepositoryCount } from "./hooks/useRepositoryCount";
import { useFormCountInformation } from "./hooks/useFormCountInformation";
import { useRepositorySearch } from "./hooks/useRepositorySearch";
import validationSchema from "./utils/GithubRepository.validation";
import { usePagesGuard } from "../../commons/hooks/usePagesGuard";
import { useNavigate } from "react-router-dom";
import { useIntl } from "src/hooks/useIntl";

type Organization = OrganizationSessionStorageInterface;
export interface createProjectRepository {
  organizations: Organization[];
}

export const GithubRepositoryPage = () => {
  const { T } = useIntl();
  usePagesGuard("repository");

  const {
    storedValue: savedOrgsData,
    setValue: setSavedOrgsData,
    status: savedOrgsDataStatus,
  } = useOrganizationSession();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    getValues,
    reset,
    formState: { isValid },
  } = useForm<createProjectRepository & { search?: string }>({
    mode: "all",
    resolver: zodResolver(validationSchema),
    defaultValues: {
      organizations: [],
    },
  });
  const navigate = useNavigate();

  const organization = watch("organizations") || [];
  const search = watch("search");
  const selectedReposCounts = useRepositoryCount(organization);
  const footerRightElement = useFormCountInformation(selectedReposCounts.selected, selectedReposCounts.total);
  const filterOrganizationBySearch = useRepositorySearch(search);

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

  const onSubmit = (formData: createProjectRepository) => {
    setSavedOrgsData(formData.organizations);
    navigate("../informations");
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

  return (
    <Background roundedBorders={BackgroundRoundedBorders.Full}>
      <form className="flex items-center justify-center p-4 pt-[72px]" onSubmit={handleSubmit(onSubmit)}>
        <MultiStepsForm
          title={T("project.details.create.repository.title")}
          description={T("project.details.create.repository.description")}
          step={2}
          stepCount={3}
          submit
          submitDisabled={!isValid}
          prev="../organizations"
          footerRightElement={footerRightElement}
        >
          <Flex direction="col" gap={8}>
            <Controller
              name="search"
              control={control}
              render={props => (
                <FieldInput
                  placeholder={T("project.details.create.repository.search")}
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
