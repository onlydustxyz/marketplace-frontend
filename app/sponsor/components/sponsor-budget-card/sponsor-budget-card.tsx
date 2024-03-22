import { Money } from "utils/Money/Money";

import { Avatar } from "components/ds/avatar/avatar";
import { Card } from "components/ds/card/card";
import { Typography } from "components/layout/typography/typography";

export function SponsorBudgetCard() {
  return (
    <Card background={"base"}>
      <div className={"flex items-center justify-between sm:hidden"}>
        <Typography variant={"body-l-bold"}>
          {
            Money.format({
              amount: 123123,
              currency: Money.USD,
              options: { currencyClassName: "od-text-body-m" },
            }).html
          }
        </Typography>

        <Avatar src={""} alt={""} size={"s"} />
      </div>

      <div className={"hidden justify-center gap-5 sm:grid"}>
        <div className={"grid justify-items-center gap-2"}>
          <Avatar src={""} alt={""} size={"l"} />
          <Typography variant={"body-l"}>Optimism</Typography>
        </div>

        <Typography variant={"body-xl-bold"}>
          {
            Money.format({
              amount: 123123,
              currency: Money.USD,
              options: { currencyClassName: "od-text-body-l-bold" },
            }).html
          }
        </Typography>
      </div>
    </Card>
  );
}
