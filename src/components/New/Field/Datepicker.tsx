import { Popover, Transition } from "@headlessui/react";
import { cn } from "src/utils/cn";
import { SingleCalendar } from "../Calendar";

type Props = {
  mode: "single" | "multiple";
};

type RangeProps = {
  mode: "range";
  ranges: unknown[];
};

export function Datepicker({ mode }: Props | RangeProps) {
  function renderCalendar() {
    if (mode === "multiple") {
      return <div>Multiple</div>;
    }

    if (mode === "range") {
      return <div>Range</div>;
    }

    return (
      <div>
        <SingleCalendar />
      </div>
    );
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
            Solutions
          </Popover.Button>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            // className="absolute -left-1.5 -right-1.5 z-10 origin-top translate-y-1.5 overflow-hidden rounded-2xl border border-greyscale-50/12 bg-whiteFakeOpacity-8 shadow-lg"
            className="absolute -left-1.5 -right-1.5 z-10 origin-top translate-y-1.5 rounded-2xl border border-greyscale-50/12 bg-whiteFakeOpacity-8 shadow-lg"
          >
            <Popover.Panel className="absolute z-10">
              <ul>
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
              </ul>

              <div>{renderCalendar()}</div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
