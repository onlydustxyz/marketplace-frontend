import { hackathonsApiClient } from "api-client/resources/hackathons";
import { compareAsc, compareDesc } from "date-fns";
import { isHackathonFuture } from "utils/hackathons/is-future";
import { isHackathonLive } from "utils/hackathons/is-live";

import { HackathonSection } from "app/hackathons/features/hackathon-section/hackathon-section";
import { HackathonsSlider } from "app/hackathons/features/hackathons-slider/hackathons-slider";

import { PosthogOnMount } from "components/features/posthog/components/posthog-on-mount/posthog-on-mount";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

async function HackathonsPage() {
  const data = await hackathonsApiClient.fetch.getHackathonsList().request();

  const liveNow = data.hackathons.filter(hackathon => isHackathonLive(hackathon));
  const comingSoon = data.hackathons
    .filter(hackathon => isHackathonFuture(hackathon))
    .sort((a, b) => compareAsc(new Date(a.startDate), new Date(b.startDate)));
  const pastHackathon = data.hackathons
    .filter(hackathon => !isHackathonLive(hackathon) && !isHackathonFuture(hackathon))
    .sort((a, b) => compareDesc(new Date(a.startDate), new Date(b.startDate)));

  return (
    <>
      <PosthogOnMount eventName={"hackathon_list_viewed"} />
      <div className="scrollbar-sm relative z-[1] h-full w-full overflow-y-auto bg-no-repeat lg:rounded-3xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 p-4 md:px-12 md:py-14 md:pb-12 ">
          <Typography variant="title-xl" translate={{ token: "v2.pages.hackathons.title" }} />
          <div className="flex w-full flex-col items-start justify-start gap-12">
            <HackathonSection
              status={"live"}
              title={<Translate token={"v2.pages.hackathons.liveNow"} />}
              icon={{ remixName: "ri-fire-line" }}
              items={liveNow}
              startIndex={0}
            />
            <HackathonSection
              status={"open"}
              title={<Translate token={"v2.pages.hackathons.comingSoon"} />}
              icon={{ remixName: "ri-calendar-event-line" }}
              items={comingSoon}
              startIndex={1}
            />
            <HackathonsSlider
              status={"closed"}
              title={<Translate token={"v2.pages.hackathons.previous"} />}
              icon={{ remixName: "ri-calendar-event-line" }}
              items={pastHackathon}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HackathonsPage;
