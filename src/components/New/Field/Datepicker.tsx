import { Popover, Transition } from "@headlessui/react";
import { useIntl } from "src/hooks/useIntl";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import CalendarEventLine from "src/icons/CalendarEventLine";
import { cn } from "src/utils/cn";
import { SingleCalendar } from "../Calendar";

type Props = {
  zLayer?: 1 | 2;
};

type SingleProps = {
  mode: "single";
} & Props;

type MultipleProps = {
  mode: "multiple";
} & Props;

type RangeProps = {
  mode: "range";
  ranges: unknown[];
} & Props;

export function Datepicker({ mode = "single", zLayer = 1 }: SingleProps | MultipleProps | RangeProps) {
  const { T } = useIntl();

  function renderCalendar() {
    // if (mode === "multiple") {
    //   return <div>Multiple</div>;
    // }

    // if (mode === "range") {
    //   return <div>Range</div>;
    // }

    return <SingleCalendar />;
  }

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={cn(
              "flex w-full items-center gap-6 rounded-lg border border-greyscale-50/8 bg-white/5 px-2.5 py-1.5 text-greyscale-50 shadow-lg",
              {
                "border-spacePurple-500 bg-spacePurple-900 text-spacePurple-200 outline-double outline-1 outline-spacePurple-500":
                  open,
              }
            )}
          >
            <span className="flex flex-1 items-center gap-2">
              <CalendarEventLine
                className={cn("text-base leading-none", {
                  "text-spacePurple-500": open,
                })}
              />

              <span className="font-walsheim text-sm leading-none">{T("form.datePlaceholder")}</span>
            </span>
            <ArrowDownSLine
              className={cn("text-xl leading-none text-spaceBlue-200", {
                "text-spacePurple-300": open,
              })}
            />
          </Popover.Button>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            className="absolute -left-1.5 -right-1.5 z-10 origin-top translate-y-1.5 overflow-hidden rounded-xl border border-greyscale-50/8 bg-greyscale-800 shadow-lg"
          >
            <Popover.Panel
              className={cn({
                "bg-greyscale-900": zLayer === 1,
                "bg-greyscale-800": zLayer === 2,
              })}
            >
              {/* <ul>
                <li>
                  <button>This week</button>
                </li>
                <li>
                  <button>This month</button>
                </li>
                <li>
                  <button>This year</button>
                </li>
                <li>
                  <button>All time</button>
                </li>
              </ul> */}
              {renderCalendar()}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
