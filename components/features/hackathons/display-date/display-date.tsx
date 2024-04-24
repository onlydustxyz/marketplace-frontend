"use client";

import { useMemo } from "react";

import { TDisplayDate } from "components/features/hackathons/display-date/display-date.types";
import { hackathonShortenDate } from "components/features/hackathons/display-date/display-date.utils";
import { ClientOnly } from "components/layout/client-only/client-only";
import { Typography } from "components/layout/typography/typography";

export function DisplayDate(props: TDisplayDate.Props) {
  const dateLabel = useMemo(() => {
    return hackathonShortenDate(props);
  }, [props]);

  return (
    <ClientOnly>
      <Typography variant="body-l">{dateLabel}</Typography>
    </ClientOnly>
  );
}
