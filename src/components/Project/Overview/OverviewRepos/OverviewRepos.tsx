import { sortBy } from "lodash";
import { useMemo } from "react";

import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import Badge, { BadgeSize } from "src/components/Badge";
import { VerticalListItemCard } from "src/components/New/Cards/VerticalListItemCard";
import GithubRepoDetails from "src/components/Project/Overview/OverviewRepos/GithubRepoDetails";
import { useIntl } from "src/hooks/useIntl";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import { cn } from "src/utils/cn";

export interface ProjectOverviewReposProps {
  project: UseGetProjectBySlugResponse;
  reposCol?: 1 | 2;
  withRepoBg?: boolean;
}

export const ProjectOverviewRepos = ({ project, reposCol = 2, withRepoBg = true }: ProjectOverviewReposProps) => {
  const { T } = useIntl();

  const nbRepos = useMemo(
    () => project?.organizations?.flatMap(({ repos }) => repos).length ?? 0,
    [project?.organizations]
  );

  return (
    <>
      <div className="flex flex-row items-center justify-between border-b border-greyscale-50/8 pb-2 font-walsheim text-base font-medium text-greyscale-50">
        <div className="flex flex-row items-center gap-3">
          <GitRepositoryLine className="text-2xl text-white" />
          {T("project.details.overview.repositories.title")}
        </div>
        <Badge value={nbRepos} size={BadgeSize.Small} />
      </div>
      <div className="flex flex-col gap-6 divide-y divide-greyscale-50/8">
        {project.organizations?.map((organization, i) => (
          <div key={organization.name ?? organization?.login} className={i > 0 ? "pt-6" : ""}>
            <VerticalListItemCard
              ContainerProps={{ className: "bg-transparent gap-5 p-0 lg:p-0 border-0" }}
              title={organization?.name ?? organization?.login ?? ""}
              avatarAlt={organization?.name ?? organization?.login ?? ""}
              avatarSrc={organization?.avatarUrl ?? ""}
            >
              <div
                className={cn("grid grid-cols-1 gap-3", {
                  "xl:grid-cols-2": reposCol === 2,
                })}
              >
                {sortBy(organization.repos, "stars")
                  .reverse()
                  .filter(r => r)
                  .map(githubRepo => (
                    <GithubRepoDetails key={githubRepo.id} githubRepo={githubRepo} withBg={withRepoBg} />
                  ))}
              </div>
            </VerticalListItemCard>
          </div>
        ))}
      </div>
    </>
  );
};
