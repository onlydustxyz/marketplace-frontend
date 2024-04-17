import Image from "next/image";
import Link from "next/link";
import background from "public/images/hackathons-cards-bg.webp";

import { DisplayDate } from "components/features/hackathons/display-date/display-date";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

import { TCard } from "./card.types";

export function Card({ title, startDate, endDate, slug }: TCard.Props) {
  return (
    <Link href={NEXT_ROUTER.hackathons.details.root(slug)} className="w-full">
      <div className="relative z-[1] h-auto w-full cursor-pointer overflow-hidden rounded-[32px] pb-12 pl-16 pr-8 pt-24 outline outline-[6px] outline-card-border-medium">
        <Image src={background} alt={title} className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="relative z-[1] flex flex-col items-start justify-start gap-3">
          <Typography
            variant="special-label"
            className="uppercase"
            translate={{ token: "v2.pages.hackathons.defaultLocation" }}
          />
          <Typography variant="title-xl">{title}</Typography>
          <DisplayDate endDate={endDate} startDate={startDate} />
        </div>
      </div>
    </Link>
  );
}
