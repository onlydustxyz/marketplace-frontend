import Card from "src/components/Card";
import Contributor from "src/components/Contributor";
import { formatMoneyAmount } from "src/utils/money";
import { Contributor as ContributorType } from "./View";
import MoneyDollarCircleLine from "src/icons/MoneyDollarCircleLine";
import Medal2Fill from "src/icons/Medal2Fill";
import StackLine from "src/icons/StackLine";

export function ViewMobile({ contributors }: { contributors: ContributorType[] }) {
  return (
    <Card className="divide-y divide-greyscale-50/8 bg-whiteFakeOpacity-5" padded={false}>
      {contributors
        .sort((contributorA, contributorB) => contributorB.contributionCount - contributorA.contributionCount)
        .map(contributor => (
          <div className="flex items-center justify-between gap-1 p-3" key={contributor.login}>
            <Contributor contributor={contributor} clickable />
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-sm">
                <StackLine className="text-base font-medium text-spaceBlue-200" />
                {contributor.contributionCount || "-"}
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Medal2Fill className="text-base font-medium text-spaceBlue-200" />
                {contributor.rewardCount || "-"}
              </div>
              <div className="flex items-center gap-1 text-sm">
                <MoneyDollarCircleLine className="text-base font-medium text-spaceBlue-200" />
                {`${contributor?.totalEarned ? formatMoneyAmount({ amount: contributor.totalEarned }) : "-"}`}
              </div>
              <div className="flex items-center gap-1 rounded-full bg-spacePurple-900 px-1.5 py-0.5 text-sm font-medium text-spacePurple-400">
                <StackLine className="text-base" />
                {contributor.toRewardCount}
              </div>
            </div>
          </div>
        ))}
    </Card>
  );
}
