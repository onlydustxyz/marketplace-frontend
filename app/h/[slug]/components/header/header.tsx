import Image from "next/image";
import background from "public/images/hackathons-cards-bg.webp";

import { BackButton } from "app/h/[slug]/components/back-button/back-button";
import { THeader } from "app/h/[slug]/components/header/header.types";
import { Wrapper } from "app/h/[slug]/components/wrapper/wrapper";

import { DisplayDate } from "components/features/hackathons/display-date/display-date";
import { Typography } from "components/layout/typography/typography";

export function Header({ startDate, endDate, title }: THeader.Props) {
  return (
    <div className="relative flex h-full w-full flex-1 flex-col items-start justify-start gap-11 overflow-hidden rounded-t-[32px] pt-8">
      <Image src={background} alt={title} className="absolute inset-0 h-full w-full object-cover object-center" />
      <Wrapper>
        <div className="relative z-[1] flex flex-1 flex-col items-start justify-between gap-1 pb-8">
          <BackButton />
          <div className="relative z-[1] flex flex-col items-start justify-start gap-3">
            <Typography
              variant="special-label"
              className="uppercase transition-opacity group-data-[header-compact=true]:opacity-0"
              translate={{ token: "v2.pages.hackathons.defaultLocation" }}
            />
            <Typography variant="title-xl" className="transition-opacity group-data-[header-compact=true]:opacity-0">
              {title}
            </Typography>
            <div className="transition-opacity group-data-[header-compact=true]:opacity-0">
              <DisplayDate endDate={endDate} startDate={startDate} />
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
