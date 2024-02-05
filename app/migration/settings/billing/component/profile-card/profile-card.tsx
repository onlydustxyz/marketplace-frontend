import { ProfileStatus } from "app/migration/settings/billing/component/profile-status/profile-status";

import { Card } from "components/ds/card/card";

import { TProfileCard } from "./profile-card.types";

export function ProfileCard({ status, children, hasValidBillingProfile }: TProfileCard.Props) {
  return (
    <Card className="relative flex w-full flex-col gap-4" background="base">
      <div className="flex w-full flex-row justify-end">
        <ProfileStatus status={status} hasValidBillingProfile={hasValidBillingProfile} />
      </div>
      {children}
    </Card>
  );
}
