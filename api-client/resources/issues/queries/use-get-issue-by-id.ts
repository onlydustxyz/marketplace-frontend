"use client";

import { useQuery } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { ParametersInterfaceWithReactQuery } from "api-client/types/parameters-interface";

import { getIssueById } from "../fetch";
import { GetIssueResponse } from "../types";

export const useGetIssueById = ({ options, ...fetch }: ParametersInterfaceWithReactQuery<typeof getIssueById>) => {
  const { query } = useReactQueryAdapter<GetIssueResponse>(getIssueById(fetch), {
    ...options,
  });

  return useQuery<GetIssueResponse>(query);
};
