import { Popover, Transition } from "@headlessui/react";
import FilterIcon from "src/assets/icons/FilterIcon";
import IssueOpen from "src/assets/icons/IssueOpen";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { FilterSelect } from "src/components/FilterSelect/FilterSelect";
import { FormOption, Size as FormOptionSize } from "src/components/FormOption/FormOption";
import { useIntl } from "src/hooks/useIntl";
import EyeLine from "src/icons/EyeLine";
import FolderLine from "src/icons/FolderLine";
import GitMergeLine from "src/icons/GitMergeLine";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import Refresh from "src/icons/Refresh";

export function ContributionFilter() {
  const { T } = useIntl();

  const typeOptions = [
    {
      value: "pull_request",
      icon: <GitMergeLine />,
      label: T("filter.type.pullRequest"),
    },
    {
      value: "issue",
      icon: <IssueOpen className="h-3.5 w-3.5" />,
      label: T("filter.type.issue"),
    },
    {
      value: "code_review",
      icon: <EyeLine />,
      label: T("filter.type.codeReview"),
    },
  ];

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
              <div className="flex justify-between px-6 py-3">
                <p className="font-belwe text-base text-greyscale-50">{T("filter.title")}</p>
                {/* TODO only show when filter selected */}
                <Button type={ButtonType.Ternary} size={ButtonSize.Xs}>
                  <Refresh />
                  {T("filter.clearButton")}
                </Button>
              </div>
              <div className="px-6 py-3">
                <div className="flex flex-col gap-2">
                  <label className="font-walsheim text-sm font-medium uppercase text-spaceBlue-200">
                    {T("filter.type.title")}
                  </label>
                  <div className="flex gap-2">
                    {typeOptions.map(option => (
                      <div className="flex" key={option.value}>
                        <input type="checkbox" id={option.value} className="peer hidden" value={option.value} />
                        <FormOption as="label" htmlFor={option.value} size={FormOptionSize.Sm}>
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
                  items={[
                    { id: 1, label: "Durward Reynolds", image: null },
                    { id: 2, label: "Kenton Towne", image: null },
                    { id: 3, label: "Therese Wunsch", image: null },
                    { id: 4, label: "Benedict Kessler", image: null },
                    { id: 5, label: "Katelyn Rohan", image: null },
                  ]}
                  multiple
                />
              </div>
              <div className="px-6 py-3">
                <FilterSelect
                  label={T("filter.repository.title")}
                  icon={className => <GitRepositoryLine className={className} />}
                  tokens={{ zero: "filter.repository.all", other: "filter.repository" }}
                  items={[
                    { id: 10, label: "Durward Reynolds" },
                    { id: 20, label: "Kenton Towne" },
                    { id: 30, label: "Therese Wunsch" },
                    { id: 40, label: "Benedict Kessler" },
                    { id: 50, label: "Katelyn Rohan" },
                  ]}
                  multiple
                />
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
