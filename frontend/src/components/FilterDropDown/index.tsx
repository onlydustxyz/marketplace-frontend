import { Listbox, Transition } from "@headlessui/react";
import technologyIcon from "assets/img/technology.svg";
import sponsorIcon from "assets/img/circle.png";
import classNames from "classnames";
import { useState } from "react";
import ArrowLeftSLine from "src/icons/ArrowLeftSLine";
import { ProjectFilterAction, ProjectFilterActionType } from "src/pages/Projects/types";
import Badge, { BadgeSize } from "src/components/Badge";

export type Props = {
  type: ProjectFilterActionType.SelectTechnologies | ProjectFilterActionType.SelectSponsors;
  defaultLabel: string;
  selectedLabel: string;
  options: string[];
  dataTestId?: string;
  value: string[];
  dispatchProjectFilter: (action: ProjectFilterAction) => void;
};

const ICONS = {
  [ProjectFilterActionType.SelectTechnologies]: technologyIcon,
  [ProjectFilterActionType.SelectSponsors]: sponsorIcon,
};

export default function FilterDropDown({
  type,
  defaultLabel,
  selectedLabel,
  options,
  value,
  dispatchProjectFilter,
  dataTestId,
}: Props) {
  const [open, setOpen] = useState(true);

  return (
    <Listbox onChange={(values: string[]) => dispatchProjectFilter({ type, values })} multiple value={value} as="div">
      {({ value }) => (
        <>
          <Listbox.Button
            data-testid={dataTestId}
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between py-2 drop-shadow-bottom-sm border-b border-greyscale-50/12 hover:cursor-pointer"
          >
            <div className="flex gap-2 items-center">
              <img className="w-6 h-6" src={ICONS[type]} />
              <span className="font-medium text-greyscale-50 text-sm font-walsheim">
                {value.length > 0 ? selectedLabel : defaultLabel}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              {value.length > 0 && <Badge size={BadgeSize.Medium} value={value.length} />}
              <div
                className={classNames("transition duration-300", {
                  "-rotate-180": !open,
                  "-rotate-90": open,
                })}
              >
                <ArrowLeftSLine className="text-greyscale-50 font-medium" />
              </div>
            </div>
          </Listbox.Button>
          <Transition
            show={open}
            enter="transition duration-300 ease-out"
            enterFrom="transform -translate-y-1/3 opacity-0"
            enterTo="transform translate-y-0 opacity-100"
            leave="transition duration-300 ease-out"
            leaveFrom="transform translate-y-0 opacity-100"
            leaveTo="transform -translate-y-1/3 opacity-0"
          >
            <Listbox.Options static as="div" className="py-3 flex flex-wrap gap-x-2 gap-y-3">
              {options.map(option => (
                <Listbox.Option
                  key={option}
                  as="div"
                  value={option}
                  className={classNames(
                    "py-1 px-2 w-fit text-neutral-100 font-walsheim font-normal text-xs bg-white/8 border border-greyscale-50/8 rounded-lg",
                    "hover:cursor-pointer",
                    "ui-selected:pseudo-outline-2",
                    "ui-selected:before:z-10",
                    "ui-selected:before:border-spacePurple-500",
                    "ui-selected:border-transparent ui-selected:bg-spacePurple-900"
                  )}
                >
                  {option}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </>
      )}
    </Listbox>
  );
}
