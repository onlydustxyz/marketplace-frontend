import Table from "src/components/Table";
import { rates } from "src/hooks/useWorkEstimation";
import { useMemo, useState } from "react";
import { sortBy } from "lodash";
import Headers from "./Headers";
import ContributorLine from "./Line";
import { Contributor as ContributorBase } from "src/types";
import Card from "src/components/Card";
import { useIntl } from "src/hooks/useIntl";
import { Tooltip as ReactTooltip } from "react-tooltip";
import CodeReviewIcon from "src/assets/icons/CodeReviewIcon";
import Tag, { TagSize } from "src/components/Tag";
import CheckboxCircleLine from "src/icons/CheckboxCircleLine";
import GitMergeLine from "src/icons/GitMergeLine";

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

function ToRewardDetailsTooltip() {
  const { T } = useIntl();

  return (
    <ReactTooltip
      id="to-reward-details"
      style={{
        backgroundColor: "#27243A",
        opacity: 1,
        borderRadius: 8,
        padding: "8 12",
      }}
      render={({ content }) => {
        const { unpaidPullRequestCount, unpaidIssueCount, unpaidCodeReviewCount } = JSON.parse(content || "{}");
        return (
          <div className="flex items-center gap-1">
            {unpaidPullRequestCount > 0 && (
              <Tag size={TagSize.Small}>
                <GitMergeLine />
                {T("contributor.table.tooltip.pullRequests", { count: unpaidPullRequestCount })}
              </Tag>
            )}
            {unpaidIssueCount > 0 && (
              <Tag size={TagSize.Small}>
                <CheckboxCircleLine />
                {T("contributor.table.tooltip.issues", { count: unpaidIssueCount })}
              </Tag>
            )}
            {unpaidCodeReviewCount > 0 && (
              <Tag size={TagSize.Small}>
                <CodeReviewIcon />
                {T("contributor.table.tooltip.codeReviews", { count: unpaidCodeReviewCount })}
              </Tag>
            )}
          </div>
        );
      }}
    />
  );
}
