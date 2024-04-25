import { components } from "src/__generated/api";
import { TooltipPosition, withTooltip } from "src/components/Tooltip";
import { cn } from "src/utils/cn";

import { useIntl } from "hooks/translate/use-translate";

import { Props } from "./ActivityGraph.type";
import { calculateHeight, getFirstNonZeroBar } from "./ActivityGraph.utils";

function ActivityGraphItem({
  weekData,
  maxCount,
  index,
}: {
  weekData: components["schemas"]["UserContributionStats"];
  maxCount: number;
  index: number;
}) {
  const { T } = useIntl();
  const { codeReviewCount, issueCount, pullRequestCount } = weekData;
  const firstNonZeroBar = getFirstNonZeroBar(codeReviewCount, issueCount, pullRequestCount);

  return codeReviewCount || issueCount || pullRequestCount ? (
    <div key={index} className="flex h-10 w-3 flex-col items-end justify-end">
      {pullRequestCount > 0 ? (
        <div
          className={cn(`w-full bg-spacePurple-300 ${calculateHeight(pullRequestCount, maxCount)}`, {
            "rounded-t-sm": firstNonZeroBar === "pullRequest",
          })}
          {...withTooltip(
            T("project.details.insights.mostActives.tooltip.pullRequest", {
              count: pullRequestCount,
              week: weekData?.week,
              year: weekData?.year,
            }),
            {
              position: TooltipPosition.Bottom,
            }
          )}
        />
      ) : null}
      {issueCount > 0 ? (
        <div
          className={cn(`w-full bg-midBlue-300 ${calculateHeight(issueCount, maxCount)}`, {
            "rounded-t-sm": firstNonZeroBar === "issue",
          })}
          {...withTooltip(
            T("project.details.insights.mostActives.tooltip.issue", {
              count: issueCount,
              week: weekData?.week,
              year: weekData?.year,
            }),
            {
              position: TooltipPosition.Bottom,
            }
          )}
        />
      ) : null}
      {codeReviewCount > 0 ? (
        <div
          className={cn(`w-full bg-orange-300 ${calculateHeight(codeReviewCount, maxCount)}`, {
            "rounded-t-sm": firstNonZeroBar === "codeReview",
          })}
          {...withTooltip(
            T("project.details.insights.mostActives.tooltip.codeReview", {
              count: codeReviewCount,
              week: weekData?.week,
              year: weekData?.year,
            }),
            {
              position: TooltipPosition.Bottom,
            }
          )}
        />
      ) : null}
    </div>
  ) : null;
}

export default function ActivityGraph({ data }: Props) {
  const maxCount = Math.max(...data.flatMap(d => [d.codeReviewCount, d.issueCount, d.pullRequestCount]));

  return data ? (
    <div className="flex h-10 flex-row items-end justify-end gap-1">
      {data.map((weekData, index) => (
        <ActivityGraphItem key={`activity-graph-item${index}`} weekData={weekData} index={index} maxCount={maxCount} />
      ))}
    </div>
  ) : null;
}
