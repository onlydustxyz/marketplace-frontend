"use client";

import { eachDayOfInterval, format, isAfter } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { CaptionProps, DayPicker, DayPickerBase, DayPickerProps, useNavigation } from "react-day-picker";

import Button, { ButtonSize, ButtonType } from "src/components/Button";
import ArrowLeftSLine from "src/icons/ArrowLeftSLine";
import ArrowRightSLine from "src/icons/ArrowRightSLine";

function CustomCaptionSided(props: CaptionProps) {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  return (
    <div className="flex items-center justify-between gap-1 px-2 py-1">
      {props.displayIndex === 0 ? (
        <Button
          disabled={!previousMonth}
          onClick={() => previousMonth && goToMonth(previousMonth)}
          type={ButtonType.Secondary}
          size={ButtonSize.Xs}
          iconOnly
        >
          <ArrowLeftSLine />
        </Button>
      ) : (
        <div />
      )}
      <span className="text-sm text-greyscale-50">{format(props.displayMonth, "MMMM yyy")}</span>
      {props.displayIndex === 1 ? (
        <Button
          disabled={!nextMonth}
          onClick={() => nextMonth && goToMonth(nextMonth)}
          type={ButtonType.Secondary}
          size={ButtonSize.Xs}
          iconOnly
        >
          <ArrowRightSLine />
        </Button>
      ) : (
        <div />
      )}
    </div>
  );
}
function CustomCaptionGrouped(props: CaptionProps) {
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

const defaultOptions = (
  mode: "single" | "range" | "default" | "multiple" | undefined
): Omit<DayPickerBase, "mode" | "selected"> => ({
  classNames: {
    root: "w-full font-walsheim p-2",
    month: "flex-1",
    months: "flex flex-row gap-2",
    table: "w-full flex flex-col gap-1",
    head_row: "w-full flex justify-between",
    head_cell: "text-xs text-greyscale-200 font-medium w-8 h-8 flex items-center justify-center",
    tbody: "flex flex-col gap-1",
    row: "w-full flex justify-between",
    cell: "w-8 h-8",
    day: "text-xs text-greyscale-50 w-8 h-8 rounded flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-spacePurple-500 hover:bg-spacePurple-500 transition-all ease-in duration-200",
    day_disabled: "text-greyscale-600 pointer-events-none",
    day_outside: "text-greyscale-600 opacity-0",
    day_selected: "bg-spacePurple-500 !text-greyscale-50",
    day_range_start: "bg-spacePurple-500 text-white rounded-r-none",
    day_range_end: "bg-spacePurple-500 text-white rounded-l-none",
    day_range_middle: "!bg-spacePurple-300 text-white rounded-none",
    day_today: "text-spacePurple-300 hover:text-white ",
  },
  components: {
    Caption: mode === "range" ? CustomCaptionSided : CustomCaptionGrouped,
  },
  formatters: {
    formatWeekdayName: day => day.toLocaleDateString("en-US", { weekday: "narrow" }),
  },
  weekStartsOn: 1,
  showOutsideDays: true,
});

export function Calendar(options: DayPickerProps) {
  const [hoveredMiddle, setHoverMiddle] = useState<Date[]>([]);
  const [hoveredEnd, setHoverEnd] = useState<Date[]>([]);
  const [hoveredStart, setHoverStart] = useState<Date[]>([]);

  useEffect(() => {
    if (options.selected) {
      setHoverMiddle([]);
      setHoverEnd([]);
      setHoverStart([]);
    }
  }, [options.selected]);
  function onMouseEnter(day: Date) {
    if (options.mode === "range" && options.selected) {
      const selected = options?.selected as { from: Date; to?: Date };
      if (selected.from && !selected.to) {
        if (isAfter(day, selected.from)) {
          const interval = eachDayOfInterval({
            start: selected.from,
            end: day,
          });

          interval.pop();
          interval.shift();
          setHoverMiddle(interval);

          setHoverEnd([day]);
          setHoverStart([selected.from]);
        } else {
          const interval = eachDayOfInterval({
            start: day,
            end: selected.from,
          });

          interval.pop();
          interval.shift();
          setHoverMiddle(interval);
          setHoverEnd([selected.from]);
          setHoverStart([day]);
        }
      }
    }
  }

  const modifiers = useMemo(
    () => ({
      middleHovered: hoveredMiddle,
      endHovered: hoveredEnd,
      startHover: hoveredStart,
    }),
    [hoveredMiddle, hoveredEnd, hoveredStart]
  );

  const modifiersStyles = useMemo(
    () => ({
      middleHovered: {
        background: "#CE66FF",
        color: "white",
        borderRadius: 0,
      },
      endHovered: {
        background: "#8B00CC",
        color: "white",
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
      startHover: {
        background: "#AE00FF",
        color: "white",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
    }),
    []
  );

  return (
    <DayPicker
      {...defaultOptions(options.mode)}
      {...options}
      onDayMouseEnter={onMouseEnter}
      modifiers={modifiers}
      pagedNavigation
      modifiersStyles={modifiersStyles}
    />
  );
}
