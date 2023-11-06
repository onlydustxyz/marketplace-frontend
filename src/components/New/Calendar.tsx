import { format } from "date-fns";
import { useState } from "react";
import {
  CaptionProps,
  DateRange,
  DayPicker,
  DayPickerBase,
  DayPickerMultipleProps,
  DayPickerRangeProps,
  DayPickerSingleProps,
  useNavigation,
} from "react-day-picker";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import ArrowLeftSLine from "src/icons/ArrowLeftSLine";
import ArrowRightSLine from "src/icons/ArrowRightSLine";

function CustomCaption(props: CaptionProps) {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  return (
    <div className="flex items-center justify-between gap-1 px-2 py-1">
      <span className="text-sm text-greyscale-50">{format(props.displayMonth, "MMMM yyy")}</span>
      <div className="flex gap-1">
        <Button
          disabled={!previousMonth}
          onClick={() => previousMonth && goToMonth(previousMonth)}
          type={ButtonType.Secondary}
          size={ButtonSize.Xs}
          iconOnly
        >
          <ArrowLeftSLine />
        </Button>

        <Button
          disabled={!nextMonth}
          onClick={() => nextMonth && goToMonth(nextMonth)}
          type={ButtonType.Secondary}
          size={ButtonSize.Xs}
          iconOnly
        >
          <ArrowRightSLine />
        </Button>
      </div>
    </div>
  );
}

const defaultOptions: Omit<DayPickerBase, "mode" | "selected"> = {
  classNames: {
    root: "w-full font-walsheim p-2",
    months: "w-full",
    table: "w-full flex flex-col gap-1",
    head_row: "w-full flex justify-between",
    head_cell: "text-xs text-greyscale-200 font-medium w-8 h-8 flex items-center justify-center",
    tbody: "flex flex-col gap-1",
    row: "w-full flex justify-between",
    cell: "w-8 h-8",
    day: "text-xs text-greyscale-50 w-8 h-8 rounded flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-spacePurple-500",
    day_disabled: "text-greyscale-600",
    day_outside: "text-greyscale-600",
    day_selected: "bg-spacePurple-500",
    day_range_start: "bg-spacePurple-500",
    day_range_end: "bg-spacePurple-500",
    day_range_middle: "!bg-spacePurple-300",
  },
  components: {
    Caption: CustomCaption,
  },
  formatters: {
    formatWeekdayName: day => day.toLocaleDateString("en-US", { weekday: "narrow" }),
  },
  showOutsideDays: true,
  weekStartsOn: 1,
};

export function SingleCalendar({ onSelect, ...options }: Omit<DayPickerSingleProps, "mode" | "selected">) {
  const today = new Date();
  const [day, setDay] = useState<Date | undefined>(today);

  return (
    <DayPicker
      mode="single"
      selected={day}
      onSelect={(day, selectedDate, activeModifiers, e) => {
        setDay(day);
        onSelect?.(day, selectedDate, activeModifiers, e);
      }}
      {...defaultOptions}
      {...options}
    />
  );
}

export function MultipleCalendar({ onSelect, ...options }: Omit<DayPickerMultipleProps, "mode" | "selected">) {
  const [days, setDays] = useState<Date[]>();

  return (
    <DayPicker
      mode="multiple"
      selected={days}
      onSelect={(days, selectedDate, activeModifiers, e) => {
        setDays(days);
        onSelect?.(days, selectedDate, activeModifiers, e);
      }}
      {...defaultOptions}
      {...options}
    />
  );
}

export function RangeCalendar({ onSelect, ...options }: Omit<DayPickerRangeProps, "mode" | "selected">) {
  const [range, setRange] = useState<DateRange | undefined>();

  return (
    <DayPicker
      mode="range"
      selected={range}
      onSelect={(range, selectedDate, activeModifiers, e) => {
        setRange(range);
        onSelect?.(range, selectedDate, activeModifiers, e);
      }}
      {...defaultOptions}
      {...options}
    />
  );
}
