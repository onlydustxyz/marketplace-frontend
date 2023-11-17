import { ComponentProps } from "react";
import { components } from "src/__generated/api";
import Card from "src/components/Card";
import Table from "src/components/Table";
import { ShowMore } from "src/components/Table/ShowMore";
import { ToRewardDetailsTooltip } from "src/pages/ProjectDetails/Tooltips/ToRewardDetailsTooltip";
import Headers from "./Headers";
import ContributorLine, { RewardDisabledReason } from "./Line";
import useInfiniteContributorList from "src/hooks/useInfiniteContributorList/useInfiniteContributorList";

type Props<C> = {
  contributors: C[];
  remainingBudget: number;
  onRewardGranted: (contributor: C) => void;
} & ComponentProps<typeof Headers> &
  Pick<ReturnType<typeof useInfiniteContributorList>, "fetchNextPage" | "hasNextPage" | "isFetchingNextPage">;

export default function View<C extends components["schemas"]["ContributorPageItemResponse"]>({
  contributors,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isProjectLeader,
  remainingBudget,
  onRewardGranted,
  sorting,
  sortField,
}: Props<C>) {
  const noBudget = remainingBudget === 0;

  function getRewardDisableReason() {
    if (noBudget) {
      return RewardDisabledReason.Budget;
    }

    // TODO handle github app case
  }

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
              rewardDisableReason: getRewardDisableReason(),
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
