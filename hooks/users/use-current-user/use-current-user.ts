import MeApi from "src/api/me";

import { TUseCurrentUser } from "./use-current-user.types";

export const useCurrentUser = (): TUseCurrentUser.Return => {
  const { data, isLoading } = MeApi.queries.useGetMe({});

  return {
    user: data,
    githubUserId: data?.githubUserId,
    isLoading,
  };
};
