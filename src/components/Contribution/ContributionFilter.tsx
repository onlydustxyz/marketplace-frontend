import { Popover, Transition } from "@headlessui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GithubRepos, Projects } from "src/__generated/graphql";
import FilterIcon from "src/assets/icons/FilterIcon";
import IssueOpen from "src/assets/icons/IssueOpen";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { FilterSelect, Item } from "src/components/FilterSelect/FilterSelect";
import { FormOption, Size as FormOptionSize, Variant } from "src/components/FormOption/FormOption";
import { useIntl } from "src/hooks/useIntl";
import EyeLine from "src/icons/EyeLine";
import FolderLine from "src/icons/FolderLine";
import GitMergeLine from "src/icons/GitMergeLine";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import Refresh from "src/icons/Refresh";
import { GithubContributionType } from "src/types";

export type Filters = {
  types: GithubContributionType[];
  projects: Item[];
  repos: Item[];
};

export function ContributionFilter({
  state,
  loading,
  projects,
  repos,
  onChange,
}: {
  state: [Filters, Dispatch<SetStateAction<Filters>>];
  loading: boolean;
  projects: Projects[];
  repos: GithubRepos[];
  onChange?: (newState: Filters) => void;
}) {
  const [filters, setFilters] = state;

  const { T } = useIntl();
  const [showClear, setShowClear] = useState(false);

  useEffect(() => {
    setShowClear(Boolean(filters.types.length || filters.projects.length || filters.repos.length));
  }, [filters, setShowClear]);

  const typeOptions: { value: GithubContributionType; icon: JSX.Element; label: string }[] = [
    {
      value: GithubContributionType.PullRequest,
      icon: <GitMergeLine />,
      label: T("filter.type.pullRequest"),
    },
    {
      value: GithubContributionType.Issue,
      icon: <IssueOpen className="h-3.5 w-3.5" />,
      label: T("filter.type.issue"),
    },
    {
      value: GithubContributionType.CodeReview,
      icon: <EyeLine />,
      label: T("filter.type.codeReview"),
    },
  ];

  function updateType(type: GithubContributionType) {
    setFilters(prevState => {
      const types = prevState.types.includes(type)
        ? prevState.types.filter(t => t !== type)
        : [...prevState.types, type];

      const newState = { ...prevState, types };

      onChange?.(newState);

      return newState;
    });
  }

  function updateProjects(projects: Item[]) {
    setFilters(prevState => {
      const newState = { ...prevState, projects };

      onChange?.(newState);

      return newState;
    });
  }

  function updateRepos(repos: Item[]) {
    setFilters(prevState => {
      const newState = { ...prevState, repos };

      onChange?.(newState);

      return newState;
    });
  }

  function resetFilters() {
    const newState = {
      types: [],
      projects: [],
      repos: [],
    };

    setFilters(newState);
    onChange?.(newState);
  }

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button as={Button} type={ButtonType.Secondary} size={ButtonSize.Sm} pressed={open}>
            <FilterIcon /> {T("filter.title")}
          </Popover.Button>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            className="origin-top-left"
          >
            <Popover.Panel
              static
              className="absolute right-0 z-10 flex translate-y-1.5 flex-col divide-y divide-greyscale-50/8 rounded-2xl border border-greyscale-50/12 bg-whiteFakeOpacity-8 shadow-xl"
            >
              {loading ? <div className="absolute inset-0 z-10 cursor-progress" /> : null}
              <div className="flex justify-between px-6 py-3">
                <p className="font-belwe text-base text-greyscale-50">{T("filter.title")}</p>
                {showClear ? (
                  <Button type={ButtonType.Ternary} size={ButtonSize.Xs} onClick={resetFilters}>
                    <Refresh />
                    {T("filter.clearButton")}
                  </Button>
                ) : null}
              </div>
              <div className="px-6 py-3">
                <div className="flex flex-col gap-2">
                  <label className="font-walsheim text-sm font-medium uppercase text-spaceBlue-200">
                    {T("filter.type.title")}
                  </label>
                  <div className="flex gap-2">
                    {typeOptions.map(option => (
                      <div className="flex" key={option.value}>
                        <FormOption
                          as="button"
                          size={FormOptionSize.Sm}
                          variant={filters.types.includes(option.value) ? Variant.Active : Variant.Default}
                          onClick={() => {
                            updateType(option.value);
                          }}
                        >
                          <span className="text-base leading-none">{option.icon}</span>
                          {option.label}
                        </FormOption>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 py-3">
                <FilterSelect
                  label={T("filter.project.title")}
                  icon={className => <FolderLine className={className} />}
                  tokens={{ zero: "filter.project.all", other: "filter.project" }}
                  items={projects.map(
                    project => ({ id: project.id, label: project.name, image: project.logoUrl } as Item)
                  )}
                  multiple
                  selected={filters.projects}
                  onChange={value => {
                    const projects = Array.isArray(value) ? value : [value];
                    updateProjects(projects);
                  }}
                  disabled={projects.length <= 1}
                />
              </div>

              <div className="px-6 py-3">
                <FilterSelect
                  label={T("filter.repository.title")}
                  icon={className => <GitRepositoryLine className={className} />}
                  tokens={{ zero: "filter.repository.all", other: "filter.repository" }}
                  items={repos.map(repo => ({ id: repo.id, label: repo.name } as Item))}
                  multiple
                  selected={filters.repos}
                  onChange={value => {
                    const repos = Array.isArray(value) ? value : [value];
                    updateRepos(repos);
                  }}
                  disabled={repos.length <= 1}
                />
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
