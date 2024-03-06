import { useMemo } from "react";

import { BillingProfilesTypes } from "src/api/BillingProfiles/type";
import { Spinner } from "src/components/Spinner/Spinner";

import { Button } from "components/ds/button/button";
import { RadioGroupCustom } from "components/ds/form/radio-group-custom/radio-group-custom";
import { SelectableBillingProfile } from "components/features/stacks/payments-flow/request-payments-stacks/components/selectable-billing-profile/selectable-billing-profile";
import { TRequestPaymentsStacks } from "components/features/stacks/payments-flow/request-payments-stacks/request-payments-stacks.types";
import { Flex } from "components/layout/flex/flex";
import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TSelectBillingProfile } from "./select-billing-profile.types";

export function SelectBillingProfile({
  billingProfiles,
  isLoading,
  onSelectBillingProfile,
  selectedBillingProfile,
  goTo,
}: TSelectBillingProfile.Props) {
  function handleNext() {
    goTo({ to: TRequestPaymentsStacks.Views.SelectRewards });
  }

  const billingProfilesIcons: Record<BillingProfilesTypes.type, RemixIconsName> = useMemo(() => {
    return {
      [BillingProfilesTypes.type.Individual]: "ri-user-line",
      [BillingProfilesTypes.type.SelfEmployed]: "ri-suitcase-line",
      [BillingProfilesTypes.type.Company]: "ri-vip-crown-line",
    };
  }, []);

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
            <Typography
              variant={"special-label"}
              translate={{ token: "v2.pages.stacks.request_payments.selectBillingProfile.title" }}
              className="mb-4 text-spaceBlue-200"
            />
            <Flex justifyContent="start" direction={"col"} className="gap-4">
              {billingProfiles?.length ? (
                <RadioGroupCustom onChange={onSelectBillingProfile} value={selectedBillingProfile?.id ?? ""}>
                  {({ value, onChange }) =>
                    billingProfiles?.map(profile => (
                      <SelectableBillingProfile
                        key={profile.id}
                        title={profile.name}
                        count={profile.rewardCount ?? 0}
                        icon={{ remixName: billingProfilesIcons[profile.type] }}
                        disabled={profile.rewardCount === 0}
                        onChange={onChange}
                        selected={value === selectedBillingProfile?.id}
                        value={profile.id}
                      />
                    ))
                  }
                </RadioGroupCustom>
              ) : null}
            </Flex>
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-greyscale-900">
            <div className="flex h-auto w-full items-center justify-between gap-5 border-t border-card-border-light bg-card-background-light px-8 py-6">
              {isLoading ? <Spinner /> : <div />}
              <div className="flex items-center justify-end gap-5">
                <Button
                  variant="primary"
                  size="m"
                  className="w-full"
                  onClick={handleNext}
                  disabled={!selectedBillingProfile}
                >
                  <Translate token="v2.pages.stacks.request_payments.selectBillingProfile.next" />
                </Button>
              </div>
            </div>
          </div>
        </ScrollView>
      </div>
    </div>
  );
}
