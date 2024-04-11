import { useMemo } from "react";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

export function useSponsorGuard() {
  const { user, ...rest } = useCurrentUser();

  const isAllowed = useMemo(() => Boolean(user?.sponsors?.length) ?? false, [user]);

  return { isAllowed, ...rest };
}
