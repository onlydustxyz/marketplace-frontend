import { Contributor } from "components/features/contributor/contributor";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { TInvitedBy } from "./invited-by.types";

export function InvitedBy({ invitation }: TInvitedBy.Props) {
  if (!invitation?.invitedBy) {
    return null;
  }

  return (
    <Flex alignItems="end" direction="col" className="gap-4">
      <Typography
        variant="body-s"
        translate={{
          token: "v2.pages.settings.billing.header.invitedBy",
        }}
        className="text-spaceBlue-200"
      />

      <Contributor
        login={invitation.invitedBy?.login}
        githubUserId={invitation.invitedBy?.githubUserId}
        isRegistered={invitation.invitedBy?.isRegistered}
        avatarUrl={invitation.invitedBy?.avatarUrl}
        clickable
      />
    </Flex>
  );
}
