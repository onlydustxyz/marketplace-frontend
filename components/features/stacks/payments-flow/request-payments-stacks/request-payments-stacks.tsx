import { Key, useCallback, useMemo, useState } from "react";

import { useStackRequestPaymentsInvoice } from "src/App/Stacks/Stacks";
import MeApi from "src/api/me";
import { Spinner } from "src/components/Spinner/Spinner";

import { Button } from "components/ds/button/button";
import { Tabs } from "components/ds/tabs/tabs";
import { RewardItem } from "components/features/stacks/payments-flow/request-payments-stacks/components/reward-item/reward-item";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function RequestPaymentsStacks() {
  const isLoading = false;
  const isDisabled = false;
  const [openInvoice] = useStackRequestPaymentsInvoice();
  const [excludedRewardsIds, setExcludedRewardsIds] = useState<string[]>([]);

  const { data } = MeApi.queries.useGetMePendingInvoices({});
  const excludedRewards = useMemo(
    () => (data?.rewards || []).filter(reward => excludedRewardsIds.includes(reward.id)),
    [data, excludedRewardsIds]
  );
  const includedRewards = useMemo(
    () => (data?.rewards || []).filter(reward => !excludedRewardsIds.includes(reward.id)),
    [data, excludedRewardsIds]
  );
  function onExclude(id: string) {
    setExcludedRewardsIds(prev => [...prev, id]);
  }

  function onInclude(id: string) {
    setExcludedRewardsIds(prev => prev.filter(i => i !== id));
  }

  const onSubmit = () => {
    openInvoice({ rewardIds: includedRewards.map(({ id }) => id) });
  };

  const getTabContent = useCallback(
    (selected: Key) => {
      if (selected === "included") {
        return (
          <div className="flex w-full flex-col items-start justify-start gap-3">
            {includedRewards.map(reward => (
              <RewardItem key={reward.id} type="exclude" onClick={onExclude} {...reward} currency={reward.amount} />
            ))}
          </div>
        );
      } else if (selected === "excluded") {
        return (
          <div className="flex w-full flex-col items-start justify-start gap-3">
            {excludedRewards.map(reward => (
              <RewardItem key={reward.id} type="include" onClick={onInclude} {...reward} currency={reward.amount} />
            ))}
          </div>
        );
      }
    },
    [excludedRewards, includedRewards]
  );

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex h-full flex-col overflow-hidden px-1">
        <ScrollView>
          <div className="px-3 pb-28">
            <div className="mb-8">
              <Typography
                variant={"title-m"}
                translate={{ token: "v2.pages.stacks.request_payments.title" }}
                className="text-greyscale-50"
              />
            </div>
            <Tabs
              tabs={[
                {
                  content: "included",
                  key: "included",
                  icon: { remixName: "ri-check-line" },
                  children: getTabContent,
                },
                {
                  content: "excluded",
                  key: "excluded",
                  children: getTabContent,
                  icon: { remixName: "ri-close-line" },
                },
              ]}
            />
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-greyscale-900">
            <div className="flex h-auto w-full items-center justify-between gap-5 border-t border-card-border-light bg-card-background-light px-8 py-6">
              {/* // empty div to keep the flex layout */}
              {isLoading ? <Spinner /> : <div />}
              <div className="flex items-center justify-end gap-5 ">
                <Button variant="primary" size="m" disabled={isDisabled} onClick={onSubmit}>
                  <Translate
                    token="v2.pages.stacks.request_payments.form.submit"
                    params={{ count: includedRewards?.length }}
                  />
                </Button>
              </div>
            </div>
          </div>
        </ScrollView>
      </div>
    </div>
  );
}
