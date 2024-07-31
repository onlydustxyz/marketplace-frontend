import { useQuery } from "@tanstack/react-query";
import { UseQueryFacadeParams, useQueryAdapter } from "core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "core/bootstrap";
import { HackathonFacadePort } from "core/domain/hackathon/inputs/hackathon-facade-port";
import { HackathonListInterface } from "core/domain/hackathon/models/hackathon-list-model";

export function useGetHackathons({
  options,
}: UseQueryFacadeParams<HackathonFacadePort["getHackathons"], { hackathons: HackathonListInterface[] }>) {
  const hackathonStoragePort = bootstrap.getHackathonStoragePortForClient();

  return useQuery(useQueryAdapter({ ...hackathonStoragePort.getHackathons({}), options }));
}
