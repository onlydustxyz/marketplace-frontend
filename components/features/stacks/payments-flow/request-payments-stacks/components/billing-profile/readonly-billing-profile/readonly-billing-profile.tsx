import { Chip } from "src/components/Chip/Chip";

import { Card } from "components/ds/card/card";
import { TReadonlyBillingProfile } from "components/features/stacks/payments-flow/request-payments-stacks/components/billing-profile/readonly-billing-profile/readonly-billing-profile.types";
import { UseBillingProfileIcons } from "components/features/stacks/payments-flow/request-payments-stacks/hooks/use-billing-profile-icons/use-billing-profile-icons";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

export function ReadonlyBillingProfile({ billingProfile }: TReadonlyBillingProfile.Props) {
  const { billingProfilesIcons } = UseBillingProfileIcons();
  const { name, invoiceableRewardCount, type } = billingProfile;
  return (
    <Card background={false} border="heavy" className="p-4">
      <Flex justifyContent="between" alignItems="center" className="gap-1">
        <Flex justifyContent="start" alignItems="center" className="gap-4">
          <Chip className="h-8 w-8">
            <Icon remixName={billingProfilesIcons[type]} className="h-4 w-4" />
          </Chip>
          <div>
            <Typography variant={"title-s"} className="mb-0.5 capitalize text-greyscale-50">
              {name}
            </Typography>
          </div>
        </Flex>
        <Chip className="h-fit w-fit border-none bg-spacePurple-900 px-2 py-1 text-spacePurple-400">
          <Icon remixName="ri-medal-2-fill" className="h-3 w-3 text-spacePurple-500" size={12} />
          <Typography variant="body-s-bold">{invoiceableRewardCount}</Typography>
        </Chip>
      </Flex>
    </Card>
  );
}
