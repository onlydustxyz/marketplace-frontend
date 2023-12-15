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
import NewcomersContributors from "./NewcomersContributors";
import ChurnedContributors from "./ChurnedContributors";
import Sparkling2Line from "src/icons/Sparkling2Line";
import QuestionLine from "src/icons/QuestionLine";
import LogoutCircleLine from "src/icons/LogoutCircleLine";

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
    title: T("project.details.insights.newcomers.sectionTitle"),
    description: T("project.details.insights.newcomers.sectionSubtitle"),
    icon: (className: string) => <TeamLine className={className} />,
    query: ProjectApi.queries.useProjectContributorsNewcomersInfiniteList({
      params: { projectId: project?.id ?? "" },
    }),
  };

  const mostActives = {
    title: T("project.details.insights.mostActives.sectionTitle"),
    description: T("project.details.insights.mostActives.sectionSubtitle"),
    icon: (className: string) => <Sparkling2Line className={className} />,
    query: ProjectApi.queries.useProjectContributorsMostActivesInfiniteList({
      params: { projectId: project?.id ?? "" },
    }),
  };

  const staled = {
    title: T("project.details.insights.staled.sectionTitle"),
    description: T("project.details.insights.staled.sectionSubtitle"),
    icon: (className: string) => <QuestionLine className={className} />,
    query: ProjectApi.queries.useProjectContributionsStaledInfiniteList({
      params: { projectId: project?.id ?? "" },
    }),
  };

  const churned = {
    title: T("project.details.insights.churned.sectionTitle"),
    description: T("project.details.insights.churned.sectionSubtitle"),
    icon: (className: string) => <LogoutCircleLine className={className} />,
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
              isEmpty={!newComers.query.data?.pages?.flatMap(data => data.contributors)?.length}
              hasShowMore={newComers.query.hasNextPage}
            >
              <NewcomersContributors query={newComers.query} />
            </CollapsibleCard>
            <CollapsibleCard
              key={churned.title}
              title={churned.title}
              description={churned.description}
              icon={churned.icon}
              isEmpty={!churned.query.data?.pages?.flatMap(data => data.contributors)?.length}
              hasShowMore={churned.query.hasNextPage}
            >
              <ChurnedContributors query={churned.query} />
            </CollapsibleCard>
          </div>
        </div>
      </div>
    </>
  );
}
