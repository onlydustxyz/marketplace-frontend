import MeApi from "src/api/me";

export const useCurrentUser = () => {
  const { data: userInfo, isLoading } = MeApi.queries.useGetMe({});

  return {
    user: userInfo,
    githubUserId: userInfo?.githubUserId,
    isLoading,
  };
};
