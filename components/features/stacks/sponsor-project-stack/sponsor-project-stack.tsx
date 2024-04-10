import { FormEvent, useState } from "react";
import { Money } from "utils/Money/Money";

import { ProjectPageItemResponse } from "src/types";

import { Button } from "components/ds/button/button";
import { AmountSelect } from "components/features/currency/amount-select/amount-select";
import { SearchProjects } from "components/features/search-projects/search-projects";
import { Budget } from "components/features/stacks/sponsor-project-stack/components/budget/budget";
import { TSponsorProjectStack } from "components/features/stacks/sponsor-project-stack/sponsor-project-stack.types";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { Label } from "./components/label/label";

export function SponsorProjectStack({ projectId }: TSponsorProjectStack.Props) {
  const [selectedProjectId, setSelectedProjectId] = useState<ProjectPageItemResponse["id"] | undefined>(
    projectId ? projectId : undefined
  );

  console.log({ selectedProjectId });

  function handleProjectChange(projects: ProjectPageItemResponse[]) {
    if (projects[0]?.id) {
      setSelectedProjectId(projects[0].id);
    }
  }

  // TODO @hayden get available balance & budget

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // TODO @hayden form validation

    alert("Submit");
  }

  return (
    <form className={"flex h-full flex-col"} onSubmit={handleSubmit}>
      <div className={"flex flex-1 flex-col gap-6 px-6"}>
        <Typography variant={"title-m"}>
          <Translate token="v2.pages.stacks.sponsorProject.title" />
        </Typography>

        <div className={"divide-y divide-card-border-light"}>
          <div className={"grid gap-3 py-6"}>
            <Label htmlFor={"sponsor-project-project"}>
              <Translate token="v2.pages.stacks.sponsorProject.project.title" />
            </Label>
            <SearchProjects onSelectProjects={handleProjectChange} size={"lg"} />
          </div>

          <div className={"grid gap-3 py-6"}>
            <Label htmlFor={"sponsor-project-amount"}>
              <Translate token="v2.pages.stacks.sponsorProject.amount.title" />
            </Label>
            <div className={"grid gap-5"}>
              <AmountSelect
                inputProps={{
                  description: (
                    <div className={"od-text-body-s flex items-center justify-between"}>
                      {
                        Money.format({
                          amount: 123123,
                          currency: Money.USD,
                          options: {
                            prefixAmountWithTilde: true,
                          },
                        }).html
                      }
                      <span>
                        <Translate token="v2.pages.stacks.sponsorProject.amount.balance" />:{" "}
                        {
                          Money.format({
                            amount: 123123,
                            currency: Money.USD,
                          }).string
                        }
                      </span>
                    </div>
                  ),
                }}
              />
              <div className={"grid grid-cols-4 gap-3"}>
                <Button variant={"secondary"} size={"s"} className={"w-full"}>
                  25%
                </Button>
                <Button variant={"secondary"} size={"s"} className={"w-full"}>
                  50%
                </Button>
                <Button variant={"secondary"} size={"s"} className={"w-full"}>
                  75%
                </Button>
                <Button variant={"secondary"} size={"s"} className={"w-full"}>
                  100%
                </Button>
              </div>
            </div>
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
        <Button type={"submit"}>
          <Translate token="v2.pages.stacks.sponsorProject.submit" />
        </Button>
      </footer>
    </form>
  );
}
