import { BillingProfileShort } from "core/domain/billing-profile/models/billing-profile-short-model";
import { useMemo } from "react";

import { BillingProfilesTypes } from "src/api/BillingProfiles/type";
import { IMAGES } from "src/assets/img";
import { usePosthog } from "src/hooks/usePosthog";

import { Button } from "components/ds/button/button";
import { ReadonlyBillingProfile } from "components/features/stacks/payments-flow/request-payments-stacks/components/billing-profile/readonly-billing-profile/readonly-billing-profile";
import { RewardItem } from "components/features/stacks/payments-flow/request-payments-stacks/components/reward-item/reward-item";
import { PayoutSummary } from "components/features/stacks/payments-flow/request-payments-stacks/features/payout-summary/payout-summary";
import { SelectionShortcut } from "components/features/stacks/payments-flow/request-payments-stacks/features/views/select-rewards/components/selection-shortcut/selection-shortcut";
import { TSelectRewards } from "components/features/stacks/payments-flow/request-payments-stacks/features/views/select-rewards/select-rewards.types";
import { TRequestPaymentsStacks } from "components/features/stacks/payments-flow/request-payments-stacks/request-payments-stacks.types";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";
import { EmptyState } from "components/layout/placeholders/empty-state/empty-state";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";
import { Helper } from "components/molecules/helper";

import { useBillingProfileById } from "hooks/billings-profiles/use-billing-profile/use-billing-profile";

import { AmountCounter } from "../../../components/amount-counter/amount-counter";

export function SelectRewards({
  onExclude,
  onInclude,
  includedRewards,
  excludedRewards,
  goTo,
  billingProfileId,
  onIncludeAll,
  onExcludeAll,
  rewards,
}: TSelectRewards.Props) {
  const { capture } = usePosthog();

  const { profile } = useBillingProfileById({ id: billingProfileId, enabledPooling: false });
  const shortBillingProfile = profile?.data ? new BillingProfileShort(profile.data) : null;

  const isIndividual = profile?.data?.type === BillingProfilesTypes.type.Individual;
  const isMandateAccepted = profile?.data?.invoiceMandateAccepted;

  const totalAmountSelectedRewards = useMemo(
    () => includedRewards.reduce((count, reward) => (count += reward.amount.usdEquivalent || 0), 0),
    [includedRewards]
  );

  const hasReachedLimit = useMemo(
    () => shortBillingProfile?.getHasReachedProgressionLimit(totalAmountSelectedRewards),
    [totalAmountSelectedRewards, shortBillingProfile]
  );

  const isDisabled = useMemo(
    () => includedRewards.length < 1 || (isIndividual && hasReachedLimit),
    [includedRewards, hasReachedLimit, isIndividual]
  );

  const onSubmit = () => {
    capture("payments_request_rewards_selected", {
      includedRewards: includedRewards?.length,
      excludedRewards: excludedRewards?.length,
    });
    if (isIndividual || (!isIndividual && isMandateAccepted)) {
      goTo({ to: TRequestPaymentsStacks.Views.Generate });
    } else {
      goTo({ to: TRequestPaymentsStacks.Views.Mandate });
    }
  };

  const rewardList = useMemo(() => {
    function isRewardsInclude(rewardId: string) {
      return includedRewards.some(reward => reward.id === rewardId);
    }

    return rewards.map(reward => {
      const isIncluded = isRewardsInclude(reward.id);
      const event = isIncluded ? onExclude : onInclude;
      return (
        <RewardItem
          key={reward.id}
          type={isIncluded ? "include" : "exclude"}
          onClick={event}
          {...reward}
          currency={reward.amount}
        />
      );
    });
  }, [rewards, includedRewards, excludedRewards]);

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex h-full flex-col overflow-hidden px-1">
        <div className="mb-8 px-3">
          <Typography
            variant={"title-m"}
            translate={{ token: "v2.pages.stacks.request_payments.title" }}
            className="text-greyscale-50"
          />
        </div>
        <div className="mb-8 px-3">
          <Typography
            variant={"title-s"}
            translate={{ token: "v2.pages.stacks.request_payments.selectRewards.billingProfileTitle" }}
            className="mb-4"
          />
          {profile?.data ? <ReadonlyBillingProfile billingProfile={profile?.data} /> : null}
          <Helper
            title={{ translate: { token: "v2.pages.stacks.request_payments.selectRewards.addressWarning.title" } }}
            text={{ translate: { token: "v2.pages.stacks.request_payments.selectRewards.addressWarning.description" } }}
            container={"danger"}
            classNames={{ base: "mt-4" }}
          />
          <PayoutSummary rewards={includedRewards} billingProfileId={billingProfileId} />
        </div>
        <div className="mb-3 flex w-full flex-row items-center justify-between px-3">
          <Typography
            variant={"special-label"}
            className="uppercase text-greyscale-300"
            translate={{ token: "v2.pages.stacks.request_payments.selectRewards.selectedTitle" }}
          />
          <SelectionShortcut
            includedRewards={includedRewards}
            excludedRewards={excludedRewards}
            onIncludeAll={onIncludeAll}
            onExcludeAll={onExcludeAll}
          />
        </div>
        <ScrollView>
          <div className="px-3">
            <div className="flex w-full flex-col items-start justify-start gap-3">
              {!rewards.length ? (
                <div className="flex w-full flex-col py-6">
                  <EmptyState
                    illustrationSrc={IMAGES.global.categories}
                    title={{ token: "v2.pages.stacks.request_payments.selectRewards.emptyState.title" }}
                    description={{ token: "v2.pages.stacks.request_payments.selectRewards.emptyState.description" }}
                  />
                </div>
              ) : (
                rewardList
              )}
            </div>
          </div>
        </ScrollView>
        <div className="w-full bg-greyscale-900">
          {!!shortBillingProfile && (
            <AmountCounter
              total={shortBillingProfile.getCurrentProgressionAmount(totalAmountSelectedRewards)}
              isOverLimit={hasReachedLimit}
              isCompany={!isIndividual}
              limit={shortBillingProfile.getLimitAmount()}
            />
          )}
          <div className="flex h-auto w-full items-center justify-end gap-5 border-t border-card-border-light bg-card-background-light px-8 py-6">
            <div className="flex items-center justify-end gap-5 ">
              <Button
                variant="secondary"
                size="m"
                onClick={() => goTo({ to: TRequestPaymentsStacks.Views.SelectBillingProfile })}
              >
                <Translate token="v2.pages.stacks.request_payments.form.back" />
              </Button>
              <Button variant="primary" size="m" onClick={onSubmit} disabled={isDisabled}>
                <Translate
                  token="v2.pages.stacks.request_payments.form.submit"
                  params={{ count: includedRewards?.length }}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
