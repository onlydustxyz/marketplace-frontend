import Table from "src/components/Table";
import { rates } from "src/hooks/useWorkEstimation";
import { useMemo, useState } from "react";
import { sortBy } from "lodash";
import Headers from "./Headers";
import ContributorLine from "./Line";
import { Contributor as ContributorBase } from "src/types";
import Card from "src/components/Card";
import { ToRewardDetailsTooltip } from "src/pages/ProjectDetails/Tooltips/ToRewardDetailsTooltip";

export type Contributor = ContributorBase & {
  totalEarned: number;
  contributionCount: number;
  rewardCount: number;
  unpaidPullRequestCount: number;
  unpaidIssueCount: number;
  unpaidCodeReviewCount: number;
  paidContributionsCount: number;
  toRewardCount: number;
  unpaidMergedPullsCount: number;
};

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
  contributors: Contributor[];
  isProjectLeader: boolean;
  remainingBudget: number;
  onRewardGranted: (contributor: Contributor) => void;
};

export default function View({
  contributors,
  isProjectLeader,
  remainingBudget,
  onRewardGranted: onPaymentRequested,
}: Props) {
  const isSendingNewPaymentDisabled = remainingBudget < rates.hours;

  const [sorting, setSorting] = useState({
    field: isProjectLeader ? Field.ToRewardCount : Field.ContributionCount,
    ascending: false,
  });

  const applySorting = (field: Field, ascending: boolean) =>
    setSorting({ field, ascending: sorting.field === field ? !sorting.ascending : ascending });

  const sortedContributors = useMemo(() => {
    const sorted = sortBy([...contributors], contributor => {
      const f = contributor[sorting.field] || 0;
      return typeof f === "string" ? f.toLocaleLowerCase() : f;
    });
    return sorting.ascending ? sorted : sorted.reverse();
  }, [sorting, contributors]);

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
      <ToRewardDetailsTooltip />
    </Card>
  );
}
