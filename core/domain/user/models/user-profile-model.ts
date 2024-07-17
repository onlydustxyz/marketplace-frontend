import { mapApiToClass } from "core/infrastructure/marketplace-api-client-adapter/mappers/map-api-to-class";

import { components } from "src/__generated/api";

type UserProfileResponse = components["schemas"]["PrivateUserProfileResponse"];

interface UserInterface extends UserProfileResponse {}

class UserProfile extends mapApiToClass<UserProfileResponse>() implements UserInterface {
  constructor(readonly props: UserProfileResponse) {
    super(props);
  }
}

export { UserProfile };
