import { useIntl } from "src/hooks/useIntl";

import { Avatar } from "components/ds/avatar/avatar";
import { Button } from "components/ds/button/button";
import { Select } from "components/ds/form/select/select";
import { AmountSelect } from "components/features/stacks/sponsor-project-stack/components/amount-select/amount-select";
import { Budget } from "components/features/stacks/sponsor-project-stack/components/budget/budget";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { Label } from "./components/label/label";

const animals = [
  { label: "Dog", value: "dog", startContent: <Avatar src={""} shape={"square"} size={"s"} /> },
  { label: "Cat", value: "cat", startContent: <Avatar src={""} shape={"square"} size={"s"} /> },
  {
    label: "Fish",
    value: "fish",
    startContent: <Avatar src={""} shape={"square"} size={"s"} />,
  },
] as const;
export function SponsorProjectStack() {
  const { T } = useIntl();

  // TODO get available projects
  // TODO get available balance & budget

  return (
    <div className={"flex h-full flex-col"}>
      <div className={"flex flex-1 flex-col gap-6 px-6"}>
        <Typography variant={"title-m"}>
          <Translate token="v2.pages.stacks.sponsorProject.title" />
        </Typography>

        <div className={"divide-y divide-card-border-light"}>
          <div className={"grid gap-3 py-6"}>
            <Label htmlFor={"sponsor-project-project"}>
              <Translate token="v2.pages.stacks.sponsorProject.project.title" />
            </Label>
            <Select
              aria-label={T("v2.pages.stacks.sponsorProject.project.title")}
              id={"sponsor-project-project"}
              items={animals}
              placeholder="Select an animal"
              size={"sm"}
              startContent={<Avatar src={""} shape={"square"} size={"s"} />}
            />
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
