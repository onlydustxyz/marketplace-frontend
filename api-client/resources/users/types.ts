import { components } from "src/__generated/api";

type PublicUserProfileResponse = components["schemas"]["PublicUserProfileResponseV2"];
type PublicUserLanguagesResponse = components["schemas"]["UserProfileLanguagePage"];
type PublicUserEcosystemsResponse = components["schemas"]["UserProfileEcosystemPage"];

export interface UserPublicProfileResponse extends PublicUserProfileResponse {}
export interface UserPublicLanguagesResponse extends PublicUserLanguagesResponse {}
export interface UserPublicEcosystemsResponse extends PublicUserEcosystemsResponse {}
