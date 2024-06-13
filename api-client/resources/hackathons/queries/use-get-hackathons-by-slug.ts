"use client";

import { useQuery } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import { getHackathonBySlug } from "api-client/resources/hackathons/fetch";
import { GetHackathonDetailsReponse } from "api-client/resources/hackathons/types";

export const useGetHackathonBySlug = (slug: string) => {
  const { query } = useReactQueryAdapter<GetHackathonDetailsReponse>(getHackathonBySlug(slug));

  return useQuery<GetHackathonDetailsReponse>({
    ...query,
  });
};
