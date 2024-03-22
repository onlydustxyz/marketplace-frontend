import { Image } from "@nextui-org/react";

import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function SponsorDepositCard() {
  // TODO mobile version ?
  return (
    <Card background={"base"}>
      <div className={"hidden justify-center gap-5 sm:grid"}>
        <div className={"grid justify-items-center gap-2"}>
          <Image src={"/images/payment-96.png"} alt={""} width={40} height={40} loading={"lazy"} disableSkeleton />
          <Typography variant={"body-l"} className={"text-spaceBlue-300"}>
            <Translate token="v2.pages.sponsor.deposit.newCurrency" />
          </Typography>
        </div>
        <Button variant={"secondary"} size={"s"}>
          <Translate token="v2.pages.sponsor.deposit.makeDeposit" />
        </Button>
      </div>
    </Card>
  );
}
