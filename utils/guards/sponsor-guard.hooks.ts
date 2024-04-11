import { useMemo } from "react";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

export function useSponsorGuard() {
  const { user, ...rest } = useCurrentUser();

  const sponsors = useMemo(() => user?.sponsors ?? [], [user]);
  const isAllowed = useMemo(() => Boolean(sponsors.length) ?? false, [sponsors]);

  return { isAllowed, sponsors, ...rest };
}
