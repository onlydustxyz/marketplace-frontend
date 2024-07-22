import { useQuery } from "@tanstack/react-query";
import { useQueryAdapter } from "core/application/react-query-adapter/helpers/use-query-adapter";
import { ReactQueryParameters } from "core/application/react-query-adapter/react-query-adapter.types";
import { bootstrap } from "core/bootstrap";
import { HackathonFacadePort } from "core/domain/hackathon/inputs/hackathon-facade-port";

export function useGetHackathonByIdProjectIssues({
  pathParams,
  queryParams,
  options,
}: ReactQueryParameters<HackathonFacadePort["getHackathonByIdProjectIssues"]>) {
  const hackathonStoragePort = bootstrap.getHackathonStoragePortForClient();

  return useQuery(
    useQueryAdapter({ ...hackathonStoragePort.getHackathonByIdProjectIssues({ pathParams, queryParams }), options })
  );
}
