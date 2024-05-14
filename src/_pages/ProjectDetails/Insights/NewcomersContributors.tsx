import { useRouter } from "next/navigation";

import TinyProfilCard from "src/_pages/ProjectDetails/Insights/commons/TinyProfilCard/TinyProfilCard";
import ProjectApi from "src/api/Project";
import CollapsibleCard from "src/components/New/Cards/CollapsibleCard";
import MessagePlaceholder from "src/components/New/Placeholders/MessagePlaceholder";
import Skeleton from "src/components/Skeleton";
import { ShowMore } from "src/components/Table/ShowMore";
import TeamLine from "src/icons/TeamLine";

import { NEXT_ROUTER } from "constants/router";

import { useIntl } from "hooks/translate/use-translate";

export default function NewcomersContributors({ projectId }: { projectId: string | undefined }) {
  const { T } = useIntl();
  const router = useRouter();
  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    ProjectApi.queries.useProjectContributorsNewcomersInfiniteList({
      params: { projectId: projectId ?? "" },
    });
  const newComersContributors = data?.pages?.flatMap(data => data.contributors);
  const hasContributors = Boolean(newComersContributors?.length);

  function renderContent() {
    if (isLoading) {
      return <Skeleton variant="projectInsightProfilCardContent" />;
    }

    if (isError) {
      return <MessagePlaceholder>{T("project.details.insights.errorPlaceholder")}</MessagePlaceholder>;
    }

    if (!hasContributors) {
      return <MessagePlaceholder>{T("project.details.insights.emptyPlaceholder")}</MessagePlaceholder>;
    }

    return (
      <>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {newComersContributors?.map(contributor => (
            <TinyProfilCard
              key={contributor.login}
              cover={contributor.cover}
              avatarUrl={contributor.avatarUrl}
              name={contributor.login}
              isRegistered={contributor.isRegistered}
              bio={
                contributor?.bio ? (
                  <div className="line-clamp-2 h-10 text-sm font-normal text-greyscale-200">{contributor?.bio}</div>
                ) : (
                  <div className="line-clamp-2 h-10 text-sm font-normal italic text-greyscale-200">
                    {T("project.details.insights.newcomers.descriptionPlaceholder")}
                  </div>
                )
              }
              location={contributor.location}
              sinceDate={contributor.firstContributedAt ? new Date(contributor.firstContributedAt) : undefined}
              actionLabel={T("project.details.insights.newcomers.buttonLabel")}
              onAction={() => router.push(NEXT_ROUTER.newPublicProfile.root(contributor.login))}
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

  return (
    <CollapsibleCard
      title={T("project.details.insights.newcomers.sectionTitle")}
      description={T("project.details.insights.newcomers.sectionSubtitle")}
      icon={<TeamLine />}
      isEmpty={!hasContributors}
      hasShowMore={hasNextPage}
    >
      {renderContent()}
    </CollapsibleCard>
  );
}
