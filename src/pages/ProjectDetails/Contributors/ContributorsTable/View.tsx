import { ComponentProps } from "react";
import { components } from "src/__generated/api";
import Card from "src/components/Card";
import Table from "src/components/Table";
import { ShowMore } from "src/components/Table/ShowMore";
import useInfiniteContributorList from "src/hooks/useInfiniteContributorList/useInfiniteContributorList";
import { ToRewardDetailsTooltip } from "src/pages/ProjectDetails/Tooltips/ToRewardDetailsTooltip";
import Headers from "./Headers";
import ContributorLine from "./Line";

type Props<C> = {
  contributors: C[];
  onRewardGranted: (contributor: C) => void;
  rewardDisableReason?: ComponentProps<typeof ContributorLine>["rewardDisableReason"];
} & ComponentProps<typeof Headers> &
  Pick<ReturnType<typeof useInfiniteContributorList>, "fetchNextPage" | "hasNextPage" | "isFetchingNextPage">;

export default function View<C extends components["schemas"]["ContributorPageItemResponse"]>({
  contributors,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isProjectLeader,
  onRewardGranted,
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
