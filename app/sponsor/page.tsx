"use client";

import { SponsorSidePanels } from "app/sponsor/components/sponsor-side-panels/sponsor-side-panels";
import { SponsorSectionBudget } from "app/sponsor/features/sponsor-section-budget/sponsor-section-budget";
import { SponsorSectionHistory } from "app/sponsor/features/sponsor-section-history/sponsor-section-history";
import { SponsorSectionProject } from "app/sponsor/features/sponsor-section-project/sponsor-section-project";

import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export default function SponsorPage() {
  return (
    <div className={"scrollbar-sm h-full w-full overflow-y-auto"}>
      <div className={"mx-auto grid max-w-7xl gap-6 px-4 py-8 xl:p-8"}>
        <header className={"grid gap-3 sm:flex sm:items-center sm:justify-between"}>
          <Typography variant={"title-l"}>
            <Translate token="v2.pages.sponsor.title" />
          </Typography>

          <SponsorSidePanels
            panel={"fillout"}
            buttonProps={{
              size: "s",
              className: "w-full sm:w-auto",
              children: (
                <>
                  <Icon remixName={"ri-add-line"} />
                  <Translate token="v2.pages.sponsor.newDeposit" />
                </>
              ),
            }}
          />
        </header>

        <div className={"grid gap-10"}>
          <SponsorSectionBudget />
          <SponsorSectionProject />
          <SponsorSectionHistory />
        </div>
      </div>
    </div>
  );
}

// TODO @hayden feature flag
