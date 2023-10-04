import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import utc from "dayjs/plugin/utc";

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
