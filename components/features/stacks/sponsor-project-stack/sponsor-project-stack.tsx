import { FormEvent, useMemo, useState } from "react";
import { Money } from "utils/Money/Money";

import SponsorApi from "src/api/Sponsors";
import { ProjectPageItemResponse } from "src/types";
import { cn } from "src/utils/cn";

import { Button } from "components/ds/button/button";
import { AmountSelect } from "components/features/currency/amount-select/amount-select";
import { SearchProjects } from "components/features/search-projects/search-projects";
import { Budget } from "components/features/stacks/sponsor-project-stack/components/budget/budget";
import { TSponsorProjectStack } from "components/features/stacks/sponsor-project-stack/sponsor-project-stack.types";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

import { Label } from "./components/label/label";

const shortcuts = [25, 50, 75, 100] as const;

export function SponsorProjectStack({ projectId }: TSponsorProjectStack.Props) {
  const { user } = useCurrentUser();

  const sponsorId = user?.sponsors?.[0].id ?? "";

  const { data: sponsor } = SponsorApi.queries.useGetSponsorById({
    params: {
      sponsorId,
    },
    options: {
      enabled: Boolean(sponsorId),
    },
  });

  const currencies = useMemo(() => sponsor?.availableBudgets ?? [], [sponsor]);

  const [selectedProjectId, setSelectedProjectId] = useState<ProjectPageItemResponse["id"] | undefined>(
    projectId ? projectId : undefined
  );
  const [currencyAmount, setCurrencyAmount] = useState("");
  const [currencySelection, setCurrencySelection] = useState<Money.Currency | undefined>(currencies[0].currency);

  const currentBudget = useMemo(
    () => currencies.find(c => c.currency.id === currencySelection?.id),
    [currencies, currencySelection]
  );

  function handleProjectChange(projects: ProjectPageItemResponse[]) {
    if (projects[0]?.id) {
      setSelectedProjectId(projects[0].id);
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    alert("Submit");
  }

  function renderShortcuts() {
    if (!currentBudget) return null;

    return shortcuts.map(shortcut => {
      const shortcutAmount = currentBudget.amount * (shortcut / 100);

      return (
        <Button
          key={shortcut}
          variant={"secondary"}
          size={"s"}
          onClick={() => setCurrencyAmount(String(shortcutAmount))}
          className={cn("w-full", {
            "border-spacePurple-500": shortcutAmount === parseFloat(currencyAmount),
          })}
        >
          {shortcut}%
        </Button>
      );
    });
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

          {currencySelection && currentBudget ? (
            <>
              <div className={"grid gap-3 py-6"}>
                <Label htmlFor={"sponsor-project-amount"}>
                  <Translate token="v2.pages.stacks.sponsorProject.amount.title" />
                </Label>
                <div className={"grid gap-5"}>
                  <AmountSelect
                    budgets={currencies}
                    amountValue={currencyAmount}
                    selectionValue={currencySelection}
                    onAmountChange={setCurrencyAmount}
                    onSelectionChange={setCurrencySelection}
                    inputProps={{
                      description: (
                        <div className={"od-text-body-s flex items-center justify-between"}>
                          {
                            Money.format({
                              amount: currentBudget.usdEquivalent,
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
                                amount: currentBudget.amount,
                                currency: currentBudget.currency,
                              }).string
                            }
                          </span>
                        </div>
                      ),
                    }}
                  />
                  <div className={"grid grid-cols-4 gap-3"}>{renderShortcuts()}</div>
                </div>
              </div>

              <div className={"grid gap-3 py-6"}>
                <Label>
                  <Translate token="v2.pages.stacks.sponsorProject.budget.title" />
                </Label>
                <ul className={"grid gap-3"}>
                  <Budget
                    label={"v2.pages.stacks.sponsorProject.budget.currentBudget"}
                    // TODO @hayden get selected project budget
                    amount={123}
                    currency={currencySelection}
                  />
                  <Budget
                    label={"v2.pages.stacks.sponsorProject.budget.amountAllocated"}
                    amount={currencyAmount ? parseFloat(currencyAmount) : 0}
                    currency={currencySelection}
                    isAllocation
                  />
                  <Budget
                    label={"v2.pages.stacks.sponsorProject.budget.budgetAfterAllocation"}
                    // TODO @hayden make this turn orange if the budget is exceeded like currency converter
                    amount={123}
                    currency={currencySelection}
                  />
                </ul>
              </div>
            </>
          ) : null}
        </div>
      </div>

      <footer className={"flex justify-end border-t border-card-border-light bg-card-background-light p-6"}>
        {/* TODO @hayden budget exceeded or empty tooltip like currency converter */}
        {/* TODO @hayden disable if form error or loading */}
        <Button type={"submit"}>
          <Translate token="v2.pages.stacks.sponsorProject.submit" />
        </Button>
      </footer>
    </form>
  );
}
