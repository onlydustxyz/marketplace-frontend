import { UserStoragePort } from "core/domain/user/outputs/user-storage-port";
import { FirstParameter } from "core/helpers/types";
import { HttpClient } from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";

export class UserClientAdapter implements UserStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    registerToHackathon: "me/hackathons/:hackathonId/registrations",
  } as const;

  registerToHackathon = ({ pathParams }: FirstParameter<UserStoragePort["registerToHackathon"]>) => {
    const path = this.routes["registerToHackathon"];
    const method = "PUT";
    const tag = HttpClient.buildTag({ path, pathParams });
    const request = () =>
      this.client.request<never>({
        path,
        method,
        tag,
        pathParams,
      });

    return {
      request,
      tag,
    };
  };
}
