import { useMemo } from "react";
import { createPortal } from "react-dom";
import { Money } from "utils/Money";

import ProjectApi from "src/api/Project";
import InfoIcon from "src/assets/icons/InfoIcon";
import { Chip } from "src/components/Chip/Chip";
import { CurrencyIcons } from "src/components/Currency/CurrencyIcon";
import { Tabs } from "src/components/Tabs/Tabs";
import { useIntl } from "src/hooks/useIntl";
import HandCoinLine from "src/icons/HandCoinLine";
import { BackDrop } from "src/libs/react-stack";
import SidePanel from "src/libs/react-stack/ui/Panel";

import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export type BudgetPanelProps = {
  open: false | "remaining" | "amount";
  onPanelChange: (open: false | "remaining" | "amount") => void;
  close: () => void;
  projectId: string;
};

export function BudgetPanel({ open, close, onPanelChange, projectId }: BudgetPanelProps) {
  const { T } = useIntl();

  const { data: projectBudget } = ProjectApi.queries.useProjectBudget({
    params: { projectId },
  });

  const tabs = useMemo(
    () => [
      {
        active: open === "remaining",
        onClick: () => {
          onPanelChange("remaining");
        },
        children: (
          <Flex className="items-center gap-2 md:gap-1.5">
            <InfoIcon />
            <Translate token="project.details.remainingBudget.budget.remaining" />
          </Flex>
        ),
      },
      {
        active: open === "amount",
        onClick: () => {
          onPanelChange("amount");
        },
        children: (
          <Flex className="items-center gap-2 md:gap-1.5">
            <HandCoinLine />
            <Translate token="project.details.remainingBudget.budget.spent" />
          </Flex>
        ),
      },
    ],
    [open]
  );

  const values = useMemo(() => {
    if (open === "amount") {
      return (
        projectBudget?.budgets.map(budget => ({
          currency: budget.currency,
          amount: budget.initialAmount - budget.remaining,
          dollarAmount:
            budget.remainingDollarsEquivalent === null
              ? null
              : (budget.initialDollarsEquivalent || 0) - (budget.remainingDollarsEquivalent || 0),
        })) || []
      );
    }

    return (
      projectBudget?.budgets.map(budget => ({
        currency: budget.currency,
        amount: budget.remaining,
        dollarAmount: budget.remainingDollarsEquivalent || null,
      })) || []
    );
  }, [projectBudget, open]);

  const sortedByDollarsEquivalent = useMemo(() => {
    return values.sort((a, b) => {
      if (a.dollarAmount === null) {
        return 1;
      }

      if (b.dollarAmount === null) {
        return -1;
      }

      return b.dollarAmount - a.dollarAmount;
    });
  }, [values]);

  const total = useMemo(() => {
    if (open === "amount") {
      return (projectBudget?.initialDollarsEquivalent || 0) - (projectBudget?.remainingDollarsEquivalent || 0) || "N/A";
    }

    return projectBudget?.remainingDollarsEquivalent || "N/A";
  }, [projectBudget, open]);

  return createPortal(
    <>
      {open ? <BackDrop onClick={close} /> : null}
      <SidePanel open={Boolean(open)} close={close}>
        <div className="flex h-full flex-col px-4 pb-8">
          <p className="mb-8 px-2 font-belwe text-2xl font-normal text-greyscale-50">
            <Translate token="project.details.remainingBudget.budget.panelTitle" />
          </p>
          <Tabs tabs={tabs} showMobile mobileTitle={T("project.details.edit.title")} border={true} />
          <div className="mt-4 flex flex-col gap-4 border-b-1 border-b-card-border-light pb-6">
            {sortedByDollarsEquivalent.map(value => (
              <Card
                key={value.currency.id}
                border="light"
                className="flex flex-row items-center justify-between bg-card-background-light p-4 lg:p-4"
              >
                <Flex className="gap-2" alignItems="center">
                  <Chip solid className="h-8 w-8">
                    <CurrencyIcons currency={value.currency} className="h-8 w-8" />
                  </Chip>
                  <p className="text-title-m">
                    {
                      Money.format({
                        amount: value.amount,
                        currency: value.currency,
                        options: { currencyClassName: "text-title-s" },
                      }).html
                    }
                  </p>
                </Flex>

                <Typography variant={"body-l"} as={"p"} className="text-spaceBlue-200">
                  {
                    Money.format({
                      amount: value.dollarAmount,
                      currency: Money.USD,
                      options: { prefixAmountWithTilde: true },
                    }).string
                  }
                </Typography>
              </Card>
            ))}
          </div>
          <div className="py-6">
            <Card border="light" className="od-bg-budget flex items-center justify-between border-0 p-4 lg:p-4">
              <Typography
                variant={"title-m"}
                as={"p"}
                translate={{ token: "project.details.remainingBudget.budget.panelTotal" }}
              />
              <Typography variant={"body-l-bold"} as={"p"}>
                {total === "N/A"
                  ? total
                  : Money.format({
                      amount: total,
                      currency: Money.USD,
                      options: { prefixAmountWithTilde: true },
                    }).string}
              </Typography>
            </Card>
          </div>
        </div>
      </SidePanel>
    </>,
    document.body
  );
}
