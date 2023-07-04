import Card from "src/components/Card";
import Contributor from "src/components/Contributor";
import { formatMoneyAmount } from "src/utils/money";
import { Contributor as ContributorType } from "./View";

export function ViewMobile({ contributors }: { contributors: ContributorType[] }) {
  return (
    <Card className="divide-y divide-greyscale-50/8" padded={false}>
      {contributors.map(contributor => (
        <div className="flex items-center justify-between gap-4 p-3" key={contributor.login}>
          <Contributor contributor={contributor} clickable />
          <div className="flex gap-3">
            <div>{`${contributor?.totalEarned ? formatMoneyAmount({ amount: contributor.totalEarned }) : "-"}`}</div>
            <div>{contributor.paidContributionsCount || "-"}</div>
          </div>
        </div>
      ))}
    </Card>
  );
}
