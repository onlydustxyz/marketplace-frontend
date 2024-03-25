import { SponsorHistoryCard } from "app/sponsor/components/sponsor-history-card/sponsor-history-card";

import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function SponsorSectionHistory() {
  return (
    <section className={"grid gap-5"}>
      <Typography variant={"title-m"}>
        <Translate token="v2.pages.sponsor.history.title" />
      </Typography>

      <div className={"grid gap-3"}>
        <SponsorHistoryCard />
        <SponsorHistoryCard />
        <SponsorHistoryCard />
      </div>
    </section>
  );
}
