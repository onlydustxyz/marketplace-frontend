import { FilloutStandardEmbed } from "@fillout/react";
import { useState } from "react";

import { TSponsorSidePanels } from "app/sponsor/components/sponsor-side-panels/sponsor-side-panels.types";

import { useStackSponsorProject } from "src/App/Stacks/Stacks";
import SidePanel from "src/components/SidePanel";

import { Button } from "components/ds/button/button";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

export function SponsorSidePanels({ buttonProps, panel, projectParams }: TSponsorSidePanels.Props) {
  const { user } = useCurrentUser();
  const [isFilloutOpen, setIsFilloutOpen] = useState(false);
  const [openSponsorProjectStack] = useStackSponsorProject();

  function handleClick() {
    if (panel === "project") {
      openSponsorProjectStack(projectParams);
      return;
    }

    if (panel === "fillout") {
      setIsFilloutOpen(true);
      return;
    }
  }

  return (
    <>
      <Button {...buttonProps} onClick={handleClick} />

      <SidePanel open={isFilloutOpen} setOpen={setIsFilloutOpen}>
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
