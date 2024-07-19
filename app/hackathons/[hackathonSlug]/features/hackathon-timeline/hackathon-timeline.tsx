import { EventListWrapper } from "app/hackathons/[hackathonSlug]/features/hackathon-timeline/components/event-list-wrapper/event-list-wrapper";
import { EventWrapper } from "app/hackathons/[hackathonSlug]/features/hackathon-timeline/components/event-wrapper/event-wrapper";
import { THackathonTimeline } from "app/hackathons/[hackathonSlug]/features/hackathon-timeline/hackathon-timeline.types";

import { Paper } from "components/atoms/paper";
import { Typo } from "components/atoms/typo";
import { Translate } from "components/layout/translate/translate";

export function HackathonTimeline({ todayEvents, previousEvents, nextEvents }: THackathonTimeline.Props) {
  console.log("todayEvents", todayEvents);
  console.log("previousEvent", previousEvents);
  console.log("futureEvents", nextEvents);

  return (
    <Paper size="m" container="3" classNames={{ base: "flex flex-col gap-3" }}>
      <Typo variant="brand" size={"xl"}>
        <Translate token="v2.pages.hackathons.details.timeline.title" />
      </Typo>
      <EventListWrapper title={<Translate token="v2.pages.hackathons.details.timeline.nextTitle" />}>
        {nextEvents.map((event, index) => (
          <EventWrapper key={index} index={index + 1} event={event} />
        ))}
      </EventListWrapper>
      <EventListWrapper title={<Translate token="v2.pages.hackathons.details.timeline.todayTitle" />}>
        {todayEvents.map((event, index) => (
          <EventWrapper key={index} index={index + 1} event={event} />
        ))}
      </EventListWrapper>
      <EventListWrapper title={<Translate token="v2.pages.hackathons.details.timeline.previousTitle" />}>
        {previousEvents.map((event, index) => (
          <EventWrapper key={index} index={index + 1} event={event} />
        ))}
      </EventListWrapper>
    </Paper>
  );
}
