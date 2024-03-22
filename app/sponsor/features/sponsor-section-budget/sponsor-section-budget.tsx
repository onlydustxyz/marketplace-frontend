import { SponsorBudgetCard } from "app/sponsor/components/sponsor-budget-card/sponsor-budget-card";

import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function SponsorSectionBudget() {
  return (
    <section className={"grid gap-5"}>
      <Typography variant={"title-m"}>
        <Translate token="v2.pages.sponsor.budget.title" />
      </Typography>

      <div className={"grid gap-3 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"}>
        <SponsorBudgetCard />
        <SponsorBudgetCard />
        <SponsorBudgetCard />
        <SponsorBudgetCard />
        <SponsorBudgetCard />
        <SponsorBudgetCard />
      </div>
    </section>
  );
}
