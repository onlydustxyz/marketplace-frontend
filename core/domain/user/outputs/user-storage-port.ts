import {
  GetMeResponsePortParams,
  GetMeResponsePortResponse,
  GetMyBillingProfilesResponsePortParams,
  GetMyBillingProfilesResponsePortResponse,
  GetMyNotificationSettingsForProjectPortParams,
  GetMyNotificationSettingsForProjectPortResponse,
  GetMyOnboardingResponsePortParams,
  GetMyOnboardingResponsePortResponse,
  GetMyProfilePortParams,
  GetMyProfilePortResponse,
  RegisterToHackathonPortParams,
  RegisterToHackathonPortResponse,
  ReplaceMyProfilePortParams,
  ReplaceMyProfilePortResponse,
  SetMePortParams,
  SetMePortResponse,
  SetMyNotificationSettingsForProjectPortParams,
  SetMyNotificationSettingsForProjectPortResponse,
  SetMyProfilePortParams,
  SetMyProfilePortResponse,
} from "core/domain/user/user-contract.types";

export interface UserStoragePort {
  routes: Record<string, string>;
  registerToHackathon(params: RegisterToHackathonPortParams): RegisterToHackathonPortResponse;
  replaceMyProfile(params: ReplaceMyProfilePortParams): ReplaceMyProfilePortResponse;
  setMyProfile(params: SetMyProfilePortParams): SetMyProfilePortResponse;
  getMyProfile(params: GetMyProfilePortParams): GetMyProfilePortResponse;
  getMyNotificationSettingsForProject(
    params: GetMyNotificationSettingsForProjectPortParams
  ): GetMyNotificationSettingsForProjectPortResponse;
  setMyNotificationSettingsForProject(
    params: SetMyNotificationSettingsForProjectPortParams
  ): SetMyNotificationSettingsForProjectPortResponse;
  getMe(params: GetMeResponsePortParams): GetMeResponsePortResponse;
  setMe(params: SetMePortParams): SetMePortResponse;
  getMyOnboarding(params: GetMyOnboardingResponsePortParams): GetMyOnboardingResponsePortResponse;
  getMyBillingProfiles(params: GetMyBillingProfilesResponsePortParams): GetMyBillingProfilesResponsePortResponse;
}
