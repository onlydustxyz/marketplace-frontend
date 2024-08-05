import { UserPublicProfileResponseV2 } from "api-client/resources/users/types";

export namespace TProfileOverview {
  export interface Props {
    userProfile: UserPublicProfileResponseV2;
  }
}
