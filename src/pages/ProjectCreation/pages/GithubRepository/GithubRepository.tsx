import Background, { BackgroundRoundedBorders } from "src/components/Background";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { MultiStepsForm } from "src/pages/ProjectCreation/commons/components/MultiStepsForm";
import { Flex } from "src/components/New/Layout/Flex";
import { FieldCheckbox } from "src/components/New/Field/Checkbox";
import { useEffect } from "react";
import { FieldInput } from "src/components/New/Field/Input";
import SearchLine from "src/icons/SearchLine";
import { useOrganizationSession } from "../../commons/hooks/useProjectCreationSession";
import { useRepositoryCount } from "./hooks/useRepositoryCount";
import { FormInformationCount } from "./components/FormInformationCount";
import { useRepositorySearch } from "./hooks/useRepositorySearch";
import validationSchema from "./utils/GithubRepository.validation";
import { useProjectCreatePageGuard } from "../../commons/hooks/useProjectCreatePageGuard";
import { useNavigate } from "react-router-dom";
import { useIntl } from "src/hooks/useIntl";
import Button from "src/components/Button";
import ArrowRightSLine from "src/icons/ArrowRightSLine";
import { OrganizationSessionStorageInterface } from "src/types";
import { VerticalListItemCard } from "src/components/New/Cards/VerticalListItemCard";

type Organization = OrganizationSessionStorageInterface;
export interface createProjectRepository {
  organizations: Organization[];
}

export const GithubRepositoryPage = () => {
  const { T } = useIntl();
  useProjectCreatePageGuard("repository");

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

  const organizations = watch("organizations");
  const search = watch("search");
  const selectedReposCounts = useRepositoryCount(organizations);
  const footerRightElement = FormInformationCount(selectedReposCounts.selected, selectedReposCounts.total);
  const filterOrganizationBySearch = useRepositorySearch(search);

  useEffect(() => {
    if (savedOrgsDataStatus === "ready") {
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

  const onCheckboxChange = (value: boolean, repoId: number | undefined, organizationLogin: string | undefined) => {
    const findOrganization = organizations.find(org => org.organization.login === organizationLogin);

    if (findOrganization && repoId) {
      const findRepo = (findOrganization.organization?.repos || []).find(repo => repo.id === repoId);
      if (findRepo) {
        findRepo.selected = value;
        setValue("organizations", [...organizations], { shouldDirty: true, shouldValidate: true });
        trigger("organizations");
      }
    }
  };

  return (
    <Background roundedBorders={BackgroundRoundedBorders.Full} innerClassName="h-full">
      <form className="flex h-full items-center justify-center md:p-6" onSubmit={handleSubmit(onSubmit)}>
        <MultiStepsForm
          title={T("project.details.create.repository.title")}
          description={T("project.details.create.repository.description")}
          step={2}
          stepCount={3}
          submitButton={
            <Button htmlType="submit" disabled={!isValid}>
              {T("common.next")}
              <ArrowRightSLine className="-mr-2 text-2xl" />
            </Button>
          }
          prev="../organizations"
          footerRightElement={footerRightElement}
          stickyChildren={
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
          }
        >
          <Flex direction="col" gap={8}>
            <Controller
              name="organizations"
              control={control}
              render={({ field: { value } }) => (
                <>
                  {filterOrganizationBySearch(value || []).map(organization => (
                    <VerticalListItemCard
                      key={organization.organization.login}
                      title={organization.organization.login || ""}
                      avatarAlt={organization.organization.login || ""}
                      avatarSrc={organization.organization.avatarUrl || ""}
                    >
                      <div className="grid grid-flow-row grid-cols-2 gap-x-5 gap-y-5">
                        {(organization.organization.repos || []).map(repo =>
                          search && !repo.name?.includes(search) ? null : (
                            <label
                              key={repo.name}
                              className="flex basis-1/2 cursor-pointer flex-col gap-2 rounded-2xl border border-card-border-heavy bg-card-background-heavy p-5 shadow-heavy"
                            >
                              <Flex justify="start" item="start" direction="col" gap={2}>
                                <Flex justify="between" item="center" className="w-full">
                                  <h3 className="h- text-body-m-bold">{repo.name}</h3>
                                  <FieldCheckbox
                                    onChange={value =>
                                      onCheckboxChange(value, repo.id, organization.organization.login)
                                    }
                                    value={repo.selected || false}
                                    name={`repository-${repo.id}`}
                                    fieldClassName={"inline-flex w-auto"}
                                  />
                                </Flex>
                                <p
                                  className={`text-body-s line-clamp-2 w-full text-greyscale-200 ${
                                    !repo.description && "italic"
                                  }`}
                                >
                                  {repo.description ||
                                    T("project.details.overview.repositories.descriptionPlaceholder")}
                                </p>
                              </Flex>
                            </label>
                          )
                        )}
                      </div>
                    </VerticalListItemCard>
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
