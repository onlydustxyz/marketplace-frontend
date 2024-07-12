import { useQuery } from "@tanstack/react-query";
import { useQueryAdapter } from "core/application/react-query-adapter/helpers/use-query-adapter";
import { ReactQueryParameters } from "core/application/react-query-adapter/react-query-adapter.types";
import { bootstrap } from "core/bootstrap";
import { HackathonFacadePort } from "core/domain/hackathon/inputs/hackathon-facade-port";

export function useGetHackathonBySlug({
  pathParams,
  options,
}: ReactQueryParameters<HackathonFacadePort["getHackathonBySlug"]>) {
  const hackathonStoragePort = bootstrap.getHackathonStoragePortForClient();

  return useQuery(useQueryAdapter({ ...hackathonStoragePort.getHackathonBySlug({ pathParams }), options }));
}
