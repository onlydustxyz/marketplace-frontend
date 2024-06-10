"use client";

import { useQuery } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { PaginationInterface } from "api-client/config/pagination-interface";
import { getPublicActivity } from "api-client/resources/activity/fetch";
import { ActivityAllQueryParams, GetActivityPageResponse } from "api-client/resources/activity/types";
import { ReactQueryOptions } from "api-client/types/react-query-options";

export const useGetPublicActivity = ({
  queryParams,
  pagination,
  options,
}: {
  queryParams?: ActivityAllQueryParams;
  pagination?: PaginationInterface;
  options?: ReactQueryOptions;
}) => {
  const { query } = useReactQueryAdapter<GetActivityPageResponse>(getPublicActivity({ queryParams, pagination }));

  return useQuery<GetActivityPageResponse>({
    ...query,
    ...(options || {}),
  });
};
