import { UserReactQueryAdapter } from "core/application/react-query-adapter/user";

export function useJourney() {
  const { data, isLoading, isError } = UserReactQueryAdapter.client.useGetMyOnboarding({});

  return {
    isLoading,
    isError,
    completed: data?.hasCompletedAllSteps() || false,
  };
}
