import { ComponentProps } from "react";
import Card from "src/components/Card";
import Table from "src/components/Table";
import { ShowMore } from "src/components/Table/ShowMore";
import { ToRewardDetailsTooltip } from "src/_pages/ProjectDetails/Tooltips/ToRewardDetailsTooltip";
import Headers from "./Headers";
import ContributorLine from "./Line";
import ProjectApi from "src/api/Project";
import { ProjectContributorItem } from "src/api/Project/queries";

type Props<C> = {
  contributors: C[];
  onRewardGranted: (contributor: C) => void;
  onToggleContributor: (contributor: C) => void;
  rewardDisableReason?: ComponentProps<typeof ContributorLine>["rewardDisableReason"];
} & ComponentProps<typeof Headers> &
  Pick<
    ReturnType<typeof ProjectApi.queries.useProjectContributorsInfiniteList>,
    "fetchNextPage" | "hasNextPage" | "isFetchingNextPage"
  >;

export default function View<C extends ProjectContributorItem>({
  contributors,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isProjectLeader,
  onRewardGranted,
  onToggleContributor,
  sorting,
  sortField,
  rewardDisableReason,
}: Props<C>) {
  return (
    <Card>
      <Table
        id="contributors_table"
        headers={<Headers sorting={sorting} sortField={sortField} isProjectLeader={isProjectLeader} />}
      >
        {contributors.map(contributor => (
          <ContributorLine
            key={contributor.login}
            {...{
              contributor,
              isProjectLeader,
              onRewardGranted,
              onToggleContributor,
              rewardDisableReason,
            }}
          />
        ))}
      </Table>
      {hasNextPage && (
        <div className="pt-6">
          <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} />
        </div>
      )}
      <ToRewardDetailsTooltip />
    </Card>
  );
}
