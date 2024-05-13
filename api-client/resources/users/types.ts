import { components } from "src/__generated/api";

type PublicUserLanguagesResponse = components["schemas"]["UserProfileLanguagePage"];
type PublicUserEcosystemsResponse = components["schemas"]["UserProfileEcosystemPage"];
type PublicUserStatsResponse = components["schemas"]["UserProfileStatsV2"];
type PublicUserProfileResponseV2 = components["schemas"]["PublicUserProfileResponseV2"];
export type PublicProfileChannelsUnion = components["schemas"]["ContactInformation"]["channel"];

export interface UserPublicProfileResponseV2 extends PublicUserProfileResponseV2 {}
export interface UserPublicLanguagesResponse extends PublicUserLanguagesResponse {}
export interface UserPublicEcosystemsResponse extends PublicUserEcosystemsResponse {}
export interface UserPublicStatsResponse extends PublicUserStatsResponse {}
