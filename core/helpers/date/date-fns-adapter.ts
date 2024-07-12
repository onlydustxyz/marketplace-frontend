import { isFuture as isFutureDateFns, isPast as isPastDateFns } from "date-fns";

import { DateFacadePort } from "./date-facade-port";

export const DateFnsAdapter: DateFacadePort = {
  isPast: (date: Date) => isPastDateFns(date),
  isFuture: (date: Date) => isFutureDateFns(date),
};
