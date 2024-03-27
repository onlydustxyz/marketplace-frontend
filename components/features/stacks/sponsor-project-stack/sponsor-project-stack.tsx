import { Button } from "components/ds/button/button";
import { AmountSelect } from "components/features/stacks/sponsor-project-stack/components/amount-select/amount-select";
import { Budget } from "components/features/stacks/sponsor-project-stack/components/budget/budget";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { Label } from "./components/label/label";

export function SponsorProjectStack() {
  return (
    <div className={"flex h-full flex-col"}>
      <div className={"flex flex-1 flex-col gap-6 px-6"}>
        <Typography variant={"title-m"}>
          <Translate token="v2.pages.stacks.sponsorProject.title" />
        </Typography>

        <div className={"divide-y divide-card-border-light"}>
          <div className={"grid gap-3 py-6"}>
            <Label>test</Label>
            <div>hey</div>
          </div>
          <div className={"grid gap-3 py-6"}>
            <Label htmlFor={"sponsor-project-amount"}>
              <Translate token="v2.pages.stacks.sponsorProject.amount.title" />
            </Label>
            <AmountSelect />
          </div>
          <div className={"grid gap-3 py-6"}>
            <Label>
              <Translate token="v2.pages.stacks.sponsorProject.budget.title" />
            </Label>
            <ul className={"grid gap-3"}>
              <Budget label={"v2.pages.stacks.sponsorProject.budget.currentBudget"} />
              <Budget label={"v2.pages.stacks.sponsorProject.budget.amountAllocated"} isAllocation />
              <Budget label={"v2.pages.stacks.sponsorProject.budget.budgetAfterAllocation"} />
            </ul>
          </div>
        </div>
      </div>

      <footer className={"flex justify-end border-t border-card-border-light bg-card-background-light p-6"}>
        <Button>
          <Translate token="v2.pages.stacks.sponsorProject.submit" />
        </Button>
      </footer>
    </div>
  );
}
