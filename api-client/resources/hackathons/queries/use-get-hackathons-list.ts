"use client";

import { useQuery } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { ListHackathonsResponse } from "api-client/resources/hackathons/types";

import adapters from "../adapters";
import tags from "../tags";

export const useGetHackathonsList = () => {
  const fetcher = useReactQueryAdapter(adapters.root());
  return useQuery<ListHackathonsResponse>({
    queryKey: [tags.root],
    queryFn: () => fetcher.get(),
  });
};
