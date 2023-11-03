import { components } from "src/__generated/api";
import Card from "src/components/Card";
import Table from "src/components/Table";
import { ShowMore } from "src/components/Table/ShowMore";
import { rates } from "src/hooks/useWorkEstimation";
import { ToRewardDetailsTooltip } from "src/pages/ProjectDetails/Tooltips/ToRewardDetailsTooltip";
import Headers from "./Headers";
import ContributorLine from "./Line";
import { Sorting } from "src/types";

type Props<C> = {
  contributors: C[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isProjectLeader: boolean;
  remainingBudget: number;
  onRewardGranted: (contributor: C) => void;
  sorting: Sorting;
  sortField: (field: string) => void;
};

export default function View<C extends components["schemas"]["ContributorPageItemResponse"]>({
  contributors,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isProjectLeader,
  remainingBudget,
  onRewardGranted: onPaymentRequested,
  sorting,
  sortField,
}: Props<C>) {
  const isSendingNewPaymentDisabled = remainingBudget < rates.hours || remainingBudget === 0;

  return (
    <Card className="h-full">
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
