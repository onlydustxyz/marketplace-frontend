import { TApplyIssueCard } from "app/p/[slug]/components/apply-issue-card/apply-issue-card.types";

import { Paper } from "components/atoms/paper";
import { Typo } from "components/atoms/typo/variants/typo-default";
import { Icon } from "components/layout/icon/icon";

export function ApplyIssueCard({ paperProps, iconProps, titleProps, children }: TApplyIssueCard.Props) {
  return (
    <Paper {...paperProps}>
      <header>
        <Icon {...iconProps} />
        <Typo {...titleProps} />
      </header>
      {children}
    </Paper>
  );
}
