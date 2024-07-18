import { DateFacadePort } from "./date-facade-port";

export const DateAdapterMock: DateFacadePort = {
  isPast: (_date: Date) => false,
  isFuture: (_date: Date) => false,
  compareAsc: (_dateLeft: Date, _dateRight: Date) => 1,
  compareDesc: (_dateLeft: Date, _dateRight: Date) => 1,
};
