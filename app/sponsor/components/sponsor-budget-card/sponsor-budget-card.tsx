import { Avatar } from "components/ds/avatar/avatar";
import { Card } from "components/ds/card/card";
import { Typography } from "components/layout/typography/typography";

export function SponsorBudgetCard() {
  return (
    <Card background={"base"}>
      <div className={"flex items-center justify-between sm:hidden"}>
        <div className={"flex items-baseline gap-1"}>
          <Typography variant={"body-l-bold"}>12,123</Typography>
          <Typography variant={"body-m"}>ETH</Typography>
        </div>
        <Avatar src={""} alt={""} size={"s"} />
      </div>

      <div className={"hidden justify-center gap-5 sm:grid"}>
        <div className={"grid justify-items-center gap-2"}>
          <Avatar src={""} alt={""} size={"l"} />
          <Typography variant={"body-l"}>Optimism</Typography>
        </div>
        <div className={"flex items-baseline gap-1"}>
          <Typography variant={"body-xl-bold"}>12,123</Typography>
          <Typography variant={"body-l-bold"}>ETH</Typography>
        </div>
      </div>
    </Card>
  );
}
