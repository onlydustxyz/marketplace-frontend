import { Popover, Transition } from "@headlessui/react";
import { startOfMonth, startOfWeek, startOfYear } from "date-fns";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { UseMyContributedReposResponse } from "src/api/me/queries";
import FilterIcon from "src/assets/icons/FilterIcon";
import IssueOpen from "src/assets/icons/IssueOpen";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { FilterSelect, Item } from "src/components/FilterSelect/FilterSelect";
import { FormOption, Size as FormOptionSize, Variant } from "src/components/FormOption/FormOption";
import { Datepicker } from "src/components/New/Field/Datepicker";
import { useIntl } from "src/hooks/useIntl";
import EyeLine from "src/icons/EyeLine";
import GitMergeLine from "src/icons/GitMergeLine";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import Refresh from "src/icons/Refresh";
import { GithubContributionType } from "src/types";
import { cn } from "src/utils/cn";

export type Filters = {
  dateRange: DateRange;
  repos: Item[];
  contributors: string[]; // Contributor ids
  types: GithubContributionType[];
};

export function Filter({
  state,
  repos,
  onChange,
}: {
  state: [Filters, Dispatch<SetStateAction<Filters>>];
  repos: UseMyContributedReposResponse["repos"];
  onChange?: (newState: Filters) => void;
}) {
  const [filters, setFilters] = state;

  const { T } = useIntl();
  const [showClear, setShowClear] = useState(false);

  useEffect(() => {
    setShowClear(
      Boolean(
        (filters.dateRange.from && filters.dateRange.to) ||
          filters.types.length ||
          filters.contributors.length ||
          filters.repos.length
      )
    );
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

  function updateRepos(repos: Item[]) {
    setFilters(prevState => {
      const newState = { ...prevState, repos };

      onChange?.(newState);

      return newState;
    });
  }

  function updateDate(dateRange: DateRange) {
    setFilters(prevState => {
      const newState = { ...prevState, dateRange };

      onChange?.(newState);

      return newState;
    });
  }

  function resetFilters() {
    const newState = {
      dateRange: { from: undefined, to: undefined },
      repos: [],
      contributors: [],
      types: [],
    };

    setFilters(newState);
    onChange?.(newState);
  }

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            as={Button}
            type={ButtonType.Secondary}
            size={ButtonSize.Sm}
            pressed={open}
            className={cn({
              "border-spacePurple-200 text-spacePurple-100":
                (filters.dateRange.from && filters.dateRange.to) ||
                filters.types.length ||
                filters.contributors.length ||
                filters.repos.length,
            })}
          >
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
              className="absolute right-0 z-10 flex translate-y-1.5 flex-col divide-y divide-card-border-light rounded-2xl border border-card-border-medium bg-greyscale-900 shadow-xl"
            >
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
                    {T("filter.date.title")}
                  </label>
                  <div>
                    <Datepicker
                      mode="range"
                      value={filters.dateRange}
                      onChange={value => {
                        if (value) updateDate(value);
                      }}
                      periods={[
                        {
                          label: T("common.periods.thisWeek"),
                          value: { from: startOfWeek(new Date(), { weekStartsOn: 1 }), to: new Date() },
                        },
                        {
                          label: T("common.periods.thisMonth"),
                          value: { from: startOfMonth(new Date()), to: new Date() },
                        },
                        {
                          label: T("common.periods.thisYear"),
                          value: { from: startOfYear(new Date()), to: new Date() },
                        },
                        {
                          label: T("common.periods.allTime"),
                          value: { from: new Date(0), to: new Date() },
                        },
                      ]}
                      isElevated
                    />
                  </div>
                </div>
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

              <div className="px-6 py-3">
                <FilterSelect
                  label={T("filter.contributor.title")}
                  icon={className => <GitRepositoryLine className={className} />}
                  tokens={{ zero: "filter.contributor.all", other: "filter.contributor" }}
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
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
