import { Image } from "@nextui-org/react";

import { SponsorSidePanels } from "app/sponsor/[sponsorId]/components/sponsor-side-panels/sponsor-side-panels";

import { Card } from "components/ds/card/card";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function SponsorDepositCard() {
  return (
    <Card background={"base"}>
      <div className={"hidden justify-center gap-5 sm:grid"}>
        <div className={"grid justify-items-center gap-2"}>
          <Image src={"/images/payment-96.png"} alt={""} width={40} height={40} loading={"lazy"} disableSkeleton />
          <Typography variant={"body-l"} className={"text-spaceBlue-300"}>
            <Translate token="v2.pages.sponsor.deposit.newCurrency" />
          </Typography>
        </div>

        <SponsorSidePanels
          panel={"fillout"}
          buttonProps={{
            variant: "secondary",
            size: "s",
            children: <Translate token="v2.pages.sponsor.deposit.makeDeposit" />,
          }}
        />
      </div>
    </Card>
  );
}
