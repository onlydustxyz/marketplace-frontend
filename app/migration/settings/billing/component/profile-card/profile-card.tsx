import { Status } from "app/migration/settings/billing/component/status/status";
import { useBillingStatus } from "app/migration/settings/billing/hooks/useBillingStatus";

import { Card } from "components/ds/card/card";

import { TProfileCard } from "./profile-card.types";

export function ProfileCard({ status, children }: TProfileCard.Props) {
  const { isWarning, isError } = useBillingStatus(status);
  return (
    <Card className="relative w-full" background="base" isError={isError} isWarning={isWarning}>
      <div className="flex w-full flex-row justify-end">
        <Status status={status} />
      </div>
      {children}
    </Card>
  );
}
