import { useMemo } from "react";

import { IMAGES } from "src/assets/img";
import { Spinner } from "src/components/Spinner/Spinner";

import { Button } from "components/ds/button/button";
import { RadioGroupCustom } from "components/ds/form/radio-group-custom/radio-group-custom";
import { SelectableBillingProfile } from "components/features/stacks/payments-flow/request-payments-stacks/components/billing-profile/selectable-billing-profile/selectable-billing-profile";
import { SelectableBillingProfileLoading } from "components/features/stacks/payments-flow/request-payments-stacks/components/billing-profile/selectable-billing-profile/selectable-billing-profile.loading";
import { UseBillingProfileIcons } from "components/features/stacks/payments-flow/request-payments-stacks/hooks/use-billing-profile-icons/use-billing-profile-icons";
import { TRequestPaymentsStacks } from "components/features/stacks/payments-flow/request-payments-stacks/request-payments-stacks.types";
import { Flex } from "components/layout/flex/flex";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";
import { EmptyState } from "components/layout/placeholders/empty-state/empty-state";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TSelectBillingProfile } from "./select-billing-profile.types";

export function SelectBillingProfile({
  billingProfiles,
  isLoading,
  onSelectBillingProfile,
  selectedBillingProfileId,
  goTo,
}: TSelectBillingProfile.Props) {
  function handleNext() {
    goTo({ to: TRequestPaymentsStacks.Views.SelectRewards });
  }

  const { billingProfilesIcons } = UseBillingProfileIcons();

  const renderBillingProfiles = useMemo(() => {
    if (isLoading) {
      return (
        <Flex justifyContent="start" direction={"col"} className="gap-4">
          <SelectableBillingProfileLoading />
          <SelectableBillingProfileLoading />
        </Flex>
      );
    }
    if (!billingProfiles?.length) {
      return (
        <div className="flex w-full flex-col py-6">
          <EmptyState
            illustrationSrc={IMAGES.global.categories}
            title={{ token: "v2.pages.stacks.request_payments.selectBillingProfile.emptyState.title" }}
            description={{ token: "v2.pages.stacks.request_payments.selectBillingProfile.emptyState.description" }}
          />
        </div>
      );
    }
    return (
      <>
        <Typography
          variant={"special-label"}
          translate={{ token: "v2.pages.stacks.request_payments.selectBillingProfile.title" }}
          className="mb-4 text-spaceBlue-200"
        />
        <Flex justifyContent="start" direction={"col"} className="gap-4">
          <RadioGroupCustom onChange={onSelectBillingProfile} value={selectedBillingProfileId}>
            {({ onChange }) =>
              billingProfiles?.map(profile => (
                <SelectableBillingProfile
                  key={profile.id}
                  title={profile.name}
                  count={profile.invoiceableRewardCount}
                  icon={{ remixName: profile.role === "MEMBER" ? "ri-team-line" : billingProfilesIcons[profile.type] }}
                  disabled={profile.invoiceableRewardCount === 0 || profile.role === "MEMBER"}
                  onChange={onChange}
                  selected={profile.id === selectedBillingProfileId}
                  value={profile.id}
                />
              ))
            }
          </RadioGroupCustom>
        </Flex>
      </>
    );
  }, [isLoading, billingProfiles, selectedBillingProfileId, onSelectBillingProfile]);

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex h-full flex-col overflow-hidden px-1">
        <div className="p-3">
          <Typography
            variant={"title-m"}
            translate={{ token: "v2.pages.stacks.request_payments.title" }}
            className="text-greyscale-50"
          />
        </div>
        <ScrollView>
          <div className="p-3">{renderBillingProfiles}</div>
        </ScrollView>
        <div className="w-full bg-greyscale-900">
          <div className="flex h-auto w-full items-center justify-between gap-5 border-t border-card-border-light bg-card-background-light px-8 py-6">
            {isLoading ? <Spinner /> : <div />}
            <div className="flex items-center justify-end gap-5">
              <Button
                variant="primary"
                size="m"
                className="w-full"
                onClick={handleNext}
                disabled={!selectedBillingProfileId}
              >
                <Translate token="v2.pages.stacks.request_payments.selectBillingProfile.next" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
