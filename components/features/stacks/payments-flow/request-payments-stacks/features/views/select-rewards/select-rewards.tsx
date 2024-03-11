import { useCallback, useMemo } from "react";

import { IMAGES } from "src/assets/img";
import { usePosthog } from "src/hooks/usePosthog";

import { Button } from "components/ds/button/button";
import { Tabs } from "components/ds/tabs/tabs";
import { ReadonlyBillingProfile } from "components/features/stacks/payments-flow/request-payments-stacks/components/billing-profile/readonly-billing-profile/readonly-billing-profile";
import { RewardItem } from "components/features/stacks/payments-flow/request-payments-stacks/components/reward-item/reward-item";
import { TSelectRewards } from "components/features/stacks/payments-flow/request-payments-stacks/features/views/select-rewards/select-rewards.types";
import { TRequestPaymentsStacks } from "components/features/stacks/payments-flow/request-payments-stacks/request-payments-stacks.types";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";
import { EmptyState } from "components/layout/placeholders/empty-state/empty-state";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

import { AmountCounter } from "../../../components/amount-counter/amount-counter";

export function SelectRewards({
  onExclude,
  onInclude,
  includedRewards,
  excludedRewards,
  goTo,
  isMandateAccepted,
  selectedBillingProfile,
}: TSelectRewards.Props) {
  const { capture } = usePosthog();
  const { user } = useCurrentUser();
  const totalAmountSelectedRewards = useMemo(
    () => includedRewards.reduce((count, reward) => (count += reward.amount.dollarsEquivalent || 0), 0),
    [includedRewards]
  );

  const onSubmit = () => {
    capture("payments_request_rewards_selected", {
      includedRewards: includedRewards?.length,
      excludedRewards: excludedRewards?.length,
    });
    if (user?.billingProfileType === "INDIVIDUAL" || (user?.billingProfileType === "COMPANY" && isMandateAccepted)) {
      goTo({ to: TRequestPaymentsStacks.Views.Generate });
    } else {
      goTo({ to: TRequestPaymentsStacks.Views.Mandate });
    }
  };

  const getTabContent = useCallback(
    (selected: TSelectRewards.Tabs) => {
      if (selected === TSelectRewards.Tabs.Included) {
        return (
          <div className="flex w-full flex-col items-start justify-start gap-3">
            {!includedRewards.length ? (
              <div className="flex w-full flex-col py-6">
                <EmptyState
                  illustrationSrc={IMAGES.global.categories}
                  title={{ token: "v2.pages.stacks.request_payments.selectRewards.emptyState.title" }}
                  description={{ token: "v2.pages.stacks.request_payments.selectRewards.emptyState.description" }}
                />
              </div>
            ) : (
              includedRewards.map(reward => (
                <RewardItem key={reward.id} type="exclude" onClick={onExclude} {...reward} currency={reward.amount} />
              ))
            )}
          </div>
        );
      } else if (selected === TSelectRewards.Tabs.Excluded) {
        return (
          <div className="flex w-full flex-col items-start justify-start gap-3">
            {excludedRewards.map(reward => (
              <RewardItem key={reward.id} type="include" onClick={onInclude} {...reward} currency={reward.amount} />
            ))}
          </div>
        );
      }

      return null;
    },
    [excludedRewards, includedRewards]
  );

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex h-full flex-col overflow-hidden px-1">
        <ScrollView>
          <div className="px-3 pb-[250px]">
            <div className="mb-8">
              <Typography
                variant={"title-m"}
                translate={{ token: "v2.pages.stacks.request_payments.title" }}
                className="text-greyscale-50"
              />
            </div>
            <div className="mb-8">
              <Typography
                variant={"title-s"}
                translate={{ token: "v2.pages.stacks.request_payments.uploadInvoice.guidelinesTitle" }}
                className="mb-4"
              />
              {selectedBillingProfile ? <ReadonlyBillingProfile billingProfile={selectedBillingProfile} /> : null}
            </div>
            <Tabs
              tabs={[
                {
                  content: <Translate token="v2.pages.stacks.request_payments.tabs.included" />,
                  key: TSelectRewards.Tabs.Included,
                  icon: { remixName: "ri-check-line" },
                  children: getTabContent,
                },
                {
                  content: <Translate token="v2.pages.stacks.request_payments.tabs.excluded" />,
                  key: TSelectRewards.Tabs.Excluded,
                  children: getTabContent,
                  icon: { remixName: "ri-close-line" },
                },
              ]}
            />
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-greyscale-900">
            <AmountCounter total={totalAmountSelectedRewards} isCompany={user?.billingProfileType === "COMPANY"} />
            <div className="flex h-auto w-full items-center justify-end gap-5 border-t border-card-border-light bg-card-background-light px-8 py-6">
              <div className="flex items-center justify-end gap-5 ">
                <Button
                  variant="secondary"
                  size="m"
                  onClick={() => goTo({ to: TRequestPaymentsStacks.Views.SelectBillingProfile })}
                >
                  <Translate token="v2.pages.stacks.request_payments.form.back" />
                </Button>
                <Button variant="primary" size="m" onClick={onSubmit} disabled={includedRewards?.length < 1}>
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
