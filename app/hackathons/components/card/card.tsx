import Image from "next/image";
import Link from "next/link";
import background from "public/images/hackathons-cards-bg.webp";

import { TCard } from "app/hackathons/components/card/card.types";

import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { DisplayDate } from "components/features/hackathons/display-date/display-date";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

export function Card({ title, startDate, endDate, slug }: TCard.Props) {
  return (
    <Link href={NEXT_ROUTER.hackathons.details.root(slug)} className="group w-full">
      <div className="relative z-[1] h-auto w-full cursor-pointer overflow-hidden rounded-[16px] p-6 outline outline-[6px] outline-card-border-medium md:rounded-[32px] md:pb-12 md:pl-16 md:pr-8 md:pt-24">
        <Image src={background} alt={title} className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="relative z-[1] flex flex-col items-start justify-start gap-3">
          <Typography
            variant="special-label"
            className="uppercase"
            translate={{ token: "v2.pages.hackathons.defaultLocation" }}
          />
          <Typography variant="title-l" className="md:od-text-title-xl">
            {title}
          </Typography>
          <DisplayDate endDate={endDate} startDate={startDate} />
        </div>
      </div>
    </Link>
  );
}

export function CardLoading() {
  return (
    <div className="relative z-[1] h-auto w-full cursor-pointer overflow-hidden rounded-[16px] p-6 md:rounded-[32px] md:pb-12 md:pl-16 md:pr-8 md:pt-24">
      <SkeletonEl width="100%" height="100%" className="absolute inset-0 h-full w-full object-cover object-center" />
      <div className="relative z-[1] flex flex-col items-start justify-start gap-3">
        <SkeletonEl width="70px" height="24px" variant="rounded" color="blue-700" />
        <SkeletonEl width="240px" height="48px" variant="rounded" color="blue-700" />
        <SkeletonEl width="180px" height="24px" variant="rounded" color="blue-700" />
      </div>
    </div>
  );
}
