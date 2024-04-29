import { DotsStatus } from "app/migration/u/[githubLogin]/components/dots-status/dots-status";
import { InfoItem } from "app/migration/u/[githubLogin]/features/details-accordion/components/info-item";
import { ProjectAvatar } from "app/migration/u/[githubLogin]/features/details-accordion/components/project-avatar";
import { TDetailsAccordion } from "app/migration/u/[githubLogin]/features/details-accordion/details-accordion.types";

import { Avatar } from "components/ds/avatar/avatar";
import { Typography } from "components/layout/typography/typography";

export function StartContent(props: TDetailsAccordion.StartContentProps) {
  const { name, avatarUrl, rankStatus, projects, contributionCount, projectsCount, rewardsCount, earnedUsdAmount } =
    props;
  const remainingCount = Math.max(0, projects.length - 5);

  return (
    <div className="flex flex-wrap gap-6">
      <div className="flex w-fit flex-col gap-3">
        <Avatar src={avatarUrl} alt={name} size="rectangleSize" shape="rectangle" />
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
          <DotsStatus status={rankStatus} />
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
            <InfoItem
              icon="ri-medal-2-line"
              count={rewardsCount}
              labelToken="v2.features.detailsAccordion.contributions"
            />
            <InfoItem
              icon="ri-money-dollar-circle-line"
              count={earnedUsdAmount}
              labelToken="v2.features.detailsAccordion.projects"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
