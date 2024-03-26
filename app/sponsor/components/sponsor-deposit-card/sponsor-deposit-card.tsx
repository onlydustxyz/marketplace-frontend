import { FilloutStandardEmbed } from "@fillout/react";
import { Image } from "@nextui-org/react";
import { useState } from "react";

import SidePanel from "src/components/SidePanel";

import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

export function SponsorDepositCard() {
  const { user } = useCurrentUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card background={"base"}>
        <div className={"hidden justify-center gap-5 sm:grid"}>
          <div className={"grid justify-items-center gap-2"}>
            <Image src={"/images/payment-96.png"} alt={""} width={40} height={40} loading={"lazy"} disableSkeleton />
            <Typography variant={"body-l"} className={"text-spaceBlue-300"}>
              <Translate token="v2.pages.sponsor.deposit.newCurrency" />
            </Typography>
          </div>
          <Button variant={"secondary"} size={"s"} onClick={() => setIsOpen(true)}>
            <Translate token="v2.pages.sponsor.deposit.makeDeposit" />
          </Button>
        </div>
      </Card>

      <SidePanel open={isOpen} setOpen={setIsOpen}>
        <FilloutStandardEmbed
          filloutId="1cTn46XDDVus"
          inheritParameters
          // TODO @hayden check params
          parameters={{
            // project_id: project.id,
            // project_name: project.name,
            user_id: user?.id,
            user_github: user?.login,
            user_email: user?.email,
          }}
        />
      </SidePanel>
    </>
  );
}
