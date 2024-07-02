import Link from "next/link";

import { THeader } from "app/h/[slug]/components/header/header.types";

import { Button } from "components/atoms/button/variants/button-default";
import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { HackathonCard } from "components/features/hackathons/hackathon-card";
import { getHackathonBackground } from "components/features/hackathons/hackathon-card/hackathon-card.utils";
import { Translate } from "components/layout/translate/translate";

import { NEXT_ROUTER } from "constants/router";

export function Header({ title, status, startDate, projects }: THeader.Props) {
  return (
    <div className="flex w-full flex-col gap-3">
      <Button
        as={Link}
        htmlProps={{ href: NEXT_ROUTER.hackathons.root }}
        size={"l"}
        startIcon={{ remixName: "ri-arrow-left-s-line" }}
        variant="secondary-light"
        translate={{ token: "v2.pages.hackathons.details.back" }}
      />
      <HackathonCard
        classNames={{ base: "w-full block" }}
        title={title}
        // TODO WHEN BACKGROUND IS READY
        backgroundImage={getHackathonBackground(8, 0)}
        location={<Translate token={"v2.pages.hackathons.defaultLocation"} />}
        startDate={new Date(startDate)}
        status={status}
        projects={projects}
      />
    </div>
  );
}
export function HeaderLoading() {
  return <SkeletonEl width={"100%"} height={"100%"} />;
}
