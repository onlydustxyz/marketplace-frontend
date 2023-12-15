import ProjectApi from "src/api/Project";
import TinyProfilCard from "src/pages/ProjectDetails/Insights/TinyProfilCard";
import { ShowMore } from "src/components/Table/ShowMore";
import LastContributionCard from "./LastContributionCard";
import { useIntl } from "src/hooks/useIntl";

export default function ChurnedContributors({
  query,
}: {
  query: ReturnType<typeof ProjectApi.queries.useProjectContributorsChurnedInfiniteList>;
}) {
  const { T } = useIntl();
  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } = query;
  const churned = data?.pages?.flatMap(data => data.contributors);
  return (
    <>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {churned?.map(churned => (
          <TinyProfilCard
            key={churned.login}
            cover={churned.cover}
            avatarUrl={churned.avatarUrl}
            name={churned.login}
            isRegistered={churned.isRegistered}
            actionLabel={T("project.details.insights.churned.buttonLabel")}
            onAction={() => {
              console.log("action");
            }}
          >
            <LastContributionCard
              lastContributionDate={churned?.lastContribution?.completedAt}
              repoName={churned?.lastContribution?.repo?.name}
              linkUrl={churned.lastContribution?.repo?.htmlUrl}
            />
          </TinyProfilCard>
        ))}
      </div>
      {hasNextPage ? (
        <div className="py-3">
          <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} isInfinite={false} />
        </div>
      ) : null}
    </>
  );
}
