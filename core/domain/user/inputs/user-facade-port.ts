import {
  GetMeResponsePortParams,
  GetMeResponsePortResponse,
  GetMyBillingProfilesResponsePortParams,
  GetMyBillingProfilesResponsePortResponse,
  GetMyNotificationSettingsPortParams,
  GetMyNotificationSettingsPortResponse,
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
  SetMyNotificationSettingsPortParams,
  SetMyNotificationSettingsPortResponse,
  SetMyProfilePortParams,
  SetMyProfilePortResponse,
} from "core/domain/user/user-contract.types";

export interface UserFacadePort {
  registerToHackathon(params: RegisterToHackathonPortParams): RegisterToHackathonPortResponse;
  replaceMyProfile(params: ReplaceMyProfilePortParams): ReplaceMyProfilePortResponse;
  setMyProfile(params: SetMyProfilePortParams): SetMyProfilePortResponse;
  getMyProfile(params: GetMyProfilePortParams): GetMyProfilePortResponse;
  getMyNotificationSettings(params: GetMyNotificationSettingsPortParams): GetMyNotificationSettingsPortResponse;
  setMyNotificationSettings(params: SetMyNotificationSettingsPortParams): SetMyNotificationSettingsPortResponse;
  getMe(params: GetMeResponsePortParams): GetMeResponsePortResponse;
  setMe(params: SetMePortParams): SetMePortResponse;
  getMyOnboarding(params: GetMyOnboardingResponsePortParams): GetMyOnboardingResponsePortResponse;
  getMyBillingProfiles(params: GetMyBillingProfilesResponsePortParams): GetMyBillingProfilesResponsePortResponse;
}
