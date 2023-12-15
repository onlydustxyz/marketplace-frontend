import ProjectApi from "src/api/Project";
import TinyProfilCard from "src/pages/ProjectDetails/Insights/TinyProfilCard";
import { ShowMore } from "src/components/Table/ShowMore";
import { useIntl } from "src/hooks/useIntl";

export default function NewcomersContributors({
  query,
}: {
  query: ReturnType<typeof ProjectApi.queries.useProjectContributorsNewcomersInfiniteList>;
}) {
  const { T } = useIntl();
  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } = query;
  const newComers = data?.pages?.flatMap(data => data.contributors);
  return (
    <>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {newComers?.map(newComer => (
          <TinyProfilCard
            key={newComer.login}
            cover={newComer.cover}
            avatarUrl={newComer.avatarUrl}
            name={newComer.login}
            isRegistered={newComer.isRegistered}
            bio={
              newComer?.bio === "" || newComer?.bio === null
                ? T("project.details.insights.newcomers.descriptionPlaceholder")
                : newComer?.bio
            }
            location={newComer.location}
            sinceDate={newComer.firstContributedAt ? new Date(newComer.firstContributedAt) : undefined}
            actionLabel={T("project.details.insights.newcomers.buttonLabel")}
            onAction={() => {
              console.log("action");
            }}
          />
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
