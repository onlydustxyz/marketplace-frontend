import { useQuery } from "@tanstack/react-query";
import { useReactQueryAdapter } from "api-client/adapter/react-query/react-query-adapter";
import definitions from "api-client/resources/hackathons/definitions";
import { ListHackathonsResponse } from "api-client/resources/hackathons/types";

export const useGetHackathonsList = () => {
  const fetcher = useReactQueryAdapter(definitions.root());
  return useQuery<ListHackathonsResponse>({
    queryKey: ["posts"],
    queryFn: () => fetcher.get(),
  });
};
