import { autoUpdate, flip, useFloating } from "@floating-ui/react-dom";
import { Popover, Transition } from "@headlessui/react";
import { subMonths } from "date-fns";
import { useMemo, useRef } from "react";
import { DateRange, DayPickerRangeProps, DayPickerSingleProps } from "react-day-picker";
import { useMediaQuery } from "usehooks-ts";

import { Calendar } from "src/components/New/Calendar";
import { viewportConfig } from "src/config";
import { useIntl } from "src/hooks/useIntl";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import CalendarEventLine from "src/icons/CalendarEventLine";
import CheckLine from "src/icons/CheckLine";
import { cn } from "src/utils/cn";
import { getFormattedDateGB, getFormattedTimeDatepicker, parseDateRangeString, parseDateString } from "src/utils/date";

export enum Period {
  ThisWeek = "this_week",
  ThisMonth = "this_month",
  LastMonth = "last_month",
  Last6Months = "last_6_months",
  ThisYear = "this_year",
  LastYear = "last_year",
  AllTime = "all_time",
  Forever = "forever",
  Custom = "custom",
}

type BaseProps = {
  isElevated?: boolean;
  autoCloseOnDateSelect?: boolean;
  autoCloseOnPeriodeSelect?: boolean;
  disableFuture?: boolean;
};

type SingleProps = BaseProps & {
  mode: "single";
  value?: Date;
  onChange: DayPickerSingleProps["onSelect"];
};

type RangeProps = BaseProps & {
  mode: "range";
  value?: DateRange;
  onChange: DayPickerRangeProps["onSelect"];
};

type ModeProps = SingleProps | RangeProps;

type WithPeriodProps = ModeProps & {
  selectedPeriod: Period;
  onPeriodChange: (period: Period) => void;
  periods: {
    id: Period;
    label: string;
    value: Date | DateRange;
    isActive: boolean;
  }[];
};

type WithoutPeriodProps = ModeProps & {
  selectedPeriod?: never;
  onPeriodChange?: never;
  periods?: never;
};

type Props = WithPeriodProps | WithoutPeriodProps;

