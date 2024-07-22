import { useQuery } from "@tanstack/react-query";
import { UseQueryFacadeParams, useQueryAdapter } from "core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "core/bootstrap";
import { GetHackathonByIdProjectIssuesFormattedResponse } from "core/domain/hackathon/hackathon-contract.types";
import { HackathonFacadePort } from "core/domain/hackathon/inputs/hackathon-facade-port";

export function useGetHackathonByIdProjectIssues({
  pathParams,
  queryParams,
  options,
}: UseQueryFacadeParams<
  HackathonFacadePort["getHackathonByIdProjectIssues"],
  GetHackathonByIdProjectIssuesFormattedResponse
>) {
  const hackathonStoragePort = bootstrap.getHackathonStoragePortForClient();

  return useQuery(
    useQueryAdapter({ ...hackathonStoragePort.getHackathonByIdProjectIssues({ pathParams, queryParams }), options })
  );
}
