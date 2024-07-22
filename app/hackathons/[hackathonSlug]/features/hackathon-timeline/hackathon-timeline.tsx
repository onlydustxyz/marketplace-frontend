import { EventListWrapper } from "app/hackathons/[hackathonSlug]/features/hackathon-timeline/components/event-list-wrapper/event-list-wrapper";
import { EventWrapper } from "app/hackathons/[hackathonSlug]/features/hackathon-timeline/components/event-wrapper/event-wrapper";
import { THackathonTimeline } from "app/hackathons/[hackathonSlug]/features/hackathon-timeline/hackathon-timeline.types";

import { Translate } from "components/layout/translate/translate";

export function HackathonTimeline({ todayEvents, previousEvents, nextEvents }: THackathonTimeline.Props) {
  return (
    <>
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
    </>
  );
}
