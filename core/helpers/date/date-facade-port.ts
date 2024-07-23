export interface DateFacadePort {
  eachDayOfInterval: (start: Date, end: Date) => Date[];
  isToday: (date: Date) => boolean;
  isPast: (date: Date) => boolean;
  isFuture: (date: Date) => boolean;
  compareAsc: (dateLeft: Date, dateRight: Date) => number;
  compareDesc: (dateLeft: Date, dateRight: Date) => number;
  addMinutes: (date: Date, minutes: number) => Date;
  format: (date: Date, pattern: string) => string;
  formatDistanceToNow: (date: Date) => string;
  formatInEuropeTimeZone: (date: Date, pattern: string) => string;
}
