import { components } from "src/__generated/api";

type PublicUserProfileResponseV2 = components["schemas"]["PublicUserProfileResponseV2"];
export type PublicProfileChannelsUnion = components["schemas"]["ContactInformation"]["channel"];

export interface UserPublicProfileResponseV2 extends PublicUserProfileResponseV2 {}
