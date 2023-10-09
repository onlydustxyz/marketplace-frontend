import { Listbox, Popover, Transition } from "@headlessui/react";
import { useState } from "react";
import FilterIcon from "src/assets/icons/FilterIcon";
import IssueOpen from "src/assets/icons/IssueOpen";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import EyeLine from "src/icons/EyeLine";
import FolderLine from "src/icons/FolderLine";
import GitMergeLine from "src/icons/GitMergeLine";
import Refresh from "src/icons/Refresh";
import { cn } from "src/utils/cn";

const people = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
];

export function ContributionFilter() {
  const { T } = useIntl();
  const [selectedPerson, setSelectedPerson] = useState([people[0]]);

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
                        <label
                          htmlFor={option.value}
                          className="flex cursor-pointer select-none items-center gap-1 whitespace-nowrap rounded-lg border border-greyscale-50/8 bg-white/8 px-2 py-1 font-walsheim text-xs font-normal leading-none text-neutral-100 peer-checked:border-spacePurple-500 peer-checked:bg-spacePurple-900 peer-checked:text-snow peer-checked:outline-double peer-checked:outline-1 peer-checked:outline-spacePurple-500"
                        >
                          <span className="text-base leading-none">{option.icon}</span>
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="px-6 py-3">
                <div className="flex flex-col gap-2">
                  <label className="font-walsheim text-sm font-medium uppercase text-spaceBlue-200">
                    {T("filter.project.title")}
                  </label>
                  <div className="relative">
                    <Listbox value={selectedPerson} onChange={setSelectedPerson} multiple>
                      {({ open }) => (
                        <>
                          <Listbox.Button
                            className={cn(
                              "flex items-center gap-6 rounded-lg border border-greyscale-50/8 bg-white/5 px-2.5 py-1.5 text-greyscale-50 shadow-lg",
                              {
                                "border-2 border-spacePurple-500 bg-spacePurple-900 text-spacePurple-200": open,
                              }
                            )}
                          >
                            <span className="flex items-center gap-2">
                              <FolderLine
                                className={cn("text-base leading-none", {
                                  "text-spacePurple-500": open,
                                })}
                              />
                              <span className="font-walsheim text-sm leading-none">
                                {selectedPerson.length} selected
                              </span>
                            </span>
                            <ArrowDownSLine className="text-xl leading-none text-spaceBlue-200" />
                          </Listbox.Button>
                          <Listbox.Options className="absolute">
                            {people.map(person => (
                              <Listbox.Option key={person.id} value={person} disabled={person.unavailable}>
                                {({ selected, active }) => (
                                  <>
                                    {
                                      // HTML char check mark if selected
                                      selected ? <>&#10003;</> : null
                                    }
                                    {person.name}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </>
                      )}
                    </Listbox>
                  </div>
                </div>
              </div>
              <div className="px-6 py-3">
                <div className="flex flex-col gap-2">
                  <label className="font-walsheim text-sm font-medium uppercase text-spaceBlue-200">
                    {T("filter.repository.title")}
                  </label>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
