import ProjectApi from "src/api/Project";
import TinyProfilCard from "src/pages/ProjectDetails/Insights/commons/TinyProfilCard";
import { ShowMore } from "src/components/Table/ShowMore";
import LastContributionCard from "./commons/LastContributionCard";
import { useIntl } from "src/hooks/useIntl";
import CollapsibleCard from "src/components/New/Cards/CollapsibleCard";
import LogoutCircleLine from "src/icons/LogoutCircleLine";

export default function ChurnedContributors({ projectId }: { projectId: string | undefined }) {
  const { T } = useIntl();
  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    ProjectApi.queries.useProjectContributorsChurnedInfiniteList({
      params: { projectId: projectId ?? "" },
    });
  const churnedContributors = data?.pages?.flatMap(data => data.contributors);
  const hasContributors = Boolean(churnedContributors?.length);
  return (
    <CollapsibleCard
      title={T("project.details.insights.churned.sectionTitle")}
      description={T("project.details.insights.churned.sectionSubtitle")}
      icon={<LogoutCircleLine />}
      isEmpty={!hasContributors}
      hasShowMore={hasNextPage}
    >
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {churnedContributors?.map(contributor => (
          <TinyProfilCard
            key={contributor.login}
            cover={contributor.cover}
            avatarUrl={contributor.avatarUrl}
            name={contributor.login}
            isRegistered={contributor.isRegistered}
            actionLabel={T("project.details.insights.churned.buttonLabel")}
            onAction={() => {
              console.log("action");
            }}
          >
            <LastContributionCard
              lastContributionDate={contributor?.lastContribution?.completedAt}
              repoName={contributor?.lastContribution?.repo?.name}
              linkUrl={contributor.lastContribution?.repo?.htmlUrl}
            />
          </TinyProfilCard>
        ))}
      </div>
      {hasNextPage ? (
        <div className="py-3">
          <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} isInfinite={false} />
        </div>
      ) : null}
    </CollapsibleCard>
  );
}
