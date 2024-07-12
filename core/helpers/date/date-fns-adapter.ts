import { isFuture as isFutureDateFNS, isPast as isPastDateFNS } from "date-fns";

import { DateFacadePort } from "./date-facade-port";

export const DateFnsAdapter: DateFacadePort = {
  isPast: (date: Date) => isPastDateFNS(date),
  isFuture: (date: Date) => isFutureDateFNS(date),
};
