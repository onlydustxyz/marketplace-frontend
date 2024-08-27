import { useMemo } from "react";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

export function useProgramGuard() {
  const { user, ...rest } = useCurrentUser();

  const programs = useMemo(() => user?.programs ?? [], [user]);

  return { programs, ...rest };
}
