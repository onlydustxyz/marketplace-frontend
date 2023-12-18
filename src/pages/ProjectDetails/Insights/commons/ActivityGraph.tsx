import { components } from "src/__generated/api";
import { TooltipPosition, withTooltip } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import { cn } from "src/utils/cn";

type Props = {
  data: components["schemas"]["UserContributionStats"][];
};

const calculateHeight = (count: number, maxCount: number): string => {
  if (count === 0) return "";
  const relativeHeight = Math.ceil((count / maxCount) * 10);
  return `h-${relativeHeight}`;
};

const getFirstNonZeroBar = (codeReviewCount: number, issueCount: number, pullRequestCount: number): string => {
  if (pullRequestCount > 0) return "pullRequest";
  if (issueCount > 0) return "issue";
  if (codeReviewCount > 0) return "codeReview";
  return "";
};

export default function ActivityGraph({ data }: Props) {
  const { T } = useIntl();
  const maxCount = Math.max(...data.flatMap(d => [d.codeReviewCount, d.issueCount, d.pullRequestCount]));
  console.log("yolo");

  return (
    <div className="flex flex-row items-end justify-end gap-1">
      {data.map((weekData, index) => {
        const { codeReviewCount, issueCount, pullRequestCount } = weekData;
        const firstNonZeroBar = getFirstNonZeroBar(codeReviewCount, issueCount, pullRequestCount);

        return (
          <div key={index} className="flex h-10 w-3 flex-col items-end justify-end">
            {pullRequestCount > 0 && (
              <div
                className={cn(`w-full bg-spacePurple-300 ${calculateHeight(pullRequestCount, maxCount)}`, {
                  "rounded-t-md": firstNonZeroBar === "pullRequest",
                })}
                {...withTooltip(
                  T("project.details.insights.mostActives.tooltip.pullRequest", { count: pullRequestCount }),
                  {
                    position: TooltipPosition.Bottom,
                  }
                )}
              />
            )}
            {issueCount > 0 && (
              <div
                className={cn(`w-full bg-midBlue-300 ${calculateHeight(issueCount, maxCount)}`, {
                  "rounded-t-md": firstNonZeroBar === "issue",
                })}
                {...withTooltip(T("project.details.insights.mostActives.tooltip.issue", { count: issueCount }), {
                  position: TooltipPosition.Bottom,
                })}
              />
            )}
            {codeReviewCount > 0 && (
              <div
                className={cn(`w-full bg-orange-300 ${calculateHeight(codeReviewCount, maxCount)}`, {
                  "rounded-t-md": firstNonZeroBar === "codeReview",
                })}
                {...withTooltip(
                  T("project.details.insights.mostActives.tooltip.codeReview", { count: codeReviewCount }),
                  {
                    position: TooltipPosition.Bottom,
                  }
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
