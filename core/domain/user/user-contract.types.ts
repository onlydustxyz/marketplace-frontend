import { UserInterface } from "core/domain/user/models/user-model";
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

export type SetMyProfileBody = components["schemas"]["UserProfileRequest"] & {
  // MOCK
  goal?: "learn" | "challenge" | "earn" | "notoriety";
  categoriesIds?: string[];
};

export type SetMyProfileResponse = components["schemas"]["PrivateUserProfileResponse"];

export type SetMyProfilePortParams = HttpClientParameters<object>;

export type SetMyProfilePortResponse = HttpStorageResponse<UserProfileInterface, SetMyProfileBody>;

/* --------------------------------- Get my profile -------------------------------- */

export type GetMyProfileResponse = components["schemas"]["PrivateUserProfileResponse"];

export type GetMyProfilePortParams = HttpClientParameters<object>;

export type GetMyProfilePortResponse = HttpStorageResponse<UserProfileInterface>;

/* --------------------------------- Get my notification settings -------------------------------- */

export type GetMyNotificationSettingsResponse = components["schemas"]["NotificationSettingsForProjectResponse"];

export type GetMyNotificationSettingsPathParams =
  operations["getMyNotificationSettingsForProject"]["parameters"]["path"];

export type GetMyNotificationSettingsPortParams = HttpClientParameters<{
  PathParams: GetMyNotificationSettingsPathParams;
}>;

export type GetMyNotificationSettingsPortResponse = HttpStorageResponse<GetMyNotificationSettingsResponse>;

/* --------------------------------- Set my notification settings -------------------------------- */

export type SetMyNotificationSettingsBody = components["schemas"]["NotificationSettingsForProjectPatchRequest"];

export type SetMyNotificationSettingsPathParams =
  operations["getMyNotificationSettingsForProject"]["parameters"]["path"];

export type SetMyNotificationSettingsPortParams = HttpClientParameters<{
  PathParams: SetMyNotificationSettingsPathParams;
}>;

export type SetMyNotificationSettingsPortResponse = HttpStorageResponse<never, SetMyNotificationSettingsBody>;

/* --------------------------------- Get me -------------------------------- */

export type GetMeResponse = components["schemas"]["GetMeResponse"];

export type GetMeResponsePortParams = HttpClientParameters<object>;

export type GetMeResponsePortResponse = HttpStorageResponse<UserInterface>;

/* --------------------------------- Set me --------------------------------- */

export type SetMeBody = components["schemas"]["PatchMeContract"];

export type SetMePortParams = HttpClientParameters<object>;

export type SetMePortResponse = HttpStorageResponse<UserInterface, SetMeBody>;
