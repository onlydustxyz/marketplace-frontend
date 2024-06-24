"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useReactInfiniteQueryAdapter } from "api-client/adapter/react-infinite-query/react-infinite-query-adapter";
import { ParametersInterfaceWithReactQuery } from "api-client/types/parameters-interface";

import { getAllApplications } from "../fetch";
import { GetApplicationPageResponse } from "../types";

export const useInfiniteGetAllApplications = ({
  options,
  ...fetch
}: ParametersInterfaceWithReactQuery<typeof getAllApplications>) => {
  return useSuspenseInfiniteQuery<GetApplicationPageResponse>(
    useReactInfiniteQueryAdapter<GetApplicationPageResponse>(getAllApplications(fetch), options)
  );
};
