"use client";

import { useContext } from "react";

import { HackathonContext } from "app/hackathons/[hackathonSlug]/context/hackathon.context";
import { TOpenTimeline } from "app/hackathons/[hackathonSlug]/features/open-timeline/open-timeline.types";

import { Badge } from "components/atoms/badge";
import { Button } from "components/atoms/button/variants/button-default";
import { Translate } from "components/layout/translate/translate";

export function OpenTimeline({ eventsCount }: TOpenTimeline.Props) {
  const {
    timeline: { open },
  } = useContext(HackathonContext);

  return (
    <Button
      variant={"secondary-light"}
      size={"l"}
      classNames={{ base: "w-full md:w-fit whitespace-nowrap" }}
      onClick={open}
      endContent={
        <Badge size={"s"} colors={"brand-2"}>
          {eventsCount || 0}
        </Badge>
      }
    >
      <Translate token={"v2.pages.hackathons.details.info.seeEvents"} />
    </Button>
  );
}
