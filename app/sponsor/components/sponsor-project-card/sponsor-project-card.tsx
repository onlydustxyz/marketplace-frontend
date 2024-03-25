import { Money } from "utils/Money/Money";

import { Avatar } from "components/ds/avatar/avatar";
import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function SponsorProjectCard() {
  return (
    <Card background={"base"} className={"grid gap-6"}>
      <header className={"flex items-center justify-between overflow-hidden"}>
        <Avatar.Labelled
          avatarProps={{ src: "", alt: "", size: "m", shape: "square" }}
          labelProps={{ title: "" }}
          className={"flex-1"}
          truncate
        >
          <Typography variant={"body-xl-bold"} className={"truncate"}>
            Madara
          </Typography>
        </Avatar.Labelled>

        <Button variant={"secondary"} size={"s"} className={"hidden lg:flex"}>
          <Icon remixName={"ri-service-line"} />
          <Translate token={"v2.pages.sponsor.project.sponsorProject"} />
        </Button>
      </header>

      <Card className={"grid gap-2 !p-3"} hasPadding={false}>
        <Typography variant={"body-s-bold"} className={"uppercase text-spaceBlue-200"}>
          <Translate token={"v2.pages.sponsor.project.totalBudget"} />
        </Typography>

        <Avatar.Labelled avatarProps={{ src: "", alt: "", size: "s" }}>
          <Typography variant={"body-l-bold"}>
            {
              Money.format({
                amount: 123123,
                currency: Money.USD,
                options: { currencyClassName: "od-text-body-m" },
              }).html
            }
          </Typography>
        </Avatar.Labelled>
      </Card>

      <div className={"grid gap-2"}>
        <Typography variant={"body-s-bold"} className={"uppercase text-spaceBlue-200"}>
          <Translate token={"v2.pages.sponsor.project.perCurrency"} />
        </Typography>
        <ul className={"grid gap-2"}>
          <li className={"flex items-center justify-between"}>
            <Avatar.Labelled avatarProps={{ src: "", alt: "", size: "xs" }}>
              <Typography variant={"body-m"}>
                {
                  Money.format({
                    amount: 123123,
                    currency: Money.USD,
                    options: { currencyClassName: "od-text-body-s" },
                  }).html
                }
              </Typography>
            </Avatar.Labelled>

            <Typography variant={"body-s-bold"} className={"text-spaceBlue-200"}>
              {
                Money.format({
                  amount: 1234,
                  currency: Money.USD,
                  options: { prefixAmountWithTilde: true },
                }).string
              }
            </Typography>
          </li>
        </ul>
      </div>

      <Button variant={"secondary"} size={"s"} className={"w-full lg:hidden"}>
        <Icon remixName={"ri-service-line"} />
        <Translate token={"v2.pages.sponsor.project.sponsorProject"} />
      </Button>
    </Card>
  );
}
