import { generatePath, useNavigate, useParams } from "react-router-dom";
import ProjectApi from "src/api/Project";
import { getOrgsWithUnauthorizedRepos } from "src/utils/getOrgsWithUnauthorizedRepos";
import Title from "../Title";
import { RoutePaths, ProjectRoutePaths, ProjectRewardsRoutePaths } from "src/App";
import { withTooltip } from "src/components/Tooltip";
import Flex from "src/components/Utils/Flex";
import { EditProjectButton } from "../components/EditProjectButton";
import { useIntl } from "src/hooks/useIntl";
import Button, { ButtonOnBackground, ButtonSize, Width } from "src/components/Button";
import CollapsibleCard from "src/components/New/Cards/CollapsibleCard";
import TeamLine from "src/icons/TeamLine";
import Newcomers from "./Newcomers";

export default function Insights() {
  const { T } = useIntl();
  const navigate = useNavigate();
  const { projectKey = "" } = useParams<{ projectKey?: string }>();

  const { data: project } = ProjectApi.queries.useGetProjectBySlug({
    params: { slug: projectKey },
  });

  const isRewardDisabled = !project?.hasRemainingBudget;
  const orgsWithUnauthorizedRepos = project ? getOrgsWithUnauthorizedRepos(project) : [];
  const hasOrgsWithUnauthorizedRepos = orgsWithUnauthorizedRepos.length > 0;

  const newComers = {
    title: "New contributors",
    description: "All contrbutors that have joined one of your repositories during last month.",
    icon: (className: string) => <TeamLine className={className} />,
    query: ProjectApi.queries.useProjectContributorsNewcomersInfiniteList({
      params: { projectId: project?.id ?? "" },
    }),
  };

  const mostActives = {
    title: "Most active contributors",
    description: "User that we indentified as your best profiles and that would match a maintainer role.",
    icon: (className: string) => <TeamLine className={className} />,
    query: ProjectApi.queries.useProjectContributorsMostActivesInfiniteList({
      params: { projectId: project?.id ?? "" },
    }),
  };

  const staled = {
    title: "Contributors struggling",
    description: "User that might encounter a problem on their current task based on their latest actions.",
    icon: (className: string) => <TeamLine className={className} />,
    query: ProjectApi.queries.useProjectContributionsStaledInfiniteList({
      params: { projectId: project?.id ?? "" },
    }),
  };

  const churned = {
    title: "Churned contributors",
    description: "User that are inactive for a long time period and stop contributing to your project.",
    icon: (className: string) => <TeamLine className={className} />,
    query: ProjectApi.queries.useProjectContributorsChurnedInfiniteList({
      params: { projectId: project?.id ?? "" },
    }),
  };

  return (
    <>
      <div className="flex flex-col items-start justify-start gap-4 md:flex-row md:items-center md:justify-between md:gap-2">
        <Title>{T("project.details.insights.title")}</Title>
        {!hasOrgsWithUnauthorizedRepos ? (
          <Flex className="w-full justify-start gap-2 md:w-auto md:justify-end">
            <EditProjectButton projectKey={projectKey} />
            <Button
              width={Width.Fit}
              className="flex-1 md:flex-initial"
              size={ButtonSize.Sm}
              disabled={isRewardDisabled}
              onBackground={ButtonOnBackground.Blue}
              onClick={() => {
                return navigate(
                  generatePath(
                    `${RoutePaths.ProjectDetails}/${ProjectRoutePaths.Rewards}/${ProjectRewardsRoutePaths.New}`,
                    {
                      projectKey,
                    }
                  )
                );
              }}
              {...withTooltip(T("contributor.table.noBudgetLeft"), {
                visible: isRewardDisabled,
              })}
            >
              <span>{T("project.details.remainingBudget.newReward")}</span>
            </Button>
          </Flex>
        ) : null}
      </div>

      <div className="h-full overflow-y-auto">
        <div className="h-full w-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5">
          <div className="relative flex min-h-full flex-col gap-6">
            <CollapsibleCard
              key={newComers.title}
              title={newComers.title}
              description={newComers.description}
              icon={newComers.icon}
              isEmpty={!!newComers.query.hasNextPage}
              hasShowMore={newComers.query.hasNextPage}
            >
              <Newcomers query={newComers.query} />
            </CollapsibleCard>
          </div>
        </div>
      </div>
    </>
  );
}
