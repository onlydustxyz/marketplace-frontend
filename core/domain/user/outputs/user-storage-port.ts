import {
  GetMeResponsePortParams,
  GetMeResponsePortResponse,
  GetMyNotificationSettingsPortParams,
  GetMyNotificationSettingsPortResponse,
  GetMyProfilePortParams,
  GetMyProfilePortResponse,
  RegisterToHackathonPortParams,
  RegisterToHackathonPortResponse,
  SetMyNotificationSettingsPortParams,
  SetMyNotificationSettingsPortResponse,
  SetMyProfilePortParams,
  SetMyProfilePortResponse,
} from "core/domain/user/user-contract.types";

export interface UserStoragePort {
  routes: Record<string, string>;
  registerToHackathon(params: RegisterToHackathonPortParams): RegisterToHackathonPortResponse;
  setMyProfile(params: SetMyProfilePortParams): SetMyProfilePortResponse;
  getMyProfile(params: GetMyProfilePortParams): GetMyProfilePortResponse;
  getMyNotificationSettings(params: GetMyNotificationSettingsPortParams): GetMyNotificationSettingsPortResponse;
  setMyNotificationSettings(params: SetMyNotificationSettingsPortParams): SetMyNotificationSettingsPortResponse;
  getMe(params: GetMeResponsePortParams): GetMeResponsePortResponse;
}
