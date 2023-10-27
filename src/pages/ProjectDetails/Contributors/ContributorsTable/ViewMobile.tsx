import { components } from "src/__generated/api";
import Card from "src/components/Card";
import Contributor from "src/components/Contributor";
import { ShowMore } from "src/components/Table/ShowMore";
import Medal2Fill from "src/icons/Medal2Fill";
import MoneyDollarCircleLine from "src/icons/MoneyDollarCircleLine";
import StackLine from "src/icons/StackLine";
import { formatMoneyAmount } from "src/utils/money";

type ViewMobileProps = {
  contributors: components["schemas"]["ContributorPageItemResponse"][];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isProjectLeader: boolean;
};

export function ViewMobile({
  contributors,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isProjectLeader,
}: ViewMobileProps) {
  return (
    <Card className="divide-y divide-greyscale-50/8 bg-whiteFakeOpacity-5" padded={false}>
      {contributors
        .sort((contributorA, contributorB) => contributorB.contributionCount - contributorA.contributionCount)
        .map(contributor => {
          const { contributionCount, contributionToRewardCount, rewardCount, login, earned } = contributor || {};
          const hasNothing = contributionToRewardCount === 0 && contributionCount === 0;

          return (
            <div className="flex items-center justify-between gap-1 p-3" key={login}>
              <Contributor contributor={contributor} clickable />
              {!hasNothing ? (
                <div className="flex items-center gap-3">
                  {contributionCount > 0 && contributionCount !== contributionToRewardCount ? (
                    <div className="flex items-center gap-1 text-sm">
                      <StackLine className="text-base font-medium text-spaceBlue-200" />
                      {contributionCount}
                    </div>
                  ) : null}
                  {rewardCount ? (
                    <>
                      <div className="flex items-center gap-1 text-sm">
                        <Medal2Fill className="text-base font-medium text-spaceBlue-200" />
                        {rewardCount}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <MoneyDollarCircleLine className="text-base font-medium text-spaceBlue-200" />
                        {`${earned?.totalAmount ? formatMoneyAmount({ amount: earned.totalAmount }) : "-"}`}
                      </div>
                    </>
                  ) : null}

                  {isProjectLeader && contributionToRewardCount ? (
                    <div className="flex items-center gap-1 rounded-full bg-spacePurple-900 px-1.5 py-0.5 text-sm font-medium text-spacePurple-400">
                      <StackLine className="text-base" />
                      {contributionToRewardCount}
                    </div>
                  ) : null}
                </div>
              ) : (
                "-"
              )}
            </div>
          );
        })}
      {hasNextPage && (
        <div className="py-6">
          <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} />
        </div>
      )}
    </Card>
  );
}
