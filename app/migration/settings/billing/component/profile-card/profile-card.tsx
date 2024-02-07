import { ProfileStatus } from "app/migration/settings/billing/component/profile-status/profile-status";

import { Card } from "components/ds/card/card";

import { TProfileCard } from "./profile-card.types";

export function ProfileCard({ status, children, hasValidBillingProfile }: TProfileCard.Props) {
  return (
    <Card className="pb relative flex w-full flex-col" background="base">
      <div className="mb-5 flex w-full flex-row justify-end xl:-mb-1 ">
        <ProfileStatus status={status} hasValidBillingProfile={hasValidBillingProfile} />
      </div>
      <div className="gap flex w-full flex-col gap-9">{children}</div>
    </Card>
  );
}
