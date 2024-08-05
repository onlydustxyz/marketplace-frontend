import { useCallback, useMemo } from "react";

import {
  SponsorProjectCard,
  SponsorProjectCardSkeleton,
} from "app/(v1)/sponsor/[sponsorId]/components/sponsor-project-card/sponsor-project-card";
import { useSponsorDetail } from "app/(v1)/sponsor/[sponsorId]/hooks/use-sponsor-detail/use-sponsor-detail";

import { Card } from "components/ds/card/card";
import { SponsorSidePanels } from "components/features/sponsor/sponsor-side-panels";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function SponsorSectionProject() {
  const { data, isLoading, isError } = useSponsorDetail();
  const canSponsorProject = useMemo(() => data?.availableBudgets.filter(b => Boolean(b.amount))?.length, [data]);

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
      return data.projects.map(project => (
        <SponsorProjectCard
          key={project.id}
          project={project}
          disableSponsorButton={!canSponsorProject}
          initialSponsorId={data?.id}
        />
      ));
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
            disabled: !canSponsorProject,
            backgroundColor: "blue",
          }}
          tooltipProps={{
            enabled: !canSponsorProject,
            content: <Translate token="v2.pages.sponsor.project.disbaledSponsorNewProject" />,
          }}
          initialSponsorId={data?.id}
        />
      </header>

      <div className={"grid gap-3 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3"}>{renderProjects()}</div>
    </section>
  );
}
