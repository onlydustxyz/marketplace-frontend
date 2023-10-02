import Card from "src/components/Card";
import Contributor from "src/components/Contributor";
import { formatMoneyAmount } from "src/utils/money";
import { Contributor as ContributorType } from "./View";
import MoneyDollarCircleLine from "src/icons/MoneyDollarCircleLine";
import Medal2Fill from "src/icons/Medal2Fill";
import StackLine from "src/icons/StackLine";

type ViewMobileProps = {
  contributors: ContributorType[];
  isProjectLeader: boolean;
};

export function ViewMobile({ contributors, isProjectLeader }: ViewMobileProps) {
  return (
    <Card className="divide-y divide-greyscale-50/8 bg-whiteFakeOpacity-5" padded={false}>
      {contributors
        .sort((contributorA, contributorB) => contributorB.contributionCount - contributorA.contributionCount)
        .map(contributor => {
          const { contributionCount, toRewardCount, rewardCount, login, totalEarned } = contributor || {};
          const hasNothing = toRewardCount === 0 && contributionCount === 0;

          return (
            <div className="flex items-center justify-between gap-1 p-3" key={login}>
              <Contributor contributor={contributor} clickable />
              {!hasNothing ? (
                <div className="flex items-center gap-3">
                  {contributionCount > 0 && contributionCount !== toRewardCount ? (
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
                        {`${totalEarned ? formatMoneyAmount({ amount: totalEarned }) : "-"}`}
                      </div>
                    </>
                  ) : null}

                  {isProjectLeader && toRewardCount ? (
                    <div className="flex items-center gap-1 rounded-full bg-spacePurple-900 px-1.5 py-0.5 text-sm font-medium text-spacePurple-400">
                      <StackLine className="text-base" />
                      {toRewardCount}
                    </div>
                  ) : null}
                </div>
              ) : (
                "-"
              )}
            </div>
          );
        })}
    </Card>
  );
}
