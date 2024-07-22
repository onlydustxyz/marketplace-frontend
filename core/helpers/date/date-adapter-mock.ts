import { DateFacadePort } from "./date-facade-port";

export const DateAdapterMock: DateFacadePort = {
  eachDayOfInterval: (_start: Date, _end: Date) => [_start, _end],
  isToday: (_date: Date) => false,
  isPast: (_date: Date) => false,
  isFuture: (_date: Date) => false,
  compareAsc: (_dateLeft: Date, _dateRight: Date) => 1,
  compareDesc: (_dateLeft: Date, _dateRight: Date) => 1,
  format: (_date: Date, _pattern: string) => "",
  formatDistanceToNow: (_date: Date) => "",
  formatInEuropeTimeZone: (_date: Date, _pattern: string) => "",
};
