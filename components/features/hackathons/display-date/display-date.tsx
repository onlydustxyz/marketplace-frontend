"use client";

import { useMemo } from "react";

import { TDisplayDate } from "components/features/hackathons/display-date/display-date.types";
import { hackathonShortenDate } from "components/features/hackathons/display-date/display-date.utils";
import { Typography } from "components/layout/typography/typography";

export function DisplayDate(props: TDisplayDate.Props) {
  const dateLabel = useMemo(() => {
    return hackathonShortenDate(props);
  }, [props]);

  return <Typography variant="body-l">{dateLabel}</Typography>;
}
