import { useQuery } from "@tanstack/react-query";
import { UseQueryFacadeParams, useQueryAdapter } from "core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "core/bootstrap";
import { useClientBootstrapContext } from "core/bootstrap/client-bootstrap-context";
import { UserFacadePort } from "core/domain/user/inputs/user-facade-port";
import { UserInterface } from "core/domain/user/models/user-model";

export function useGetMe({ options }: UseQueryFacadeParams<UserFacadePort["getMe"], UserInterface>) {
  const userStoragePort = bootstrap.getUserStoragePortForClient();

  const {
    clientBootstrap: { authProvider },
  } = useClientBootstrapContext();
  const { isAuthenticated = false } = authProvider ?? {};

  return useQuery(
    useQueryAdapter({
      ...userStoragePort.getMe({}),
      options: {
        ...options,
        enabled: isAuthenticated && options?.enabled,
      },
    })
  );
}
