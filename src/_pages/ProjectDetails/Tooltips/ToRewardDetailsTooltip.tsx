import { Tooltip as ReactTooltip } from "react-tooltip";
import CodeReviewIcon from "src/assets/icons/CodeReviewIcon";
import Tag, { TagSize } from "src/components/Tag";
import { useIntl } from "src/hooks/useIntl";
import CheckboxCircleLine from "src/icons/CheckboxCircleLine";
import GitMergeLine from "src/icons/GitMergeLine";

type ToRewardDetailsTooltipProps = {
  positionStrategy?: "absolute" | "fixed";
};

export function ToRewardDetailsTooltip({ positionStrategy }: ToRewardDetailsTooltipProps) {
  const { T } = useIntl();

  return (
    <ReactTooltip
      id="to-reward-details"
      positionStrategy={positionStrategy}
      style={{
        backgroundColor: "#27243A",
        opacity: 1,
        borderRadius: 8,
        padding: "8 12",
      }}
      render={({ content }) => {
        const { unpaidPullRequestCount, unpaidIssueCount, unpaidCodeReviewCount } = JSON.parse(content || "{}");
        return (
          <div className="flex items-center gap-1">
            {unpaidPullRequestCount > 0 && (
              <Tag size={TagSize.Small}>
                <GitMergeLine />
                {T("contributor.table.tooltip.pullRequests", { count: unpaidPullRequestCount })}
              </Tag>
            )}
            {unpaidIssueCount > 0 && (
              <Tag size={TagSize.Small}>
                <CheckboxCircleLine />
                {T("contributor.table.tooltip.issues", { count: unpaidIssueCount })}
              </Tag>
            )}
            {unpaidCodeReviewCount > 0 && (
              <Tag size={TagSize.Small}>
                <CodeReviewIcon className="h-3 w-3" />
                {T("contributor.table.tooltip.codeReviews.long", { count: unpaidCodeReviewCount })}
              </Tag>
            )}
          </div>
        );
      }}
    />
  );
}
