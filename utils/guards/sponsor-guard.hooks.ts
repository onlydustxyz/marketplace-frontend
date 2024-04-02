import { useMemo } from "react";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

export function useSponsorGuard() {
  const { user, ...rest } = useCurrentUser();

  const isAllowed = useMemo(
    () => process.env.NEXT_PUBLIC_ALLOWED_SPONSOR_USER_IDS?.split(",").includes(user?.id ?? "") ?? false,
    [user]
  );

  return { isAllowed, ...rest };
}
