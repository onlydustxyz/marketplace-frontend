import { addDays, eachDayOfInterval, format, isAfter } from "date-fns";
import { MouseEvent, useState } from "react";
import {
  ActiveModifiers,
  CaptionProps,
  DateRange,
  DayPicker,
  DayPickerBase,
  DayPickerProps,
  useNavigation,
} from "react-day-picker";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import ArrowLeftSLine from "src/icons/ArrowLeftSLine";
import ArrowRightSLine from "src/icons/ArrowRightSLine";
import { Period } from "./Field/Datepicker.tsx";

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
    day_selected: "bg-spacePurple-500 !text-greyscale-50",
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

export function useSingleCalendar(defaultValue?: Date) {
  return useState<Date | undefined>(defaultValue);
}

export function useMultipleCalendar(defaultValue?: Date[]) {
  return useState<Date[] | undefined>(defaultValue);
}

export function useRangeCalendar(defaultValue?: DateRange) {
  return useState<DateRange | undefined>(defaultValue);
}

export function Calendar(options: DayPickerProps) {
  const [hoveredMiddle, setHoverMiddle] = useState<Date[]>([]);
  const [hoveredEnd, setHoverEnd] = useState<Date[]>([]);

  function onMouseEnter(day: Date, activeModifiers: ActiveModifiers, e: MouseEvent) {
    if (options.selected) {
      const selected = options?.selected as { from: Date };
      if (selected.from) {
        // if (isAfter(day, selected.from)) {
        //   setHoverMiddle([]);
        // } else if (isAfter(day, addDays(selected.from, 1))) {
        if (isAfter(day, selected.from)) {
          const interval = eachDayOfInterval({
            start: selected.from,
            end: day,
          });

          interval.pop();
          interval.shift();
          setHoverMiddle(interval);
          setHoverEnd([day]);
        }
      }
    }
  }

  console.log("hoveredMiddle", hoveredMiddle);
  return (
    <DayPicker
      {...defaultOptions}
      {...options}
      onDayMouseEnter={onMouseEnter}
      modifiers={{ booked: hoveredMiddle, endHovered: hoveredEnd }}
      modifiersStyles={{
        booked: {
          background: "green",
          transition: "background 0.2s ease-in-out",
        },
        endHovered: {
          background: "blue",
          transition: "background 0.2s ease-in-out",
        },
      }}
    />
  );
}

// Build a tailwind class to do this on react-day-picker lib
//
//     - when button have aria-selected="true" the background should be green
//     - when i hover a button the background should be red
//     - when i hover a button all the child beetwen the button and the button with aria-selected="true" should have a background color blue
//
//     exemple :
//
//     - if i hover the button "2" the button "1" should have a background blue and "2" should have a background color red and the button "selected" should have a blue background
//     - if i hover the button "3" the button "1" & "2" should have a background blue and "3" should have a background color red and the button "selected" should have a blue background
//

//
//     when button "end" is hover the two button in middle should be with a background color red and the button "end" should have a blue background. Button "other" should not have background
//
//     you should use only CSS selector without take care of the inner html content
