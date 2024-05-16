import { HackathonSection } from "app/hackathons/features/hackathon-section/hackathon-section";

import { Typography } from "components/layout/typography/typography";

export default function LoadingHackathonsPage() {
  return (
    <div className="scrollbar-sm relative z-[1] h-full w-full overflow-y-auto bg-no-repeat lg:rounded-3xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 p-4 md:px-12 md:py-14 md:pb-12 ">
        <Typography variant="title-xl" translate={{ token: "v2.pages.hackathons.title" }} />
        <div className="flex w-full flex-col items-start justify-start gap-12">
          <HackathonSection.Loading />
          <HackathonSection.Loading />
          <HackathonSection.Loading />
        </div>
      </div>
    </div>
  );
}
