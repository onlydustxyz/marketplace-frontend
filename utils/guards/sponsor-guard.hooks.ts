import { useMemo } from "react";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

export function useSponsorGuard() {
  const { user, ...rest } = useCurrentUser();

  const sponsors = useMemo(() => user?.sponsors ?? [], [user]);

  return { sponsors, ...rest };
}
