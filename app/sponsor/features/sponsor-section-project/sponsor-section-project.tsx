import { SponsorProjectCard } from "app/sponsor/components/sponsor-project-card/sponsor-project-card";

import { useStackSponsorProject } from "src/App/Stacks/Stacks";

import { Button } from "components/ds/button/button";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function SponsorSectionProject() {
  const [openSponsorProjectStack] = useStackSponsorProject();

  return (
    <section className={"grid gap-5"}>
      <header className={"grid gap-3 sm:flex sm:items-center sm:justify-between"}>
        <Typography variant={"title-m"}>
          <Translate token="v2.pages.sponsor.project.title" />
        </Typography>

        <Button size={"s"} className={"w-full sm:w-auto"} onClick={openSponsorProjectStack}>
          <Translate token="v2.pages.sponsor.project.sponsorNewProject" />
        </Button>
      </header>

      <div className={"grid gap-3 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3"}>
        <SponsorProjectCard />
        <SponsorProjectCard />
        <SponsorProjectCard />
      </div>
    </section>
  );
}
