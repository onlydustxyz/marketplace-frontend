import ProjectApi from "src/api/Project";
import { ShowMore } from "src/components/Table/ShowMore";
import { useIntl } from "src/hooks/useIntl";

export default function ChurnedContributors({
  query,
}: {
  query: ReturnType<typeof ProjectApi.queries.useProjectContributorsMostActivesInfiniteList>;
}) {
  const { T } = useIntl();
  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } = query;
  const mostActive = data?.pages?.flatMap(data => data.contributors);
  return (
    <>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">table</div>
      {hasNextPage ? (
        <div className="py-3">
          <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} isInfinite={false} />
        </div>
      ) : null}
    </>
  );
}
