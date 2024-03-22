"use client";

import { SponsorSectionBudget } from "app/sponsor/features/sponsor-section-budget/sponsor-section-budget";

import { Button } from "components/ds/button/button";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export default function SponsorPage() {
  return (
    <div className={"scrollbar-sm h-full w-full overflow-y-auto"}>
      <div className={"mx-auto grid max-w-7xl gap-6 px-4 py-8 xl:p-8"}>
        <header className={"grid gap-3 md:flex md:items-center md:justify-between"}>
          <Typography variant={"title-l"}>
            <Translate token="v2.pages.sponsor.title" />
          </Typography>
          <Button size={"s"} className={"w-full md:w-auto"}>
            <Icon remixName={"ri-add-line"} />
            <Translate token="v2.pages.sponsor.newDeposit" />
          </Button>
        </header>

        <div className={"grid gap-10"}>
          <SponsorSectionBudget />
        </div>
      </div>
    </div>
  );
}

// TODO @hayden feature flag
