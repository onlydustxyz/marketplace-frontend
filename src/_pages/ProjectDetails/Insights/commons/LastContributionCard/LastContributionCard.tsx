import Card from "src/components/Card";
import ArrowRightSLine from "src/icons/ArrowRightSLine";
import StackLine from "src/icons/StackLine";
import displayRelativeDate from "src/utils/displayRelativeDate";

import { Link } from "components/ds/link/link";

import { useIntl } from "hooks/translate/use-translate";

import { LastContributionCardProps } from "./LastContributionCard.type";

export default function LastContributionCard({
  lastContributionDate = "",
  repoName = "",
  linkUrl = "",
}: LastContributionCardProps) {
  const { T } = useIntl();
  return (
    <Card className="bg-card-background-light px-2 py-3 shadow-medium lg:px-2 lg:py-3">
      <div className="flex items-center gap-3">
        <div className="rounded-lg border border-card-border-medium bg-card-background-medium p-2 leading-none text-greyscale-50">
          <div className="h-4 w-4 text-base leading-none">
            <StackLine />
          </div>
        </div>
        <div className="flex-1">
          <div className="text-sm font-normal text-greyscale-200">
            {T("project.details.insights.churned.lastContribution.title")}
          </div>
          <div className="line-clamp-1 text-xs font-medium">
            <span>
              {displayRelativeDate(new Date(lastContributionDate))}{" "}
              {T("project.details.insights.churned.lastContribution.on")}{" "}
            </span>
            <Link href={linkUrl}>{repoName}</Link>
          </div>
        </div>
        <ArrowRightSLine />
      </div>
    </Card>
  );
}
