import { Popover, Transition } from "@headlessui/react";
import { DayPickerSingleProps } from "react-day-picker";
import { Calendar } from "src/components/New/Calendar";
import { useIntl } from "src/hooks/useIntl";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import CalendarEventLine from "src/icons/CalendarEventLine";
import { cn } from "src/utils/cn";
import { getFormattedDateGB } from "src/utils/date";

type Props = {
  value?: Date;
  onChange: DayPickerSingleProps["onSelect"];
  isElevated?: boolean;
};

export function Datepicker({ value, isElevated = false, onChange }: Props) {
  const { T } = useIntl();

  function renderCalendar() {
    return <Calendar mode="single" selected={value} onSelect={onChange} />;
  }

  function renderPlaceholder() {
    return value ? getFormattedDateGB(new Date(value)) : T("form.singleDatePlaceholder");
  }

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={cn(
              "flex w-full items-center gap-6 rounded-xl border border-greyscale-50/8 bg-white/5 px-2.5 py-1.5 text-greyscale-50 shadow-lg",
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
              <span className="font-walsheim text-sm leading-none">{renderPlaceholder()}</span>
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
            className={cn(
              "absolute -left-1.5 -right-1.5 z-10 origin-top translate-y-1.5 overflow-hidden rounded-xl border border-greyscale-50/8 shadow-lg",
              isElevated ? "bg-greyscale-800" : "bg-greyscale-900"
            )}
          >
            <Popover.Panel>{renderCalendar()}</Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
