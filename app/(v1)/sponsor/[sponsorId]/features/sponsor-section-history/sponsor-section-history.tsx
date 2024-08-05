import { useMediaQuery } from "usehooks-ts";

import { SponsorHistoryCards } from "app/(v1)/sponsor/[sponsorId]/components/sponsor-history-cards/sponsor-history-cards";
import { SponsorHistoryTable } from "app/(v1)/sponsor/[sponsorId]/components/sponsor-history-table/sponsor-history-table";

import { viewportConfig } from "src/config";

import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function SponsorSectionHistory() {
  const isLg = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.lg}px)`);

  return (
    <section className={"grid gap-5"}>
      <Typography variant={"title-m"}>
        <Translate token="v2.pages.sponsor.history.title" />
      </Typography>

      {isLg ? <SponsorHistoryTable /> : <SponsorHistoryCards />}
    </section>
  );
}
