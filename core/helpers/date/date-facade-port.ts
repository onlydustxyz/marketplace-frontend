export interface DateFacadePort {
  isPast: (date: Date) => boolean;
  isFuture: (date: Date) => boolean;
}
