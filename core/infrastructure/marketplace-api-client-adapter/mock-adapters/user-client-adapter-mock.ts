import { UserStoragePort } from "core/domain/user/outputs/user-storage-port";
import { FirstParameter } from "core/helpers/types";

export class UserClientAdapterMock implements UserStoragePort {
  // constructor(private readonly client: HttpClient) {}
  constructor() {}

  routes = {};

  registerToHackathon = (_: FirstParameter<UserStoragePort["registerToHackathon"]>) => {
    return {
      request: () => Promise.resolve({}),
      tag: "",
    } as ReturnType<UserStoragePort["registerToHackathon"]>;
  };

  setMyProfile = () => {
    return {
      request: () => Promise.resolve({}),
      tag: "",
    } as ReturnType<UserStoragePort["setMyProfile"]>;
  };

  getMyProfile = () => {
    return {
      request: () => Promise.resolve({}),
      tag: "",
    } as ReturnType<UserStoragePort["getMyProfile"]>;
  };
}
