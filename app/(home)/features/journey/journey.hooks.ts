import { meApiClient } from "api-client/resources/me";

export function useJourney() {
  const { data, isLoading, isError } = meApiClient.queries.useGetMyJourney({});
  return {
    isLoading,
    isError,
    completed: data?.completed || false,
  };
}
