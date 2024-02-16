import { useMemo, useState } from "react";

import { useStackRequestPayments } from "src/App/Stacks/Stacks";
import MeApi from "src/api/me";
import BillingApi from "src/api/me/billing";

import { GenerateInvoice } from "components/features/stacks/payments-flow/request-payments-stacks/features/views/generate-invoice/generate-invoice";
import { Mandate } from "components/features/stacks/payments-flow/request-payments-stacks/features/views/mandate/mandate";
import { SelectRewards } from "components/features/stacks/payments-flow/request-payments-stacks/features/views/select-rewards/select-rewards";
import { UploadInvoice } from "components/features/stacks/payments-flow/request-payments-stacks/features/views/upload-invoice/upload-invoice";
import { TRequestPaymentsStacks } from "components/features/stacks/payments-flow/request-payments-stacks/request-payments-stacks.types";

export function RequestPaymentsStacks() {
  const [view, setView] = useState<TRequestPaymentsStacks.Views>(TRequestPaymentsStacks.Views.Select);
  const [excludedRewardsIds, setExcludedRewardsIds] = useState<string[]>([]);
  const [, closeRequestPanel] = useStackRequestPayments();
  const { data } = MeApi.queries.useGetMePendingInvoices({});

  // TODO will be moved to the previous billing-profiles profiles selection step
  const { data: billingProfilesData } = BillingApi.queries.useAllBillingProfiles({});

  const excludeNonLiquidToken = useMemo(
    () =>
      (data?.rewards || []).filter(
        reward => !!reward.amount.dollarsEquivalent || reward.amount.dollarsEquivalent === 0
      ),
    [data]
  );

  const excludedRewards = useMemo(
    () => excludeNonLiquidToken.filter(reward => excludedRewardsIds.includes(reward.id)),
    [data, excludedRewardsIds]
  );

  const includedRewards = useMemo(
    () => excludeNonLiquidToken.filter(reward => !excludedRewardsIds.includes(reward.id)),
    [excludeNonLiquidToken, excludedRewardsIds]
  );

  function onExclude(id: string) {
    setExcludedRewardsIds(prev => [...prev, id]);
  }

  function onInclude(id: string) {
    setExcludedRewardsIds(prev => prev.filter(i => i !== id));
  }
  function onNextView({ to }: TRequestPaymentsStacks.onNextViewProps) {
    if (to === "close") {
      closeRequestPanel();
    } else {
      setView(to);
    }
  }

  if (view === TRequestPaymentsStacks.Views.Mandate) {
    return <Mandate goTo={onNextView} />;
  }

  if (view === TRequestPaymentsStacks.Views.Upload) {
    return (
      <UploadInvoice
        goTo={onNextView}
        rewardIds={includedRewards.map(({ id }) => id)}
        billingProfileId={billingProfilesData?.billingProfiles?.[0].id ?? ""}
      />
    );
  }

  if (view === TRequestPaymentsStacks.Views.Generate) {
    return (
      <GenerateInvoice
        goTo={onNextView}
        rewardIds={includedRewards.map(({ id }) => id)}
        billingProfileId={billingProfilesData?.billingProfiles?.[0].id ?? ""}
      />
    );
  }

  return (
    <SelectRewards
      goTo={onNextView}
      onExclude={onExclude}
      onInclude={onInclude}
      includedRewards={includedRewards}
      excludedRewards={excludedRewards}
    />
  );
}
