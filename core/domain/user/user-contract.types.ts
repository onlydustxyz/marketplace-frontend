import { BillingProfileShortInterface } from "core/domain/billing-profile/models/billing-profile-short-model";
import {
  UserHackathonRegistrationInterface,
  UserHackathonRegistrationResponse,
} from "core/domain/user/models/user-hackathon-registration-model";
import { UserInterface } from "core/domain/user/models/user-model";
import { UserNotificationSettings } from "core/domain/user/models/user-notification-settings-model";
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

/* --------------------------------- Get my notification settings for project -------------------------------- */

export type GetMyNotificationSettingsForProjectResponse =
  components["schemas"]["NotificationSettingsForProjectResponse"];

export type GetMyNotificationSettingsForProjectPathParams =
  operations["getMyNotificationSettingsForProject"]["parameters"]["path"];

export type GetMyNotificationSettingsForProjectPortParams = HttpClientParameters<{
  PathParams: GetMyNotificationSettingsForProjectPathParams;
}>;

export type GetMyNotificationSettingsForProjectPortResponse =
  HttpStorageResponse<GetMyNotificationSettingsForProjectResponse>;

/* --------------------------------- Set my notification settings for project -------------------------------- */

export type SetMyNotificationSettingsForProjectBody =
  components["schemas"]["NotificationSettingsForProjectPatchRequest"];

export type SetMyNotificationSettingsForProjectPathParams =
  operations["getMyNotificationSettingsForProject"]["parameters"]["path"];

export type SetMyNotificationSettingsForProjectPortParams = HttpClientParameters<{
  PathParams: SetMyNotificationSettingsForProjectPathParams;
}>;

export type SetMyNotificationSettingsForProjectPortResponse = HttpStorageResponse<
  never,
  SetMyNotificationSettingsForProjectBody
>;

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

/* --------------------------------- Get my notification settings -------------------------------- */

export type GetMyNotificationSettingsResponse = components["schemas"]["NotificationSettingsResponse"];

export type GetMyNotificationSettingsResponsePortParams = HttpClientParameters<object>;

export type GetMyNotificationSettingsResponsePortResponse = HttpStorageResponse<UserNotificationSettings>;

/* --------------------------------- Set my notification settings -------------------------------- */

export type SetMyNotificationSettingsBody = components["schemas"]["NotificationSettingsPutRequest"];

export type SetMyNotificationSettingsPortParams = HttpClientParameters<object>;

export type SetMyNotificationSettingsPortResponse = HttpStorageResponse<never, SetMyNotificationSettingsBody>;

/* --------------------------------- Get my hackathon registration -------------------------------- */

export type GetMyHackathonRegistrationResponse = UserHackathonRegistrationResponse;
export type GetMyHackathonRegistrationModel = UserHackathonRegistrationInterface;

export type GetMyHackathonRegistrationPathParams = operations["getHackathonRegistration"]["parameters"]["path"];

export type GetMyHackathonRegistrationPortParams = HttpClientParameters<{
  PathParams: GetMyHackathonRegistrationPathParams;
}>;

export type GetMyHackathonRegistrationPortResponse = HttpStorageResponse<GetMyHackathonRegistrationModel>;
