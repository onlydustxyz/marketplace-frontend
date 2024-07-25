import { UserStoragePort } from "core/domain/user/outputs/user-storage-port";
import { mockHttpStorageResponseWithParams } from "core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class UserClientAdapterMock implements UserStoragePort {
  constructor() {}

  routes = {};

  registerToHackathon = mockHttpStorageResponseWithParams<UserStoragePort["registerToHackathon"]>;

  setMyProfile = mockHttpStorageResponseWithParams<UserStoragePort["setMyProfile"]>;

  getMyProfile = mockHttpStorageResponseWithParams<UserStoragePort["getMyProfile"]>;
}
