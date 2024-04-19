import Image from "next/image";

import { SponsorSidePanels } from "app/sponsor/[sponsorId]/components/sponsor-side-panels/sponsor-side-panels";

import { IMAGES } from "src/assets/img";

import { Card } from "components/ds/card/card";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function SponsorDepositCard() {
  return (
    <Card background={"base"}>
      <div className={"flex items-center justify-between sm:hidden"}>
        <SponsorSidePanels
          panel={"fillout"}
          buttonProps={{
            variant: "secondary",
            size: "xs",
            children: <Translate token="v2.pages.sponsor.deposit.makeDeposit" />,
          }}
        />

        <Image src={IMAGES.global.payment} alt={""} width={28} height={28} loading={"lazy"} />
      </div>

      <div className={"hidden justify-center gap-5 sm:grid"}>
        <div className={"grid justify-items-center gap-2"}>
          <Image src={IMAGES.global.payment} alt={""} width={40} height={40} loading={"lazy"} />

          <Typography
            variant={"body-l"}
            className={"text-spaceBlue-300"}
            translate={{ token: "v2.pages.sponsor.deposit.newCurrency" }}
          />
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
