import { format } from "date-fns";

import { TDisplayDate } from "components/features/hackathons/display-date/display-date.types";

export function hackathonShortenDate(props: TDisplayDate.Props) {
  const startDate = new Date(props.startDate);
  const endDate = new Date(props.endDate);
  const start = {
    day: format(startDate, "dd"),
    month: format(startDate, "MMMM"),
    year: format(startDate, "yyyy"),
  };
  const end = {
    day: format(endDate, "dd"),
    month: format(endDate, "MMMM"),
  };

  // March 18 - 24 2024
  // March 18 - April 24 2024
  // March 18 2024 - March 24 2025

  return `${start.month} ${start.day} - ${end.month} ${end.day} ${start.year}`;
}
