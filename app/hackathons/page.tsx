import { bootstrap } from "core/bootstrap";
import { notFound } from "next/navigation";

import { HackathonSection } from "app/hackathons/features/hackathon-section/hackathon-section";
import { HackathonsSliderContainer } from "app/hackathons/features/hackathons-slider-container/hackathons-slider-container";

import { PosthogOnMount } from "components/features/posthog/components/posthog-on-mount/posthog-on-mount";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

async function getHackathons() {
  try {
    const hackathonStorage = bootstrap.getHackathonStoragePortForServer();
    return await hackathonStorage.getHackathons({}).request();
  } catch {
    notFound();
  }
}

export default async function HackathonsPage() {
  const { hackathons } = await getHackathons();
  const { compareAsc, compareDesc } = bootstrap.getDateHelperPort();

  const liveNow = hackathons.filter(hackathon => hackathon.isLive());

  const comingSoon = hackathons
    .filter(hackathon => hackathon.isComingSoon())
    .sort((a, b) => compareAsc(new Date(a.startDate), new Date(b.startDate)));

  const pastHackathon = hackathons
    .filter(hackathon => hackathon.isPast())
    .sort((a, b) => compareDesc(new Date(a.startDate), new Date(b.startDate)));

  return (
    <>
      <PosthogOnMount eventName={"hackathon_list_viewed"} />

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

            <HackathonsSliderContainer
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
