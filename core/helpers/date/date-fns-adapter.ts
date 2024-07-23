import {
  addMinutes as addMinutesDateFns,
  compareAsc,
  compareDesc,
  eachDayOfInterval as eachDayOfIntervalDateFns,
  format as formatDateFns,
  formatDistanceToNowStrict,
  isFuture as isFutureDateFns,
  isPast as isPastDateFns,
  isToday as isTodayDateFns,
} from "date-fns";
import { formatInTimeZone as formatInTimeZoneDateFns } from "date-fns-tz";
import enGB from "date-fns/locale/en-GB";

import { DateFacadePort } from "./date-facade-port";

export const DateFnsAdapter: DateFacadePort = {
  eachDayOfInterval: (start: Date, end: Date) => eachDayOfIntervalDateFns({ start, end }),
  isToday: (date: Date) => isTodayDateFns(date),
  isPast: (date: Date) => isPastDateFns(date),
  isFuture: (date: Date) => isFutureDateFns(date),
  compareAsc: (dateLeft: Date, dateRight: Date) => compareAsc(dateLeft, dateRight),
  compareDesc: (dateLeft: Date, dateRight: Date) => compareDesc(dateLeft, dateRight),
  format: (date: Date, pattern: string) => formatDateFns(date, pattern),
  addMinutes: (date: Date, minutes: number) => addMinutesDateFns(date, minutes),
  formatDistanceToNow: (date: Date) => formatDistanceToNowStrict(date, { addSuffix: true }),
  formatInEuropeTimeZone: (date: Date, pattern: string) =>
    formatInTimeZoneDateFns(date, "Europe/Paris", pattern, { locale: enGB }),
};
