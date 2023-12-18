import Card from "src/components/Card";
import ArrowRightSLine from "src/icons/ArrowRightSLine";
import StackLine from "src/icons/StackLine";
import displayRelativeDate from "src/utils/displayRelativeDate";

interface LastContributionCardProps {
  lastContributionDate: string;
  repoName?: string;
  linkUrl?: string;
}

export default function LastContributionCard({
  lastContributionDate = "",
  repoName = "",
  linkUrl = "",
}: LastContributionCardProps) {
  return (
    <a href={linkUrl} target="_blank" rel="noopener noreferrer">
      <Card className="bg-card-background-light px-2 py-3 shadow-medium lg:px-2 lg:py-3">
        <div className="flex items-center gap-3">
          <div className="rounded-lg border border-card-border-medium bg-card-background-medium p-2 leading-none text-greyscale-50">
            <div className="h-4 w-4 text-base leading-none">
              <StackLine />
            </div>
          </div>
          <div className="flex-1">
            <div className="text-sm font-normal text-greyscale-200">Last contribution</div>
            <div className=" line-clamp-1 text-xs font-medium">
              <span>{displayRelativeDate(new Date(lastContributionDate))} on </span>
              <span className="text-spacePurple-300">{repoName}</span>
            </div>
          </div>
          <ArrowRightSLine />
        </div>
      </Card>
    </a>
  );
}
