import { useQuery } from "@tanstack/react-query";
import { FirstParameter, GenericFunction } from "core/helpers/types";
import { HttpStorageResponse } from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

type UseQueryOptions<Response> = FirstParameter<typeof useQuery<Response>>;

type UseQueryAdapterParams<Response> = HttpStorageResponse<Response> & {
  options?: Omit<UseQueryOptions<Response>, "queryKey" | "queryFn">;
};

export type UseQueryFacadeParams<Params extends GenericFunction, Response> = FirstParameter<Params> & {
  options?: Omit<UseQueryOptions<Response>, "queryKey" | "queryFn">;
};

export function useQueryAdapter<Response>({
  tag = "",
  request: queryFn,
  options,
}: UseQueryAdapterParams<Response>): UseQueryOptions<Response> {
  return {
    queryKey: [tag],
    queryFn,
    ...options,
  };
}
