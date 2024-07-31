import { meApiClient } from "api-client/resources/me";

export function useJourney() {
  const { data, isLoading, isError } = meApiClient.queries.useGetMyOnboarding({});
  return {
    isLoading,
    isError,
    completed: data?.completed || false,
  };
}
