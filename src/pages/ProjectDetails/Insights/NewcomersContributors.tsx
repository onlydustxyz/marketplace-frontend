import TinyProfilCard from "src/pages/ProjectDetails/Insights/commons/TinyProfilCard/TinyProfilCard";
import { ShowMore } from "src/components/Table/ShowMore";
import { useIntl } from "src/hooks/useIntl";
import ProjectApi from "src/api/Project";
import CollapsibleCard from "src/components/New/Cards/CollapsibleCard";
import TeamLine from "src/icons/TeamLine";

export default function NewcomersContributors({ projectId }: { projectId: string | undefined }) {
  const { T } = useIntl();
  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    ProjectApi.queries.useProjectContributorsNewcomersInfiniteList({
      params: { projectId: projectId ?? "" },
    });
  const newComersContributors = data?.pages?.flatMap(data => data.contributors);
  const hasContributors = Boolean(newComersContributors?.length);
  return (
    <CollapsibleCard
      title={T("project.details.insights.newcomers.sectionTitle")}
      description={T("project.details.insights.newcomers.sectionSubtitle")}
      icon={<TeamLine />}
      isEmpty={!hasContributors}
      hasShowMore={hasNextPage}
    >
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {newComersContributors?.map(contributor => (
          <TinyProfilCard
            key={contributor.login}
            cover={contributor.cover}
            avatarUrl={contributor.avatarUrl}
            name={contributor.login}
            isRegistered={contributor.isRegistered}
            bio={contributor?.bio}
            location={contributor.location}
            sinceDate={contributor.firstContributedAt ? new Date(contributor.firstContributedAt) : undefined}
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
    </CollapsibleCard>
  );
}
