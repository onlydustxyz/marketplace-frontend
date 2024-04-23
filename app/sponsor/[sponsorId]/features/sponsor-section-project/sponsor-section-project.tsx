import { useCallback } from "react";

import {
  SponsorProjectCard,
  SponsorProjectCardSkeleton,
} from "app/sponsor/[sponsorId]/components/sponsor-project-card/sponsor-project-card";
import { useSponsorDetail } from "app/sponsor/[sponsorId]/hooks/use-sponsor-detail/use-sponsor-detail";

import { Card } from "components/ds/card/card";
import { SponsorSidePanels } from "components/features/sponsor/sponsor-side-panels";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function SponsorSectionProject() {
  const { data, isLoading, isError } = useSponsorDetail();

  const renderProjects = useCallback(() => {
    if (isError) {
      return (
        <Card background={"base"}>
          <Translate token={"v2.pages.sponsor.project.error"} />
        </Card>
      );
    }

    if (isLoading) {
      return Array.from({ length: 3 }).map((_, i) => <SponsorProjectCardSkeleton key={i} />);
    }

    if (data) {
      return data.projects.map(project => <SponsorProjectCard key={project.id} project={project} />);
    }

    return null;
  }, [isError, isLoading, data]);

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
