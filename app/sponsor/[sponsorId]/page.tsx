"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { withSponsorGuard } from "utils/guards/sponsor-guard";

import { PosthogOnMount } from "components/features/posthog/components/posthog-on-mount/posthog-on-mount";
import { SponsorSidePanels } from "components/features/sponsor/sponsor-side-panels";
import { withClientOnly } from "components/layout/client-only/client-only";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { SponsorSectionBudget } from "./features/sponsor-section-budget/sponsor-section-budget";
import { SponsorSectionHistory } from "./features/sponsor-section-history/sponsor-section-history";
import { SponsorSectionProject } from "./features/sponsor-section-project/sponsor-section-project";

function SponsorPage() {
  return (
    <>
      <PosthogOnMount eventName={"sponsor_dashboard_viewed"} />
      <div className={"scrollbar-sm h-full w-full overflow-y-auto"}>
        <div className={"mx-auto grid max-w-7xl gap-6 px-4 py-8 xl:p-8"}>
          <header className={"grid gap-3 sm:flex sm:items-center sm:justify-between"}>
            <Typography variant={"title-l"}>
              <Translate token="v2.pages.sponsor.title" />
            </Typography>

            <div className={"flex flex-col items-center gap-3 sm:flex-row"}>
              <SponsorSidePanels
                panel={"fillout"}
                buttonProps={{
                  size: "s",
                  className: "w-full sm:w-auto whitespace-nowrap",
                  children: (
                    <>
                      <Icon remixName={"ri-add-line"} />
                      <Translate token="v2.pages.sponsor.newDeposit" />
                    </>
                  ),
                }}
              />
            </div>
          </header>
          <div className={"grid gap-10"}>
            <SponsorSectionBudget />
            <SponsorSectionProject />
            <SponsorSectionHistory />
          </div>
        </div>
      </div>
    </>
  );
}

export default withClientOnly(withAuthenticationRequired(withSponsorGuard(SponsorPage)));
