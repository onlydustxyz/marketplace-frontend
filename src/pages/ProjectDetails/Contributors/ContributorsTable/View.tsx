import Table from "src/components/Table";
import { rates } from "src/hooks/useWorkEstimation";
import Headers from "./Headers";
import ContributorLine from "./Line";
import { ContributorT } from "src/types";
import Card from "src/components/Card";
import { ToRewardDetailsTooltip } from "src/pages/ProjectDetails/Tooltips/ToRewardDetailsTooltip";
import { ShowMore } from "src/components/Table/ShowMore";
import { Field, Sorting } from "..";

type Props = {
  contributors: ContributorT[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isProjectLeader: boolean;
  remainingBudget: number;
  onRewardGranted: (contributor: ContributorT) => void;
  sorting: Sorting;
  applySorting: (field: Field, ascending: boolean) => void;
};

export default function View({
  contributors,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isProjectLeader,
  remainingBudget,
  onRewardGranted: onPaymentRequested,
  sorting,
  applySorting,
}: Props) {
  const isSendingNewPaymentDisabled = remainingBudget < rates.hours || remainingBudget === 0;

  return (
    <Card className="h-full">
      <Table
        id="contributors_table"
        headers={<Headers sorting={sorting} applySorting={applySorting} isProjectLeader={isProjectLeader} />}
      >
        {contributors.map(contributor => (
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
      {hasNextPage && (
        <div className="pt-6">
          <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} />
        </div>
      )}
      <ToRewardDetailsTooltip />
    </Card>
  );
}
