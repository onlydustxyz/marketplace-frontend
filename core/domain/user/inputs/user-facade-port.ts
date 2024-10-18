import {
  GetMeResponsePortParams,
  GetMeResponsePortResponse,
  GetMyBillingProfilesResponsePortParams,
  GetMyBillingProfilesResponsePortResponse,
  GetMyHackathonRegistrationPortParams,
  GetMyHackathonRegistrationPortResponse,
  GetMyNotificationSettingsForProjectPortParams,
  GetMyNotificationSettingsForProjectPortResponse,
  GetMyNotificationSettingsResponsePortParams,
  GetMyNotificationSettingsResponsePortResponse,
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
  getMyNotificationSettings(
    params: GetMyNotificationSettingsResponsePortParams
  ): GetMyNotificationSettingsResponsePortResponse;
  setMyNotificationSettings(params: SetMyNotificationSettingsPortParams): SetMyNotificationSettingsPortResponse;
  getMyHackathonRegistration(params: GetMyHackathonRegistrationPortParams): GetMyHackathonRegistrationPortResponse;
}
