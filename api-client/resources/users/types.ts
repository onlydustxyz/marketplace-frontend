import { components } from "src/__generated/api";

type PublicUserProfileResponse = components["schemas"]["PublicUserProfileResponse"];
type PublicUserProfileResponseV2 = components["schemas"]["PublicUserProfileResponseV2"];

export interface UserPublicProfileResponse extends PublicUserProfileResponse {}
export interface UserPublicProfileResponseV2 extends PublicUserProfileResponseV2 {}
