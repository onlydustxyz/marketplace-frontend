import { TApplyIssueCard } from "app/p/[slug]/components/apply-issue-card/apply-issue-card.types";

import { Paper } from "components/atoms/paper";
import { Typo } from "components/atoms/typo/variants/typo-default";
import { Icon } from "components/layout/icon/icon";

export function ApplyIssueCard({ container = "2", iconProps, titleProps, children, className }: TApplyIssueCard.Props) {
  return (
    <Paper container={container} border={"none"} classNames={{ base: className }}>
      <header className={"flex items-center gap-1 text-text-1"}>
        {iconProps ? <Icon {...iconProps} size={16} /> : null}
        <Typo size={"xs"} weight={"medium"} {...titleProps} />
      </header>
      {children}
    </Paper>
  );
}
