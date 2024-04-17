import { SponsorProjectCard } from "app/sponsor/[sponsorId]/components/sponsor-project-card/sponsor-project-card";
import { SponsorSidePanels } from "app/sponsor/[sponsorId]/components/sponsor-side-panels/sponsor-side-panels";
import { useSponsorDetail } from "app/sponsor/[sponsorId]/hooks/use-sponsor-detail/use-sponsor-detail";

import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function SponsorSectionProject() {
  const { data, isLoading } = useSponsorDetail();

  function renderProjects() {
    if (isLoading) {
      return Array.from({ length: 3 }).map((_, i) => <SponsorProjectCard.Skeleton key={i} />);
    }

    if (data) {
      return data.projects.map((project, i) => <SponsorProjectCard key={`${project.name}_${i}`} {...project} />);
    }

    return null;
  }

  return (
    <section className={"grid gap-5"}>
      <header className={"grid gap-3 sm:flex sm:items-center sm:justify-between"}>
        <Typography variant={"title-m"}>
          <Translate token="v2.pages.sponsor.project.title" />
        </Typography>

        <SponsorSidePanels
          panel={"project"}
          buttonProps={{
            size: "s",
            className: "w-full sm:w-auto",
            children: <Translate token="v2.pages.sponsor.project.sponsorNewProject" />,
          }}
        />
      </header>

      <div className={"grid gap-3 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3"}>{renderProjects()}</div>
    </section>
  );
}
