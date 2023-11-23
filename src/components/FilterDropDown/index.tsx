import { Listbox, Transition } from "@headlessui/react";
import technologyIcon from "assets/img/technology.svg";
import sponsorIcon from "assets/img/circle.png";
import { cn } from "src/utils/cn";
import { useState } from "react";
import ArrowLeftSLine from "src/icons/ArrowLeftSLine";
import Badge, { BadgeSize } from "src/components/Badge";

export enum FilterDropDownIcon {
  Technology = "technology",
  Sponsors = "sponsors",
}

export type Props = {
  icon: FilterDropDownIcon;
  defaultLabel: string;
  selectedLabel: string;
  options: string[];
  dataTestId?: string;
  value: string[];
  setValue: (value: string[]) => void;
};

const ICONS = {
  [FilterDropDownIcon.Technology]: technologyIcon,
  [FilterDropDownIcon.Sponsors]: sponsorIcon,
};

export default function FilterDropDown({
  icon,
  defaultLabel,
  selectedLabel,
  options,
  value,
  setValue,
  dataTestId,
}: Props) {
  const [open, setOpen] = useState(true);

  return (
    <Listbox onChange={setValue} multiple value={value} as="div">
      {({ value }) => (
        <>
          <Listbox.Button
            data-testid={dataTestId}
            onClick={() => setOpen(!open)}
            className="flex w-full items-center justify-between border-b border-greyscale-50/12 py-2 drop-shadow-bottom-sm hover:cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <img className="h-6 w-6" src={ICONS[icon]} />
              <span className="font-walsheim text-sm font-medium text-greyscale-50">
                {value.length > 0 ? selectedLabel : defaultLabel}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {value.length > 0 && <Badge size={BadgeSize.Medium} value={value.length} />}
              <div
                className={cn("transition duration-300", {
                  "-rotate-180": !open,
                  "-rotate-90": open,
                })}
              >
                <ArrowLeftSLine className="font-medium text-greyscale-50" />
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
            <Listbox.Options static as="div" className="flex flex-wrap gap-x-2 gap-y-3 py-3">
              {options.map(option => (
                <Listbox.Option
                  key={option}
                  as="div"
                  value={option}
                  className={cn(
                    "w-fit rounded-lg border border-greyscale-50/8 bg-whiteFakeOpacity-10 px-2 py-1 font-walsheim text-xs font-normal text-neutral-100",
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