// Do not spread props due to this Typescript limitation
// https://stackoverflow.com/questions/69023997/typescript-discriminated-union-narrowing-not-working
export function Datepicker({
  isElevated = false,
  autoCloseOnDateSelect = true,
  autoCloseOnPeriodeSelect = true,
  ...props
}: Props) {
  const calendarRef = useRef(null);
  const isMd = useMediaQuery(`(max-width: ${viewportConfig.breakpoints.md}px)`);
  const { T } = useIntl();
  const { refs, floatingStyles, placement } = useFloating({
    middleware: [flip()],
    whileElementsMounted: autoUpdate,
    transform: false,
    placement: props.mode === "range" && !isMd ? "top-end" : undefined,
  });

  // This is useful if a date range only has one of two values for example
  const selectionIsValid = useMemo(() => {
    if (props.mode === "range") {
      // Sometimes date strings are passed instead of date objects
      const selected = parseDateRangeString(props.value);

      return Boolean(selected?.from) && Boolean(selected?.to);
    }

    // Sometimes date strings are passed instead of date objects
    return Boolean(parseDateString(props.value));
  }, [props.mode, props.value]);

  // If a period is selected use the period's value, otherwise use the custom value
  const selectedValue = useMemo(() => {
    if (props.selectedPeriod !== Period.Custom && props.periods) {
      return props.periods.find(({ id }) => id === props.selectedPeriod)?.value;
    }

    return props.value;
  }, [props.selectedPeriod, props.periods, props.value]);

  // Type guard to check if selectedValue is a DateRange
  const selectedDateRange = useMemo(() => {
    if (!(selectedValue instanceof Date)) {
      return selectedValue;
    }

    return undefined;
  }, [selectedValue]);

  // Type guard to check if selectedValue is a Date
  const selectedDate = useMemo(() => {
    if (selectedValue instanceof Date) {
      return selectedValue;
    }

    return undefined;
  }, [selectedValue]);

  function renderCalendar({ close }: { close: () => void }) {
    if (props.mode === "range") {
      return (
        <Calendar
          mode="range"
          numberOfMonths={!isMd ? 2 : 1}
          pagedNavigation
          defaultMonth={subMonths(new Date(), 1)}
          // Sometimes date strings are passed instead of date objects
          selected={props.selectedPeriod === Period.Custom ? parseDateRangeString(selectedDateRange) : undefined}
          {...(props.disableFuture ? { toDate: new Date() } : {})}
          onSelect={(...args) => {
            if (selectedDateRange?.from && selectedDateRange?.to) {
              // If we already have a valid date range and the user selects a new date, we want to reset the date range
              const [, selectedDay, ...restArgs] = args;

              props.onChange?.({ from: selectedDay, to: undefined }, selectedDay, ...restArgs);
            } else if (args[0]?.to) {
              props.onChange?.(...args);
              if (autoCloseOnDateSelect) {
                close();
              }
            }

            props.onPeriodChange?.(Period.Custom);
          }}
        />
      );
    }

    return (
      <Calendar
        mode="single"
        // Sometimes date strings are passed instead of date objects
        selected={parseDateString(selectedDate)}
        onSelect={(...args) => {
          props.onChange?.(...args);
          props.onPeriodChange?.(Period.Custom);
          close();
        }}
      />
    );
  }

  function renderPlaceholder() {
    const selectedPeriod = props.periods?.find(({ id }) => id === props.selectedPeriod);

    if (selectionIsValid && selectedPeriod) {
      return selectedPeriod.label;
    }

    if (props.mode === "range") {
      if (props.value?.from || props.value?.to) {
        const from = props.value?.from ? getFormattedTimeDatepicker(new Date(props.value.from)) : "";
        const to = props.value?.to ? getFormattedTimeDatepicker(new Date(props.value.to)) : "";

        return `${from} - ${to}`;
      }

      return T("form.dateRangePlaceholder");
    }

    return props.value ? getFormattedDateGB(new Date(props.value)) : T("form.singleDatePlaceholder");
  }

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            ref={refs.setReference}
            className={cn(
              "relative right-0 z-20 flex w-full origin-right items-center gap-6 rounded-lg border border-greyscale-50/8 bg-white/5 px-2.5 py-1.5 shadow-lg duration-200 ease-out transition-all",
              {
                "border-spacePurple-400 bg-spacePurple-900 text-spacePurple-400 outline-double outline-1 outline-spacePurple-400":
                  open,
                "text-spaceBlue-200": !open && !selectionIsValid,
                "text-greyScale-50": !open && selectionIsValid,
              },
              {
                "w-[500px] min-w-full max-w-full": open && props.mode === "range",
                "w-[284px] min-w-full max-w-full": !open && props.mode === "range",
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
            style={{
              ...floatingStyles,
              ...(props.mode === "single"
                ? { right: "-6px" }
                : {
                    ...(placement === "bottom" || !isMd
                      ? { top: "-12px" }
                      : { top: (floatingStyles.top as number) + 45 }),
                    left: "-12px",
                  }),
              ...(isMd
                ? {
                    position: "sticky",
                    transform: "translateX(-12px) translateY(-44px)",
                  }
                : {}),
            }}
            enter="transition duration-150 ease-out delay-75"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            className={cn(
              "z-10 min-w-full rounded-xl border border-greyscale-50/8 shadow-lg",
              {
                "bg-greyscale-800": isElevated,
                "bg-greyscale-900": !isElevated,
                "origin-top translate-y-1.5": placement === "bottom",
                "origin-bottom -translate-y-1.5": placement === "top",
              },
              { "w-[calc(100%_+_24px)]": props.mode === "range" }
            )}
          >
            <Popover.Panel ref={calendarRef}>
              {({ close }) => (
                <div
                  className={cn({
                    "pt-[54px]": props.mode === "range" && (placement === "bottom" || !isMd),
                    "pb-[54px]": props.mode === "range" && placement === "top",
                  })}
                >
                  {props.periods?.length ? (
                    <div className="divide-y divide-card-border-medium border-b border-greyscale-50/8 font-walsheim">
                      {props.periods?.map(({ id, label, value, isActive }) => {
                        return (
                          <button
                            key={id}
                            type="button"
                            className="flex w-full items-center justify-between px-4 py-1 text-left text-sm leading-6 text-greyscale-50 first-of-type:pt-2 last-of-type:pb-2 hover:bg-card-background-heavy"
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

                              props.onPeriodChange(id);

                              if (autoCloseOnPeriodeSelect) {
                                close();
                              }
                            }}
                          >
                            <span>{label}</span>
                            {isActive ? <CheckLine className="text-xl leading-none" /> : null}
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                  {renderCalendar({ close })}
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
