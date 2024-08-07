import { UserStoragePort } from "core/domain/user/outputs/user-storage-port";
import {
  mockHttpStorageResponse,
  mockHttpStorageResponseWithParams,
} from "core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class UserClientAdapterMock implements UserStoragePort {
  constructor() {}

  routes = {};

  registerToHackathon = mockHttpStorageResponseWithParams<UserStoragePort["registerToHackathon"]>;

  replaceMyProfile = mockHttpStorageResponse<UserStoragePort["replaceMyProfile"]>;

  setMyProfile = mockHttpStorageResponse<UserStoragePort["setMyProfile"]>;

  getMyProfile = mockHttpStorageResponse<UserStoragePort["getMyProfile"]>;

  getMe = mockHttpStorageResponse<UserStoragePort["getMe"]>;

  getMyNotificationSettingsForProject = mockHttpStorageResponse<UserStoragePort["getMyNotificationSettingsForProject"]>;

  setMyNotificationSettingsForProject = mockHttpStorageResponse<UserStoragePort["setMyNotificationSettingsForProject"]>;

  getMyNotificationSettings = mockHttpStorageResponse<UserStoragePort["getMyNotificationSettings"]>;

  setMyNotificationSettings = mockHttpStorageResponse<UserStoragePort["setMyNotificationSettings"]>;

  setMe = mockHttpStorageResponse<UserStoragePort["setMe"]>;

  getMyOnboarding = mockHttpStorageResponse<UserStoragePort["getMyOnboarding"]>;

  getMyBillingProfiles = mockHttpStorageResponse<UserStoragePort["getMyBillingProfiles"]>;
}
