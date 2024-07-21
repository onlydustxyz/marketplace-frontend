import type { DefaultError } from "@tanstack/query-core";
import { useMutation } from "@tanstack/react-query";
import { FirstParameter, GenericFunction } from "core/helpers/types";
import {
  HttpClientParameters,
  HttpStorageBody,
  HttpStorageResponse,
} from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

type UseMutationOptions<Response, Body> = FirstParameter<typeof useMutation<Response, DefaultError, Body>>;

type UseMutationAdapterParams<Response, Body extends HttpStorageBody> = HttpStorageResponse<Response, Body> & {
  options?: Omit<UseMutationOptions<Response, Body>, "mutationKey" | "mutationFn">;
};

export type UseMutationFacadeParams<
  Params extends GenericFunction,
  Invalidate extends Record<string, HttpClientParameters<object>> | undefined = undefined,
  Response = never,
  Body extends HttpStorageBody = object
> = FirstParameter<Params> & {
  options?: Omit<UseMutationOptions<Response, Body>, "mutationFn">;
  invalidateTagParams?: Invalidate;
};

export function useMutationAdapter<Response, Body extends HttpStorageBody>({
  tag = "",
  request: mutationFn,
  options,
}: UseMutationAdapterParams<Response, Body>): UseMutationOptions<Response, Body> {
  return {
    mutationKey: [tag],
    mutationFn,
    ...options,
  };
}
