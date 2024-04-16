import { format, isSameMonth, isSameYear } from "date-fns";
import Image from "next/image";
import background from "public/images/hackathons-cards-bg.webp";
import React, { useMemo } from "react";

import { Typography } from "components/layout/typography/typography";

import { TCard } from "./card.types";

export function Card({ title, startDate, endDate }: TCard.Props) {
  const dateLabel = useMemo(() => {
    const startToDate = new Date(startDate);
    const endToDate = new Date(endDate);
    const start = {
      day: format(startToDate, "dd"),
      month: format(startToDate, "MMMM"),
      year: format(startToDate, "yyyy"),
    };
    const end = {
      day: format(endToDate, "dd"),
      month: format(endToDate, "MMMM"),
      year: format(endToDate, "yyyy"),
    };

    const sameMonth = isSameMonth(startToDate, endToDate);
    const sameYear = isSameYear(startToDate, endToDate);

    // March 18 - 24 2024
    // March 18 - April 24 2024
    // March 18 2024 - March 24 2025

    return `${start.month} ${start.day} - ${!sameMonth ? end.month : ""}  ${end.day} ${!sameYear ? end.year : ""}`;
  }, [startDate, endDate]);

  return (
    <div className="relative z-[1] h-auto w-full cursor-pointer overflow-hidden rounded-[32px]  pb-12 pl-16 pr-8 pt-24 outline outline-[6px] outline-card-border-medium">
      <Image src={background} alt={title} className="absolute inset-0 h-full w-full object-cover object-center" />
      <div className="relative z-[1] flex flex-col items-start justify-start gap-3">
        <Typography
          variant="special-label"
          className="uppercase"
          translate={{ token: "v2.pages.settings.hackathons.defaultLocation" }}
        />
        <Typography variant="title-xl">{title}</Typography>
        <Typography variant="body-l">{dateLabel}</Typography>
      </div>
    </div>
  );
}
