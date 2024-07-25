import { UserProfileInterface } from "core/domain/user/models/user-profile-model";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

import { components, operations } from "src/__generated/api";

/* --------------------------------- Register to hackathon -------------------------------- */

export type RegisterToHackathonPathParams = operations["registerToHackathon"]["parameters"]["path"];

export type RegisterToHackathonPortParams = HttpClientParameters<{
  PathParams: RegisterToHackathonPathParams;
}>;

export type RegisterToHackathonPortResponse = HttpStorageResponse;

/* --------------------------------- Set my profile -------------------------------- */

export type SetMyProfileBody = components["schemas"]["UserProfileRequest"];

export type SetMyProfileResponse = components["schemas"]["PrivateUserProfileResponse"];

export type SetMyProfilePortParams = HttpClientParameters<object>;

export type SetMyProfilePortResponse = HttpStorageResponse<UserProfileInterface, SetMyProfileBody>;

/* --------------------------------- Get my profile -------------------------------- */

export type GetMyProfileResponse = components["schemas"]["PrivateUserProfileResponse"];

export type GetMyProfilePortParams = HttpClientParameters<object>;

export type GetMyProfilePortResponse = HttpStorageResponse<UserProfileInterface>;

/* --------------------------------- Get my notification settings -------------------------------- */

export type GetMyNotificationSettingsPathParams =
  operations["getMyNotificationSettingsForProject"]["parameters"]["path"];

export type GetMyNotificationSettingsPortParams = HttpClientParameters<{
  PathParams: GetMyNotificationSettingsPathParams;
}>;

export type GetMyNotificationSettingsPortResponse = HttpStorageResponse;

/* --------------------------------- Set my notification settings -------------------------------- */

export type SetMyNotificationSettingsBody = components["schemas"]["UserProfileRequest"];

export type SetMyNotificationSettingsResponse = components["schemas"]["PrivateUserProfileResponse"];

export type SetMyNotificationSettingsPathParams =
  operations["getMyNotificationSettingsForProject"]["parameters"]["path"];

export type SetMyNotificationSettingsPortParams = HttpClientParameters<{
  PathParams: GetMyNotificationSettingsPathParams;
}>;

export type SetMyNotificationSettingsPortResponse = HttpStorageResponse;
