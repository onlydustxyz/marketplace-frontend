import { components, operations } from "src/__generated/api";

import { Key } from "hooks/translate/use-translate";

type PublicUserLanguagesResponse = components["schemas"]["UserProfileLanguagePage"];
type PublicUserEcosystemsResponse = components["schemas"]["UserProfileEcosystemPage"];
type PublicUserStatsResponse = components["schemas"]["UserProfileStatsV2"];
type PublicUserProfileResponseV2 = components["schemas"]["PublicUserProfileResponseV2"];
type UserProfileContributions = components["schemas"]["ContributionPageResponse"];
type UserProfileContributionsParams = operations["getUserContributions"]["parameters"]["query"];

export type PublicProfileChannelsUnion = components["schemas"]["ContactInformation"]["channel"];
export type PublicProfilerankCategoryUnion = components["schemas"]["UserProfileStatsSummary"]["rankCategory"];
export interface UserPublicProfileResponseV2 extends PublicUserProfileResponseV2 {}
export interface UserPublicLanguagesResponse extends PublicUserLanguagesResponse {}
export interface UserPublicEcosystemsResponse extends PublicUserEcosystemsResponse {}
export interface UserPublicStatsResponse extends PublicUserStatsResponse {}
export interface UserContributionsResponse extends UserProfileContributions {}
export type UserContributionsRequestParams = UserProfileContributionsParams;

export const rankCategoryMapping: Record<PublicProfilerankCategoryUnion, Key> = {
  A: "v2.features.profileCard.rankCategories.a",
  B: "v2.features.profileCard.rankCategories.b",
  C: "v2.features.profileCard.rankCategories.c",
  D: "v2.features.profileCard.rankCategories.d",
  E: "v2.features.profileCard.rankCategories.e",
  F: "v2.features.profileCard.rankCategories.f",
};

export const rankCategoryEmojiMapping: Record<PublicProfilerankCategoryUnion, string> = {
  A: "💎",
  B: "🥇",
  C: "🥈",
  D: "🥉",
  E: "🔨",
  F: "🪵",
};
