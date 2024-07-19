import {
  GetMyProfilePortParams,
  GetMyProfilePortResponse,
  RegisterToHackathonPortParams,
  RegisterToHackathonPortResponse,
  SetMyProfilePortParams,
  SetMyProfilePortResponse,
} from "core/domain/user/user-contract.types";

export interface UserFacadePort {
  registerToHackathon(params: RegisterToHackathonPortParams): RegisterToHackathonPortResponse;
  setMyProfile(params: SetMyProfilePortParams): SetMyProfilePortResponse;
  getMyProfile(params: GetMyProfilePortParams): GetMyProfilePortResponse;
}
