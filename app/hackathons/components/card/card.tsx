import { format, isSameMonth, isSameYear } from "date-fns";
import Image from "next/image";
import background from "public/images/hackathons-cards-bg.webp";
import { useMemo } from "react";

import { Typography } from "components/layout/typography/typography";

import { TCard } from "./card.types";

export function Card({ title, ...props }: TCard.Props) {
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
      month: format(endDate, "MMMM"),
      year: format(endDate, "yyyy"),
    };

    const sameMonth = isSameMonth(startDate, endDate);
    const sameYear = isSameYear(startDate, endDate);

    // March 18 - 24 2024
    // March 18 - April 24 2024
    // March 18 2024 - March 24 2025

    if (!sameYear && !sameMonth) {
      return `${start.month} ${start.day} - ${end.month}  ${end.day} ${end.year}`;
    }

    if (!sameYear) {
      return `${start.month} ${start.day} - ${end.day} ${end.year}`;
    }

    if (!sameMonth) {
      return `${start.month} ${start.day} - ${end.month}  ${end.day}`;
    }

    return `${start.month} ${start.day} - ${end.day}`;
  }, [props]);

  return (
    <div className="relative z-[1] h-auto w-full cursor-pointer overflow-hidden rounded-[32px] pb-12 pl-16 pr-8 pt-24 outline outline-[6px] outline-card-border-medium">
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
