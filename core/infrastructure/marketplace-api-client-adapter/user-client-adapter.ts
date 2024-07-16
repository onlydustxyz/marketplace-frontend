import { UserProfile } from "core/domain/user/models/user-profile-model";
import { UserStoragePort } from "core/domain/user/outputs/user-storage-port";
import { GetMyProfileResponse, SetMyProfileResponse } from "core/domain/user/user.types";
import { FirstParameter } from "core/helpers/types";
import { HttpClient } from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";

export class UserClientAdapter implements UserStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    registerToHackathon: "me/hackathons/:hackathonId/registrations",
    setMyProfile: "me/profile",
    getMyProfile: "me/profile",
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

  setMyProfile = () => {
    const path = this.routes["setMyProfile"];
    const method = "PUT";
    const tag = HttpClient.buildTag({ path });

    const request = async () => {
      const data = await this.client.request<SetMyProfileResponse>({
        path,
        method,
        tag,
      });

      return new UserProfile(data);
    };

    return {
      request,
      tag,
    };
  };

  getMyProfile = () => {
    const path = this.routes["getMyProfile"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path });

    const request = async () => {
      const data = await this.client.request<GetMyProfileResponse>({
        path,
        method,
        tag,
      });

      return new UserProfile(data);
    };

    return {
      request,
      tag,
    };
  };
}
