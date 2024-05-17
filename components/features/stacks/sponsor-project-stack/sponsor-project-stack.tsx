import { Selection } from "@nextui-org/react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Money } from "utils/Money/Money";

import SponsorApi from "src/api/Sponsors";
import useMutationAlert from "src/api/useMutationAlert";
import { Spinner } from "src/components/Spinner/Spinner";
import { useCurrenciesOrder } from "src/hooks/useCurrenciesOrder";
import { useCloseStack } from "src/libs/react-stack";
import { cn } from "src/utils/cn";

import { Avatar } from "components/ds/avatar/avatar";
import { Button } from "components/ds/button/button";
import { Select } from "components/ds/form/select/select";
import { Tooltip } from "components/ds/tooltip/tooltip";
import { AmountSelect } from "components/features/currency/amount-select/amount-select";
import { SearchProjects } from "components/features/search-projects/search-projects";
import { TSearchProjects } from "components/features/search-projects/search-projects.types";
import { Budget } from "components/features/stacks/sponsor-project-stack/components/budget/budget";
import { TSponsorProjectStack } from "components/features/stacks/sponsor-project-stack/sponsor-project-stack.types";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { useIntl } from "hooks/translate/use-translate";
import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

import { Label } from "./components/label/label";

const shortcuts = [25, 50, 75, 100] as const;

