import { Card } from "components/ds/card/card";
import { ContributionBadge } from "components/features/contribution/contribution-badge/contribution-badge";
import { TContributionBadge } from "components/features/contribution/contribution-badge/contribution-badge.type";

import { TContributionItem } from "./contribution-item.types";

export function ContributionItem({ contribution }: TContributionItem.Props) {
  return (
    <Card background={false} border={"light"}>
      <ContributionBadge contribution={contribution} size={TContributionBadge.sizes.Md} withTooltip={false} />
    </Card>
  );
}
