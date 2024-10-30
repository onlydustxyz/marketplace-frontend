import { useMemo } from "react";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

export function useEcosystemGuard() {
  const { user, ...rest } = useCurrentUser();

  const ecosystems = useMemo(() => user?.ecosystems ?? [], [user]);

  return { ecosystems, ...rest };
}
