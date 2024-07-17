import { useQuery } from "@tanstack/react-query";
import { useQueryAdapter } from "core/application/react-query-adapter/helpers/use-query-adapter";
import { ReactQueryParameters } from "core/application/react-query-adapter/react-query-adapter.types";
import { bootstrap } from "core/bootstrap";
import { UserFacadePort } from "core/domain/user/inputs/user-facade-port";

export function useGetMyProfile({ options }: ReactQueryParameters<UserFacadePort["getMyProfile"]>) {
  const userStoragePort = bootstrap.getUserStoragePortForClient();

  return useQuery(useQueryAdapter({ ...userStoragePort.getMyProfile({}), options }));
}
