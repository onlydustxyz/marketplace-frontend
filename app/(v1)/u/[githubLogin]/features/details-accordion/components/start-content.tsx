import { DotsStatus } from "app/(v1)/u/[githubLogin]/components/dots-status/dots-status";
import { InfoItem } from "app/(v1)/u/[githubLogin]/features/details-accordion/components/info-item";
import { ProjectAvatar } from "app/(v1)/u/[githubLogin]/features/details-accordion/components/project-avatar";
import { TDetailsAccordion } from "app/(v1)/u/[githubLogin]/features/details-accordion/details-accordion.types";

import { RectAvatar } from "components/ds/rect-avatar/rect-avatar";
import { Typography } from "components/layout/typography/typography";

export function StartContent(props: TDetailsAccordion.StartContentProps) {
  const {
    name,
    avatarUrl,
    contributingStatus,
    projects,
    contributionCount,
    projectsCount,
    rewardCount,
    totalEarnedUsd,
  } = props;
  const remainingCount = Math.max(0, projects.length - 5);

  return (
    <div className="flex flex-wrap gap-6">
      <div className="flex w-fit flex-col gap-3">
        <RectAvatar src={avatarUrl} alt={name} size="l" shape="rectangle" classNames={{ img: "object-contain" }} />
        <div className="grid grid-cols-6 gap-1">
          {projects.slice(0, 5).map(project => (
            <ProjectAvatar key={project.name} {...project} />
          ))}
          {remainingCount > 0 && (
            <div className="flex items-center justify-center">
              <Typography variant="body-l-bold">+{remainingCount}</Typography>
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full flex-1 flex-col items-start justify-start gap-4">
        <div className="flex items-center justify-start gap-2">
          <Typography variant="title-m" className="line-clamp-1">
            {name}
          </Typography>
          <DotsStatus status={contributingStatus} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            <InfoItem
              icon="ri-stack-line"
              count={contributionCount}
              labelToken="v2.features.detailsAccordion.contributions"
            />
            <InfoItem
              icon="ri-folder-3-line"
              count={projectsCount}
              labelToken="v2.features.detailsAccordion.projects"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <InfoItem icon="ri-medal-2-line" count={rewardCount} labelToken="v2.features.detailsAccordion.rewards" />
            <InfoItem
              icon="ri-money-dollar-circle-line"
              count={totalEarnedUsd}
              labelToken="v2.features.detailsAccordion.usdInTotal"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
