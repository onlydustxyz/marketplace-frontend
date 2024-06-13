import { FilloutStandardEmbed } from "@fillout/react";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

export function FeedbackPanel() {
  const { user } = useCurrentUser();

  return (
    <FilloutStandardEmbed
      filloutId="uUS6ESXXcjus"
      inheritParameters
      parameters={{
        user_id: user?.id,
        first_name: user?.firstName || undefined,
        last_name: user?.lastName || undefined,
        email: user?.email || undefined,
        github_id: `${user?.githubUserId}` || undefined,
        github_login: user?.login || undefined,
      }}
    />
  );
}
