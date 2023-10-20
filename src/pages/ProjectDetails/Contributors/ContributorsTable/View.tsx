import Table from "src/components/Table";
import { rates } from "src/hooks/useWorkEstimation";
import { useMemo, useState } from "react";
import { sortBy } from "lodash";
import Headers from "./Headers";
import ContributorLine from "./Line";
import { ContributorT } from "src/types";
import Card from "src/components/Card";
import { ToRewardDetailsTooltip } from "src/pages/ProjectDetails/Tooltips/ToRewardDetailsTooltip";

export enum Field {
  Login = "login",
  TotalEarned = "totalEarned",
  ContributionCount = "contributionCount",
  RewardCount = "rewardCount",
  ToRewardCount = "toRewardCount",
}

export type Sorting = {
  field: Field;
  ascending: boolean;
};

type Props = {
  contributors: ContributorT[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isProjectLeader: boolean;
  remainingBudget: number;
  onRewardGranted: (contributor: ContributorT) => void;
};

export default function View({
  contributors,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isProjectLeader,
  remainingBudget,
  onRewardGranted: onPaymentRequested,
}: Props) {
  const isSendingNewPaymentDisabled = remainingBudget < rates.hours || remainingBudget === 0;

  const [sorting, setSorting] = useState({
    field: isProjectLeader ? Field.ToRewardCount : Field.ContributionCount,
    ascending: false,
  });

  const applySorting = (field: Field, ascending: boolean) =>
    setSorting({ field, ascending: sorting.field === field ? !sorting.ascending : ascending });

  const sortedContributors = useMemo(() => {
    const sorted = sortBy([...contributors], contributor => {
      const f = contributor[sorting.field as keyof ContributorT] || 0;
      return typeof f === "string" ? f.toLocaleLowerCase() : f;
    });
    return sorting.ascending ? sorted : sorted.reverse();
  }, [sorting, contributors]);

  console.log({ sortedContributors });

  return (
    <Card className="h-full">
      <Table
        id="contributors_table"
        headers={<Headers sorting={sorting} applySorting={applySorting} isProjectLeader={isProjectLeader} />}
      >
        {sortedContributors.map(contributor => (
          <ContributorLine
            key={contributor.login}
            {...{
              contributor,
              isProjectLeader,
              isGivingRewardDisabled: isSendingNewPaymentDisabled,
              onRewardGranted: onPaymentRequested,
            }}
          />
        ))}
      </Table>
      <div>
        <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
          {isFetchingNextPage ? "Loading more..." : hasNextPage ? "Load More" : "Nothing more to load"}
        </button>
      </div>
      <ToRewardDetailsTooltip />
    </Card>
  );
}
