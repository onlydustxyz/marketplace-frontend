import { FilloutStandardEmbed } from "@fillout/react";
import { useState } from "react";

import { components } from "src/__generated/api";
import Button, { ButtonOnBackground, ButtonSize } from "src/components/Button";
import SidePanel from "src/components/SidePanel";
import { useIntl } from "src/hooks/useIntl";

import { Icon } from "components/layout/icon/icon";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

interface Props {
  project: components["schemas"]["ProjectResponse"];
}

export function SponsorProjectButton({ project }: Props) {
  const { T } = useIntl();
  const { user } = useCurrentUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onBackground={ButtonOnBackground.Blue}
        className="flex-1 md:flex-initial"
        size={ButtonSize.Sm}
        onClick={() => setIsOpen(true)}
      >
        <Icon remixName="ri-service-line" />
        {T("project.sponsorButton.full")}
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
