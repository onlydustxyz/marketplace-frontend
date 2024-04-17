"use client";

import { format } from "date-fns";
import { useMemo } from "react";

import { TDisplayDate } from "app/hackathons/components/display-date/display-date.types";

import { Typography } from "components/layout/typography/typography";

export function DisplayDate(props: TDisplayDate.Props) {
  const dateLabel = useMemo(() => {
    const startDate = new Date(props.startDate);
    const endDate = new Date(props.endDate);
    const start = {
      day: format(startDate, "dd"),
      month: format(startDate, "MMMM"),
      year: format(startDate, "yyyy"),
    };
    const end = {
      day: format(endDate, "dd"),
    };

    // March 18 - 24 2024
    // March 18 - April 24 2024
    // March 18 2024 - March 24 2025

    return `${start.month} ${start.day} - ${end.day} ${start.year}`;
  }, [props]);

  return <Typography variant="body-l">{dateLabel}</Typography>;
}
