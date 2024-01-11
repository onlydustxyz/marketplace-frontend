import { sortBy } from "lodash";
import { useCallback, useContext, useMemo, useRef } from "react";
import { Controller } from "react-hook-form";

import { MultiStepsForm } from "src/_pages/ProjectCreation/components/MultiStepsForm";
import { VerticalListItemDrop } from "src/components/New/Cards/VerticalListItemDrop";
import { FieldCheckbox } from "src/components/New/Field/Checkbox";
import { FieldInput } from "src/components/New/Field/Input";
import { Flex } from "src/components/New/Layout/Flex";
import { useIntl } from "src/hooks/useIntl";
import { useSearchHotKey } from "src/hooks/useSearchHotKey/useSearchHotKey";
import SearchLine from "src/icons/SearchLine";

import { CreateProjectContext } from "../../ProjectCreation.context";
import { FormInformationCount } from "./components/FormInformationCount";
import { useRepositoryCount } from "./hooks/useRepositoryCount";
import { useRepositorySearch } from "./hooks/useRepositorySearch";

export const GithubRepositoryPage = () => {
  const { T } = useIntl();
  const {
    organizations,
    form,
    helpers: { next, prev },
    formFn: { addRepository, removeRepository },
  } = useContext(CreateProjectContext);
  const searchInputRef = useRef<HTMLInputElement>(null);
  useSearchHotKey({ inputRef: searchInputRef });

  const installedOrganizations = organizations.filter(org => org.installed);

  const selectedRepos = form.watch("selectedRepos") || [];
  const search = form.watch("search");
  const selectedReposCounts = useRepositoryCount(organizations, selectedRepos);
  const footerRightElement = FormInformationCount(selectedReposCounts.selected, selectedReposCounts.total);
  const filterOrganizationBySearch = useRepositorySearch(search);
  const filteredOrganizations = useMemo(
    () => filterOrganizationBySearch(installedOrganizations),
    [organizations, filterOrganizationBySearch]
  );

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
              ref={searchInputRef}
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
                filteredOrganizations.map(organization => (
                  <VerticalListItemDrop
                    key={organization.login}
                    title={organization.name || organization.login || ""}
                    avatarAlt={organization.login || ""}
                    avatarSrc={organization.avatarUrl || ""}
                    variant="BLUE"
                  >
                    {organization.repos.length === 0 ? (
                      <p className="text-body-s mb-2">{T("project.details.create.repository.placeholder")}</p>
                    ) : (
                      <div className="grid grid-flow-row grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2">
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
                                      addRepository({ repoId: repo.id, orgId: organization.githubUserId });
                                    } else {
                                      removeRepository({ repoId: repo.id, orgId: organization.githubUserId });
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
                    )}
                  </VerticalListItemDrop>
                ))
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
