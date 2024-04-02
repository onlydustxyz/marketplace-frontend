import MeApi from "src/api/me";

import { TUseCurrentUser } from "./use-current-user.types";

export const useCurrentUser = (): TUseCurrentUser.Return => {
  const { data: user, ...rest } = MeApi.queries.useGetMe({});

  return {
    user,
    githubUserId: user?.githubUserId,
    ...rest,
  };
};
