import { isHackathonFuture } from "utils/hackathons/is-future";
import { isHackathonLive } from "utils/hackathons/is-live";

import { HackathonSection } from "app/hackathons/features/hackathon-section/hackathon-section";

import { components } from "src/__generated/api";

import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

const mock: components["schemas"]["HackathonsListResponse"] = {
  hackathons: [
    {
      title: "ODHack #3.0",
      startDate: "2024-04-22T10:30:00+02:00",
      endDate: "2024-05-01T11:59:00+02:00",
      id: "e1dad47e-0b29-4198-8aec-9fc0ea5a649d",
      slug: "od-hack-3-0",
      location: "",
    },
  ],
};

function HackathonsPage() {
  const liveNow = mock.hackathons.filter(hackathon => isHackathonLive(hackathon));
  const comingSoon = mock.hackathons.filter(hackathon => isHackathonFuture(hackathon));
  const pastHackathon = mock.hackathons.filter(
    hackathon => !isHackathonLive(hackathon) && !isHackathonFuture(hackathon)
  );

  return (
    <div className="scrollbar-sm relative z-[1] h-full w-full overflow-y-auto bg-no-repeat lg:rounded-3xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 p-4 md:px-12 md:py-14 md:pb-12 ">
        <Typography variant="title-xl" translate={{ token: "v2.pages.hackathons.title" }} />
        <div className="flex w-full flex-col items-start justify-start gap-12">
          <HackathonSection
            title={<Translate token={"v2.pages.hackathons.liveNow"} />}
            icon={{ remixName: "ri-fire-line" }}
            items={liveNow}
          />
          <HackathonSection
            title={<Translate token={"v2.pages.hackathons.comingSoon"} />}
            icon={{ remixName: "ri-calendar-event-line" }}
            items={comingSoon}
          />
          <HackathonSection
            title={<Translate token={"v2.pages.hackathons.previous"} />}
            icon={{ remixName: "ri-calendar-event-line" }}
            items={pastHackathon}
          />
        </div>
      </div>
    </div>
  );
}

export default HackathonsPage;
