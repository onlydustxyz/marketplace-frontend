import { FilloutStandardEmbed } from "@fillout/react";
import { useState } from "react";

import SidePanel from "src/components/SidePanel";

import { Button } from "components/ds/button/button";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

import { TSponsorButton } from "./sponsor-button.types";

export function SponsorButton({ project }: TSponsorButton.Props) {
  const { user } = useCurrentUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button backgroundColor="blue" className="flex-1 md:flex-initial" size="s" onClick={() => setIsOpen(true)}>
        <Icon remixName="ri-service-line" />
        <Translate token="project.sponsorButton.full" />
      </Button>

      <SidePanel open={isOpen} setOpen={setIsOpen}>
        <FilloutStandardEmbed
          filloutId="1cTn46XDDVus"
          inheritParameters
          parameters={{
            project_id: project.id,
            project_name: project.name,
            user_id: user?.id,
            user_github: user?.login,
            user_email: user?.email,
          }}
        />
      </SidePanel>
    </>
  );
}
