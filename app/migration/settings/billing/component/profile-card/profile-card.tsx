import { ProfileBanner } from "app/migration/settings/billing/component/profile-banner/profile-banner";
import { ProfileStatus } from "app/migration/settings/billing/component/profile-status/profile-status";
import { useBillingStatus } from "app/migration/settings/billing/hooks/useBillingStatus";

import { Card } from "components/ds/card/card";

import { TProfileCard } from "./profile-card.types";

export function ProfileCard({ status, children, hasValidBillingProfile }: TProfileCard.Props) {
  const { isWarning, isError } = useBillingStatus(hasValidBillingProfile, status);
  return (
    <Card className="relative w-full" background="base">
      <div className="flex w-full flex-row justify-end">
        <ProfileStatus status={status} hasValidBillingProfile={hasValidBillingProfile} />
      </div>
      {children}
      <ProfileBanner hasValidBillingProfile={hasValidBillingProfile} status={status} />
    </Card>
  );
}
