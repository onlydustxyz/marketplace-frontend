import MeApi from "src/api/me";

export const useCurrentUser = () => {
  const { data, isLoading } = MeApi.queries.useGetMe({});

  return {
    user: data,
    githubUserId: data?.githubUserId,
    isLoading,
  };
};
