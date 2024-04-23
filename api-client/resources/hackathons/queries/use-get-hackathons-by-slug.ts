"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { GetHackathonDetailsReponse } from "api-client/resources/hackathons/types";

import adapters from "../adapters";
import tags from "../tags";

export const useGetHackathonBySlug = (slug: string) => {
  const fetcher = adapters.by_slug();
  fetcher.setPathParams({ slug });
  useReactQueryAdapter(fetcher);
  const { isAuthenticated } = useAuth0();

  return useQuery<GetHackathonDetailsReponse>({
    queryKey: [tags.by_slug(slug)],
    queryFn: () => fetcher.request(),
    enabled: isAuthenticated,
  });
};
