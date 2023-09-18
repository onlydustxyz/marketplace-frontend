import React from "react";

import {
  ContributionBadge,
  ContributionBadgeStatus,
  ContributionBadgeType,
} from "../ContributionBadge/ContributionBadge";

export function Contribution() {
  return (
    <div>
      <ContributionBadge id="123" type={ContributionBadgeType.PR} status={ContributionBadgeStatus.Open} /> Contribution
    </div>
  );
}
