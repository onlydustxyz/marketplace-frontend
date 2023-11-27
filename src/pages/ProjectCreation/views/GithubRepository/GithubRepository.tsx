import { Controller } from "react-hook-form";
import { MultiStepsForm } from "src/pages/ProjectCreation/components/MultiStepsForm";
import { Flex } from "src/components/New/Layout/Flex";
import { FieldCheckbox } from "src/components/New/Field/Checkbox";
import { useCallback, useContext, useMemo } from "react";
import { FieldInput } from "src/components/New/Field/Input";
import SearchLine from "src/icons/SearchLine";
import { useRepositoryCount } from "./hooks/useRepositoryCount";
import { FormInformationCount } from "./components/FormInformationCount";
import { useRepositorySearch } from "./hooks/useRepositorySearch";
import { useIntl } from "src/hooks/useIntl";
import { VerticalListItemCard } from "src/components/New/Cards/VerticalListItemCard";
import { CreateProjectContext } from "../../ProjectCreation.context";
import { sortBy } from "lodash";

export const GithubRepositoryPage = () => {
  const { T } = useIntl();
  const {
    organizations,
    form,
    helpers: { next, prev },
    formFn: { addRepository, removeRepository },
  } = useContext(CreateProjectContext);

  const selectedRepos = form.watch("selectedRepos") || [];
  const search = form.watch("search");
  const selectedReposCounts = useRepositoryCount(organizations, selectedRepos);
  const footerRightElement = FormInformationCount(selectedReposCounts.selected, selectedReposCounts.total);
  const filterOrganizationBySearch = useRepositorySearch(search);
  const filteredOrganizations = useMemo(() => filterOrganizationBySearch(organizations), [organizations]);
  const isSelected = useCallback(
    (repoId: number) => !!selectedRepos.find(repo => repo.repoId === repoId),
    [selectedRepos]
  );
  return (
    <MultiStepsForm
      title={T("project.details.create.repository.title")}
      description={T("project.details.create.repository.description")}
      step={2}
      stepCount={3}
      prev={prev}
      next={next}
      footerRightElement={footerRightElement}
      nextDisabled={!selectedRepos?.length}
      stickyChildren={
        <Controller
          name="search"
          control={form.control}
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
          name="selectedRepos"
          control={form.control}
          render={() => (
            <>
              {filteredOrganizations.length > 0 ? (
                filteredOrganizations.map(organization =>
                  organization.repos.length ? (
                    <VerticalListItemCard
                      key={organization.login}
                      title={organization.name || organization.login || ""}
                      avatarAlt={organization.login || ""}
                      avatarSrc={organization.avatarUrl || ""}
                    >
                      <div className="grid grid-flow-row grid-cols-2 gap-x-5 gap-y-5">
                        {(sortBy(organization.repos, "name") || []).map(repo => (
                          <label
                            key={repo.name}
                            className="flex basis-1/2 cursor-pointer flex-col gap-2 rounded-2xl border border-card-border-heavy bg-card-background-heavy p-5 shadow-heavy"
                          >
                            <Flex justify="start" item="start" direction="col" gap={2}>
                              <Flex justify="between" item="center" className="w-full">
                                <h3 className="h- text-body-m-bold">{repo.name}</h3>
                                <FieldCheckbox
                                  value={isSelected(repo.id)}
                                  name={`repository-${repo.id}`}
                                  fieldClassName={"inline-flex w-auto"}
                                  onChange={() => {
                                    if (!isSelected(repo.id)) {
                                      addRepository({ repoId: repo.id, orgId: organization.id });
                                    } else {
                                      removeRepository({ repoId: repo.id, orgId: organization.id });
                                    }
                                  }}
                                />
                              </Flex>
                              <p
                                className={`text-body-s line-clamp-2 w-full text-greyscale-200 ${
                                  !repo.description && "italic"
                                }`}
                              >
                                {repo.description || T("project.details.overview.repositories.descriptionPlaceholder")}
                              </p>
                            </Flex>
                          </label>
                        ))}
                      </div>
                    </VerticalListItemCard>
                  ) : null
                )
              ) : (
                <p className="text-body-s mb-2">{T("project.details.create.repository.placeholder")}</p>
              )}
            </>
          )}
        />
      </Flex>
    </MultiStepsForm>
  );
};

export default GithubRepositoryPage;
