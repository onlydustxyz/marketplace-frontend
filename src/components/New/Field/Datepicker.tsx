import { autoUpdate, flip, useFloating } from "@floating-ui/react-dom";
import { Popover, Transition } from "@headlessui/react";
import { isSameDay } from "date-fns";
import { useMemo } from "react";
import { DateRange, DayPickerRangeProps, DayPickerSingleProps } from "react-day-picker";
import { Calendar } from "src/components/New/Calendar";
import { useIntl } from "src/hooks/useIntl";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import CalendarEventLine from "src/icons/CalendarEventLine";
import { cn } from "src/utils/cn";
import { getFormattedDateGB, parseDateRangeString, parseDateString } from "src/utils/date";

type Props = {
  isElevated?: boolean;
};

type SingleProps = Props & {
  mode: "single";
  value?: Date;
  onChange: DayPickerSingleProps["onSelect"];
  periods?: {
    label: string;
    value: Date;
  }[];
};

type RangeProps = Props & {
  mode: "range";
  value?: DateRange;
  onChange: DayPickerRangeProps["onSelect"];
  periods?: {
    label: string;
    value: DateRange;
  }[];
};

// Do not spread props due to this Typescript limitation
// https://stackoverflow.com/questions/69023997/typescript-discriminated-union-narrowing-not-working
export function Datepicker({ isElevated = false, ...props }: SingleProps | RangeProps) {
  const { T } = useIntl();
  const { refs, floatingStyles, placement } = useFloating({
    middleware: [flip()],
    whileElementsMounted: autoUpdate,
    transform: false,
  });

  const selectionIsValid = useMemo(() => {
    if (props.mode === "range") {
      // Sometimes date strings are passed instead of date objects
      const selected = parseDateRangeString(props.value);

      return Boolean(selected?.from) && Boolean(selected?.to);
    }

    // Sometimes date strings are passed instead of date objects
    return Boolean(parseDateString(props.value));
  }, [props.mode, props.value]);

  function renderCalendar({ close }: { close: () => void }) {
    if (props.mode === "range") {
      // Sometimes date strings are passed instead of date objects
      const selected = parseDateRangeString(props.value);

      return (
        <Calendar
          mode="range"
          selected={selected}
          onSelect={(...args) => {
            props.onChange?.(...args);

            const { from, to } = args[0] ?? {};

            if (from && to) close();
          }}
        />
      );
    }

    // Sometimes date strings are passed instead of date objects
    const selected = parseDateString(props.value);

    return (
      <Calendar
        mode="single"
        selected={selected}
        onSelect={(...args) => {
          props.onChange?.(...args);
          close();
        }}
      />
    );
  }

  function renderPlaceholder() {
    if (props.mode === "range") {
      const selectedPeriod = props.periods?.find(period => {
        return props.value?.from && props.value?.to && period.value.from && period.value.to
          ? isSameDay(period.value.from, new Date(props.value.from)) &&
              isSameDay(period.value.to, new Date(props.value.to))
          : false;
      });

      if (selectedPeriod) return selectedPeriod.label;

      return props.value?.from && props.value?.to
        ? `${getFormattedDateGB(new Date(props.value.from))} - ${getFormattedDateGB(new Date(props.value.to))}`
        : T("form.dateRangePlaceholder");
    }

    const selectedPeriod = props.periods?.find(period => {
      return props.value ? isSameDay(period.value, new Date(props.value)) : false;
    });

    if (selectedPeriod) return selectedPeriod.label;

    return props.value ? getFormattedDateGB(new Date(props.value)) : T("form.singleDatePlaceholder");
  }

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            ref={refs.setReference}
            className={cn(
              "flex w-full items-center gap-6 rounded-lg border border-greyscale-50/8 bg-white/5 px-2.5 py-1.5 shadow-lg",
              {
                "border-spacePurple-400 bg-spacePurple-900 text-spacePurple-400 outline-double outline-1 outline-spacePurple-400":
                  open,
                "text-spaceBlue-200": !open && !selectionIsValid,
                "text-greyScale-50": !open && selectionIsValid,
              }
            )}
          >
            <span className="flex flex-1 items-center gap-2">
              <CalendarEventLine className="text-base leading-none" />
              <span className="font-walsheim text-sm leading-none">{renderPlaceholder()}</span>
            </span>
            <ArrowDownSLine className="text-xl leading-none" />
          </Popover.Button>

          <Transition
            ref={refs.setFloating}
            style={{ ...floatingStyles, right: "-6px" }}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            className={cn("z-10 overflow-hidden rounded-xl border border-greyscale-50/8 shadow-lg", {
              "bg-greyscale-800": isElevated,
              "bg-greyscale-900": !isElevated,
              "origin-top translate-y-1.5": placement === "bottom",
              "origin-bottom -translate-y-1.5": placement === "top",
            })}
          >
            <Popover.Panel>
              {({ close }) => (
                <>
                  {props.periods?.length ? (
                    <div className="border-b border-greyscale-50/8 font-walsheim">
                      {props.periods?.map(({ label, value }) => {
                        return (
                          <button
                            key={label}
                            type="button"
                            className="w-full px-4 py-1 text-left text-sm leading-6 text-greyscale-50 first-of-type:pt-2 last-of-type:pb-2 hover:bg-card-background-heavy"
                            onClick={e => {
                              if (props.mode === "single" && value instanceof Date) {
                                props.onChange?.(value, value, {}, e);
                              }

                              // Not ideal, but got to please Typescript
                              if (
                                props.mode === "range" &&
                                "from" in value &&
                                "to" in value &&
                                value.from instanceof Date &&
                                value.to instanceof Date
                              ) {
                                props.onChange?.(value, value.from, {}, e);
                              }

                              close();
                            }}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                  {renderCalendar({ close })}
                </>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
