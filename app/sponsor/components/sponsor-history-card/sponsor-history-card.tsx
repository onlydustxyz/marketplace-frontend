import { Money } from "utils/Money/Money";

import { SponsorHistoryTransaction } from "app/sponsor/components/sponsor-history-transaction/sponsor-history-transaction";

import { Avatar } from "components/ds/avatar/avatar";
import { Card } from "components/ds/card/card";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function SponsorHistoryCard() {
  return (
    <Card background={"base"} className={"grid grid-cols-2 gap-x-3 gap-y-4"}>
      <div className={"grid gap-2"}>
        <Typography variant={"body-s"} className={"uppercase text-spaceBlue-200"}>
          <Translate token="v2.pages.sponsor.history.date" />
        </Typography>
        <Typography variant={"body-s"}>February 12, 2022</Typography>
      </div>

      <div className={"grid gap-2"}>
        <Typography variant={"body-s"} className={"uppercase text-spaceBlue-200"}>
          <Translate token="v2.pages.sponsor.history.transaction" />
        </Typography>
        <Typography variant={"body-s"}>
          <SponsorHistoryTransaction type={"deposit"} />
        </Typography>
      </div>

      <div className={"grid gap-2"}>
        <Typography variant={"body-s"} className={"uppercase text-spaceBlue-200"}>
          <Translate token="v2.pages.sponsor.history.amount" />
        </Typography>
        <Avatar.Labelled avatarProps={{ src: "", alt: "", size: "xs" }}>
          <Typography variant={"body-s"}>
            {
              Money.format({
                amount: 123123,
                currency: Money.USD,
              }).string
            }
          </Typography>
        </Avatar.Labelled>
      </div>

      <div className={"grid gap-2"}>
        <Typography variant={"body-s"} className={"uppercase text-spaceBlue-200"}>
          <Translate token="v2.pages.sponsor.history.project" />
        </Typography>
        <Avatar.Labelled
          avatarProps={{ src: "", alt: "", size: "s", shape: "square", className: "flex-shrink-0" }}
          labelProps={{ title: "", className: "truncate" }}
          className={"overflow-hidden"}
        >
          <Typography variant={"body-s"} className={"truncate"}>
            Madara
          </Typography>
        </Avatar.Labelled>
      </div>
    </Card>
  );
}
