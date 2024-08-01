import { BillingProfileShort } from "core/domain/billing-profile/models/billing-profile-short-model";
import { User } from "core/domain/user/models/user-model";
import { UserNotifications } from "core/domain/user/models/user-notifications-model";
import { UserOnboarding } from "core/domain/user/models/user-onboarding-model";
import { UserProfile } from "core/domain/user/models/user-profile-model";
import { UserStoragePort } from "core/domain/user/outputs/user-storage-port";
import {
  GetMeResponse,
  GetMyBillingProfilesResponse,
  GetMyNotificationSettingsResponse,
  GetMyOnboardingResponse,
  GetMyProfileResponse,
  SetMeBody,
  SetMyNotificationSettingsBody,
  SetMyProfileBody,
  SetMyProfileResponse,
} from "core/domain/user/user-contract.types";
import { FirstParameter } from "core/helpers/types";
import { HttpClient } from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";

export class UserClientAdapter implements UserStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    registerToHackathon: "me/hackathons/:hackathonId/registrations",
    setMyProfile: "me/profile",
    getMyProfile: "me/profile",
    setMyNotificationSettings: "me/notification-settings/projects/:projectId",
    getMyNotificationSettings: "me/notification-settings/projects/:projectId",
    getMe: "me",
    setMe: "me",
    getMyOnboarding: "me/onboarding",
    getMyBillingProfiles: "me/billing-profiles",
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
    const method = "PATCH";
    const tag = HttpClient.buildTag({ path });

    const request = async (body: SetMyProfileBody) => {
      const data = await this.client.request<SetMyProfileResponse>({
        path,
        method,
        tag,
        body: JSON.stringify(body),
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

  setMyNotificationSettings = ({ pathParams }: FirstParameter<UserStoragePort["setMyNotificationSettings"]>) => {
    const path = this.routes["setMyNotificationSettings"];
    const method = "PATCH";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: SetMyNotificationSettingsBody) =>
      this.client.request<never>({
        path,
        method,
        tag,
        body: JSON.stringify(body),
        pathParams,
      });

    return {
      request,
      tag,
    };
  };

  getMyNotificationSettings = ({ pathParams }: FirstParameter<UserStoragePort["getMyNotificationSettings"]>) => {
    const path = this.routes["getMyNotificationSettings"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async () => {
      const data = await this.client.request<GetMyNotificationSettingsResponse>({
        path,
        method,
        tag,
        pathParams,
      });

      return new UserNotifications(data);
    };

    return {
      request,
      tag,
    };
  };

  getMe = () => {
    const path = this.routes["getMe"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path });

    const request = async () => {
      const data = await this.client.request<GetMeResponse>({
        path,
        method,
        tag,
      });

      return new User(data);
    };

    return {
      request,
      tag,
    };
  };

  setMe = () => {
    const path = this.routes["setMe"];
    const method = "PATCH";
    const tag = HttpClient.buildTag({ path });

    const request = async (body: SetMeBody) =>
      this.client.request<never>({
        path,
        method,
        tag,
        body: JSON.stringify(body),
      });

    return {
      request,
      tag,
    };
  };

  getMyOnboarding = () => {
    const path = this.routes["getMyOnboarding"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path });

    const request = async () => {
      const data = await this.client.request<GetMyOnboardingResponse>({
        path,
        method,
        tag,
      });

      return new UserOnboarding(data);
    };

    return {
      request,
      tag,
    };
  };

  getMyBillingProfiles = () => {
    const path = this.routes["getMyBillingProfiles"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path });

    const request = async () => {
      const data = await this.client.request<GetMyBillingProfilesResponse>({
        path,
        method,
        tag,
      });

      return new BillingProfileShort(data);
    };

    return {
      request,
      tag,
    };
  };
}
