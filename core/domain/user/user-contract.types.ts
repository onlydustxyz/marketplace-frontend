import { BillingProfileShortInterface } from "core/domain/billing-profile/models/billing-profile-short-model";
import { UserInterface } from "core/domain/user/models/user-model";
import { UserOnboardingInterface } from "core/domain/user/models/user-onboarding-model";
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

/* --------------------------------- Replace my profile -------------------------------- */

export type ReplaceMyProfileBody = components["schemas"]["UserProfileUpdateRequest"];

export type ReplaceMyProfilePortParams = HttpClientParameters<object>;

export type ReplaceMyProfilePortResponse = HttpStorageResponse<never, ReplaceMyProfileBody>;

/* --------------------------------- Set my profile -------------------------------- */

export type SetMyProfileBody = components["schemas"]["UserProfileUpdateRequest"];

export type SetMyProfilePortParams = HttpClientParameters<object>;

export type SetMyProfilePortResponse = HttpStorageResponse<never, SetMyProfileBody>;

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

/* --------------------------------- Get my Onboarding -------------------------------- */

export type GetMyOnboardingResponse = components["schemas"]["OnboardingCompletionResponse"];

export type GetMyOnboardingResponsePortParams = HttpClientParameters<object>;

export type GetMyOnboardingResponsePortResponse = HttpStorageResponse<UserOnboardingInterface>;

/* --------------------------------- Get my billing profiles -------------------------------- */

export type GetMyBillingProfilesResponse = components["schemas"]["ShortBillingProfileResponse"];

export type GetMyBillingProfilesResponsePortParams = HttpClientParameters<object>;

export type GetMyBillingProfilesResponsePortResponse = HttpStorageResponse<BillingProfileShortInterface>;
