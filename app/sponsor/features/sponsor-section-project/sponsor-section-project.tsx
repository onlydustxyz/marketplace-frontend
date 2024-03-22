import { SponsorProjectCard } from "app/sponsor/components/sponsor-project-card/sponsor-project-card";

import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function SponsorSectionProject() {
  return (
    <section className={"grid gap-5"}>
      <Typography variant={"title-m"}>
        <Translate token="v2.pages.sponsor.project.title" />
      </Typography>

      <div className={"grid gap-3 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3"}>
        <SponsorProjectCard />
        <SponsorProjectCard />
        <SponsorProjectCard />
      </div>
    </section>
  );
}
