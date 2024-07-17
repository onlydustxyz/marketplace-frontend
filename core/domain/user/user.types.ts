import { components, operations } from "src/__generated/api";

/* --------------------------------- Register to hackathon -------------------------------- */

export type RegisterToHackathonPathParams = operations["registerToHackathon"]["parameters"]["path"];

/* --------------------------------- Set my profile -------------------------------- */

export type SetMyProfileBody = components["schemas"]["UserProfileRequest"];
export type SetMyProfileResponse = components["schemas"]["PrivateUserProfileResponse"];
