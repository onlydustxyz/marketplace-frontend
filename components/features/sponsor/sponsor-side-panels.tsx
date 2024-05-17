import { FilloutStandardEmbed } from "@fillout/react";
import { useState } from "react";

import { useStackSponsorProject } from "src/App/Stacks/Stacks";
import SidePanel from "src/components/SidePanel";

import { Button } from "components/ds/button/button";
import { Tooltip } from "components/ds/tooltip/tooltip";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

import { TSponsorSidePanels } from "./sponsor-side-panels.types";

export function SponsorSidePanels({
  buttonProps,
  panel,
  project,
  tooltipProps,
  initialSponsor,
}: TSponsorSidePanels.Props) {
  const { user } = useCurrentUser();
  const [isFilloutOpen, setIsFilloutOpen] = useState(false);
  const [openSponsorProjectStack] = useStackSponsorProject();

  function handleClick() {
    if (panel === "project") {
      openSponsorProjectStack({ project, initialSponsor });
      return;
    }

    if (panel === "fillout") {
      setIsFilloutOpen(true);
      return;
    }
  }

  return (
    <>
      {tooltipProps ? (
        <Tooltip {...tooltipProps}>
          <Button {...buttonProps} onClick={handleClick} />
        </Tooltip>
      ) : (
        <Button {...buttonProps} onClick={handleClick} />
      )}

      <SidePanel open={isFilloutOpen} setOpen={setIsFilloutOpen}>
        <FilloutStandardEmbed
          filloutId="1cTn46XDDVus"
          inheritParameters
          parameters={{
            project_id: project?.id ?? "",
            project_name: project?.name ?? "",
            user_id: user?.id,
            user_github: user?.login,
            user_email: user?.email,
          }}
        />
      </SidePanel>
    </>
  );
}
