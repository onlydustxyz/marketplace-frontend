import { Key, useCallback, useMemo, useState } from "react";

import MeApi from "src/api/me";
import { Spinner } from "src/components/Spinner/Spinner";

import { Button } from "components/ds/button/button";
import { Tabs } from "components/ds/tabs/tabs";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function RequestPaymentsStacks() {
  const isLoading = false;
  const isDisabled = false;
  const [excludedRewardsIds, setExcludedRewardsIds] = useState<string[]>([]);

  const { data, isLoading: isLoadingRewards, isError } = MeApi.queries.useGetMePendingInvoices({});
  const excludedRewards = useMemo(
    () => (data?.rewards || []).filter(reward => excludedRewardsIds.includes(reward.id)),
    [data]
  );
  const includedRewards = useMemo(
    () => (data?.rewards || []).filter(reward => !excludedRewardsIds.includes(reward.id)),
    [data]
  );
  function onExclude(id: string) {
    setExcludedRewardsIds(prev => [...prev, id]);
  }

  function onInclude(id: string) {
    setExcludedRewardsIds(prev => prev.filter(i => i !== id));
  }

  const onSubmit = () => {
    console.log("submit");
  };

  const getTabContent = useCallback(
    (selected: Key) => {
      console.log("data", data);
      if (selected === "included") {
        return (
          <div className="bg-red-300">
            {includedRewards.map(reward => (
              <p onClick={() => onExclude(reward.id)} key={reward.id}>
                {reward.id}
              </p>
            ))}
          </div>
        );
      } else if (selected === "excluded") {
        return (
          <div className="bg-green-300">
            {excludedRewards.map(reward => (
              <p onClick={() => onInclude(reward.id)} key={reward.id}>
                {reward.id}
              </p>
            ))}
          </div>
        );
      }
    },
    [excludedRewards, includedRewards]
  );

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex h-full flex-col px-4 pb-8">
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
              <Translate token="v2.pages.stacks.request_payments.form.submit" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
