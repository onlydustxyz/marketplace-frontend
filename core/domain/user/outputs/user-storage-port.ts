import {
  GetMyProfilePortParams,
  GetMyProfilePortResponse,
  RegisterToHackathonPortParams,
  RegisterToHackathonPortResponse,
  SetMyProfilePortParams,
  SetMyProfilePortResponse,
} from "core/domain/user/user-contract.types";

export interface UserStoragePort {
  routes: Record<string, string>;
  registerToHackathon(params: RegisterToHackathonPortParams): RegisterToHackathonPortResponse;
  setMyProfile(params: SetMyProfilePortParams): SetMyProfilePortResponse;
  getMyProfile(params: GetMyProfilePortParams): GetMyProfilePortResponse;
}
