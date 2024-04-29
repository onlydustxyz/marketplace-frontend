import { ContributionBadge } from "components/features/contribution/contribution-badge/contribution-badge";
import { TContributionBadge } from "components/features/contribution/contribution-badge/contribution-badge.type";

import { TContributionItem } from "./contribution-item.types";

export function ContributionItem({ children }: TContributionItem.Props) {
  return <ContributionBadge contribution={contribution} size={TContributionBadge.sizes.Md} withTooltip={false} />;
}
