import { hackathonsApiClient } from "api-client/resources/hackathons";
import { isHackathonFuture } from "utils/hackathons/is-future";
import { isHackathonLive } from "utils/hackathons/is-live";

import { HackathonSection } from "app/migration/hackathons/features/hackathon-section/hackathon-section";

import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

async function HackathonsPage() {
  const data = await hackathonsApiClient.fetch.getHackathonsList().request();

  const liveNow = data.hackathons.filter(hackathon => isHackathonLive(hackathon));
  const comingSoon = data.hackathons.filter(hackathon => isHackathonFuture(hackathon));

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
        </div>
      </div>
    </div>
  );
}

export default HackathonsPage;
