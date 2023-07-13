import Card from "src/components/Card";
import Contributor from "src/components/Contributor";
import { formatMoneyAmount } from "src/utils/money";
import { Contributor as ContributorType } from "./View";
import MoneyDollarCircleLine from "src/icons/MoneyDollarCircleLine";
import CheckLine from "src/icons/CheckLine";

export function ViewMobile({ contributors }: { contributors: ContributorType[] }) {
  return (
    <Card className="divide-y divide-greyscale-50/8 bg-whiteFakeOpacity-5" padded={false}>
      {contributors
        .sort((contributorA, contributorB) => contributorB.paidContributionsCount - contributorA.paidContributionsCount)
        .map(contributor => (
          <div className="flex items-center justify-between gap-4 p-3" key={contributor.login}>
            <Contributor contributor={contributor} clickable />
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-sm">
                <CheckLine className="text-base font-medium text-spaceBlue-200" />{" "}
                {contributor.paidContributionsCount || "-"}
              </div>
              <div className="flex items-center gap-1 text-sm">
                <MoneyDollarCircleLine className="text-base font-medium text-spaceBlue-200" />
                {`${contributor?.totalEarned ? formatMoneyAmount({ amount: contributor.totalEarned }) : "-"}`}
              </div>
            </div>
          </div>
        ))}
    </Card>
  );
}
