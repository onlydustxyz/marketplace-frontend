"use client";

import { useQuery } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";

import { getEcosystemByProjectSlug } from "../fetch";
import { GetEcosystemProjectPageResponse } from "../types";

export function useGetEcosystemByProjectSlug(params: Parameters<typeof getEcosystemByProjectSlug>[0]) {
  const { query } = useReactQueryAdapter<GetEcosystemProjectPageResponse>(getEcosystemByProjectSlug(params));

  return useQuery<GetEcosystemProjectPageResponse>({
    ...query,
    enabled: Boolean(params.ecosystemSlug),
  });
}
