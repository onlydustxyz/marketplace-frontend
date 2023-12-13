import { format, isSameDay, parseISO } from "date-fns";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { DateRange } from "react-day-picker";

export const formatDate = (date: Date) => new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date);
export const formatDateTime = (date: Date) =>
  new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeStyle: "medium" }).format(date);
export const formatDateShort = (date: Date) =>
  new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long" }).format(date);

export const daysFromNow = (days: number) => new Date(Date.now() - days * 24 * 3600 * 1000);
export const minutesFromNow = (minutes: number) => new Date(Date.now() - minutes * 60 * 1000);

dayjs.extend(weekOfYear);
dayjs.extend(utc);

export const weekNumber = (date: Date) => dayjs.utc(date).week();

// British date format DD/MM/YYYY
export const getFormattedDateGB = (date: Date) => new Intl.DateTimeFormat("en-GB", { dateStyle: "short" }).format(date);
// American time format HH:MM AM/PM
export const getFormattedTimeUS = (date: Date) => new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(date);
// American date format ex Dec 13, 2023
export const getFormattedTimeDatepicker = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);

/**
 * Parses a date string or Date object and returns a Date object.
 * If the input is undefined or null, returns undefined.
 * @param date - The date string or Date object to parse.
 * @returns The parsed Date object.
 */
export function parseDateString(date?: Date | string) {
  if (!date) return undefined;

  if (date instanceof Date) return date;

  return parseISO(date);
}

/**
 * Parses a date range string and returns a DateRange object.
 * @param dateRange - The date range string or object containing "from" and "to" properties.
 * @returns The parsed DateRange object or undefined if the input is empty.
 */
export function parseDateRangeString(
  dateRange?: DateRange | Partial<Record<"from" | "to", string>>
): DateRange | undefined {
  if (!dateRange) return undefined;

  return {
    from: dateRange.from ? parseDateString(dateRange.from) : undefined,
    to: dateRange.to ? parseDateString(dateRange.to) : undefined,
  };
}

/**
 * Formats a date or string value into a query parameter string in the format "yyyy-MM-dd".
 * @param value - The date or string value to format.
 * @returns The formatted date string.
 */
export function formatDateQueryParam(value: Date | string) {
  return format(value instanceof Date ? value : new Date(value), "yyyy-MM-dd");
}

/**
 * Represents a date range of all time.
 */
export const allTime = { from: new Date(0), to: new Date() } satisfies DateRange;

/**
 * Checks if the given date range represents the "all time" range.
 * @param dateRange - The date range to check.
 * @returns True if the date range represents the "all time" range, false otherwise.
 */
export const isAllTime = (dateRange: DateRange) => {
  if (dateRange?.from && dateRange?.to) {
    return isSameDay(allTime.from, new Date(dateRange.from)) && isSameDay(allTime.to, new Date(dateRange.to));
  }

  return false;
};