export function SponsorProjectStack({ project, initialSponsorId }: TSponsorProjectStack.Props) {
  const { T } = useIntl();
  const closeStack = useCloseStack();

  const { user } = useCurrentUser();

  const sponsors = useMemo(
    () =>
      user?.sponsors?.map(s => ({
        label: s.name,
        value: s.id,
        startContent: <Avatar src={s.logoUrl} size={"xs"} className={"mx-1"} />,
      })) ?? [],
    [user]
  );
  const [sponsorId, setSponsorId] = useState(initialSponsorId ?? sponsors[0]?.value);
  const selectedSponsor = useMemo(() => sponsors.find(s => s.value === sponsorId), [user, sponsorId]);

  const { data: sponsor, isLoading } = SponsorApi.queries.useGetSponsorById({
    params: {
      sponsorId,
    },
    options: {
      enabled: Boolean(sponsorId),
    },
  });
  const { mutateAsync, isPending, ...restAllocation } = SponsorApi.mutations.useAllocateBudget({
    params: {
      sponsorId,
    },
  });

  // We only want to show currencies that have a budget
  const currencies = useMemo(() => sponsor?.availableBudgets.filter(b => Boolean(b.amount)) ?? [], [sponsor]);
  const orderedCurrencies = useCurrenciesOrder({ currencies });
  const initialCurrencySelection = useMemo(() => orderedCurrencies?.[0]?.currency, [orderedCurrencies]);

  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [currencyAmount, setCurrencyAmount] = useState("");
  const [currencySelection, setCurrencySelection] = useState<Money.Currency | undefined>();

  useMutationAlert({
    mutation: restAllocation,
    success: {
      message: T("v2.pages.sponsor.sponsorProject.success"),
    },
    error: {
      message: T("v2.pages.sponsor.sponsorProject.error"),
    },
  });

  useEffect(() => {
    // Need to set initial value inside an effect because the value may come from a deferred source (ex: a request)
    if (project) {
      setSelectedProjectId(project.id);
    }
  }, [project]);

  useEffect(() => {
    // Need to set initial value inside an effect because the value comes from a deferred source
    if (initialCurrencySelection) {
      setCurrencySelection(initialCurrencySelection);
    }
  }, [initialCurrencySelection]);

  const currencyAmountFloat = currencyAmount ? parseFloat(currencyAmount) : 0;

  const selectedProjectBudget = useMemo(() => {
    const selectedProject = sponsor?.projects.find(p => p.id === selectedProjectId);

    if (!selectedProject) return 0;

    return selectedProject.remainingBudgets.find(b => b.currency.id === currencySelection?.id)?.amount ?? 0;
  }, [sponsor, selectedProjectId, currencySelection]);

  const currentBudget = useMemo(
    () => orderedCurrencies.find(c => c.currency.id === currencySelection?.id),
    [orderedCurrencies, currencySelection]
  );

  const balanceExceeded = useMemo(() => {
    return currencyAmountFloat > (currentBudget?.amount ?? 0);
  }, [currencyAmountFloat, currentBudget]);

  const canAllocate = useMemo(() => {
    return Boolean(selectedProjectId && currencyAmountFloat && currencySelection && !balanceExceeded);
  }, [selectedProjectId, currencyAmountFloat, currencySelection, balanceExceeded]);

  function handleProjectChange(projects: TSearchProjects.Project[]) {
    setSelectedProjectId(projects.length ? projects[0].id : "");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await mutateAsync({
      projectId: selectedProjectId,
      amount: currencyAmountFloat,
      currencyId: currencySelection?.id ?? "",
    });

    closeStack();
  }

  function handleSponsorChange(keys: Selection) {
    const [sponsorId] = keys;

    if (typeof sponsorId === "string") {
      setSponsorId(sponsorId);

      // Reset amount, don't need to reset currency selection because it comes from a request depending on the sponsor id
      setCurrencyAmount("");
    }
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
            "border-spacePurple-500": shortcutAmount === currencyAmountFloat,
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
        <Typography variant={"title-m"} translate={{ token: "v2.pages.stacks.sponsorProject.title" }} />

        <div className={"divide-y divide-card-border-light"}>
          <div className={"grid gap-3 py-6"}>
            <Label htmlFor={"sponsor-project-sponsor"}>
              <Translate token="v2.pages.stacks.sponsorProject.sponsor.title" />
            </Label>
            <Select
              aria-label={T("v2.pages.sponsor.selectSponsor")}
              defaultSelectedKeys={[sponsorId ?? ""]}
              disabledKeys={[sponsorId ?? ""]}
              startContent={selectedSponsor?.startContent}
              items={sponsors}
              onSelectionChange={handleSponsorChange}
              size={"lg"}
              variant={"grey"}
            />
          </div>

          <div className={"grid gap-3 py-6"}>
            <Label htmlFor={"sponsor-project-project"}>
              <Translate token="v2.pages.stacks.sponsorProject.project.title" />
            </Label>
            <SearchProjects initialValue={project} onSelectProjects={handleProjectChange} size={"lg"} />
          </div>

          {currencySelection && currentBudget ? (
            <>
              <div className={"grid gap-3 py-6"}>
                <Label htmlFor={"sponsor-project-amount"}>
                  <Translate token="v2.pages.stacks.sponsorProject.amount.title" />
                </Label>
                <div className={"grid gap-5"}>
                  <AmountSelect
                    budgets={orderedCurrencies}
                    amountValue={currencyAmount}
                    selectionValue={currencySelection}
                    onAmountChange={setCurrencyAmount}
                    onSelectionChange={setCurrencySelection}
                    inputProps={{
                      description: (
                        <div className={"od-text-body-s flex items-center justify-between"}>
                          {currencyAmountFloat && currentBudget?.usdConversionRate ? (
                            Money.format({
                              amount: currencyAmountFloat * currentBudget.usdConversionRate,
                              currency: Money.USD,
                              options: {
                                prefixAmountWithTilde: true,
                              },
                            }).html
                          ) : (
                            <div />
                          )}
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
                    amount={selectedProjectBudget}
                    currency={currencySelection}
                  />
                  <Budget
                    label={"v2.pages.stacks.sponsorProject.budget.amountAllocated"}
                    amount={currencyAmountFloat}
                    currency={currencySelection}
                    prefix={currencyAmount ? "+" : ""}
                    color={balanceExceeded ? "orange" : currencyAmount ? "green" : undefined}
                  />
                  <Budget
                    label={"v2.pages.stacks.sponsorProject.budget.budgetAfterAllocation"}
                    amount={selectedProjectBudget + currencyAmountFloat}
                    currency={currencySelection}
                  />
                </ul>
              </div>
            </>
          ) : null}
        </div>
      </div>

      <footer className={"flex justify-end border-t border-card-border-light bg-card-background-light p-6"}>
        <Tooltip
          content={<Translate token="v2.pages.sponsor.sponsorProject.submitTooltip" />}
          isDisabled={canAllocate}
          placement={"top-end"}
        >
          <Button type={"submit"} disabled={!canAllocate || isLoading || isPending}>
            {isPending ? <Spinner /> : null}
            <Translate token="v2.pages.stacks.sponsorProject.submit" />
          </Button>
        </Tooltip>
      </footer>
    </form>
  );
}
