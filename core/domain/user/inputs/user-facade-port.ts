import {
  GetMeResponsePortParams,
  GetMeResponsePortResponse,
  GetMyNotificationSettingsPortParams,
  GetMyNotificationSettingsPortResponse,
  GetMyProfilePortParams,
  GetMyProfilePortResponse,
  RegisterToHackathonPortParams,
  RegisterToHackathonPortResponse,
  SetMePortParams,
  SetMePortResponse,
  SetMyNotificationSettingsPortParams,
  SetMyNotificationSettingsPortResponse,
  SetMyProfilePortParams,
  SetMyProfilePortResponse,
} from "core/domain/user/user-contract.types";

export interface UserFacadePort {
  registerToHackathon(params: RegisterToHackathonPortParams): RegisterToHackathonPortResponse;
  setMyProfile(params: SetMyProfilePortParams): SetMyProfilePortResponse;
  getMyProfile(params: GetMyProfilePortParams): GetMyProfilePortResponse;
  getMyNotificationSettings(params: GetMyNotificationSettingsPortParams): GetMyNotificationSettingsPortResponse;
  setMyNotificationSettings(params: SetMyNotificationSettingsPortParams): SetMyNotificationSettingsPortResponse;
  getMe(params: GetMeResponsePortParams): GetMeResponsePortResponse;
  setMe(params: SetMePortParams): SetMePortResponse;
}
