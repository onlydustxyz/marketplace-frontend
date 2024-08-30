import { components } from "src/__generated/api";

type UserResponse = components["schemas"]["GetMeResponse"];

export interface UserInterface extends UserResponse {}

export class User implements UserInterface {
  avatarUrl!: UserResponse["avatarUrl"];
  createdAt!: UserResponse["createdAt"];
  email!: UserResponse["email"];
  firstName!: UserResponse["firstName"];
  githubUserId!: UserResponse["githubUserId"];
  hasAcceptedLatestTermsAndConditions!: UserResponse["hasAcceptedLatestTermsAndConditions"];
  hasCompletedOnboarding!: UserResponse["hasCompletedOnboarding"];
  hasCompletedVerificationInformation!: UserResponse["hasCompletedVerificationInformation"];
  id!: UserResponse["id"];
  isAdmin!: UserResponse["isAdmin"];
  isAuthorizedToApplyOnGithubIssues!: UserResponse["isAuthorizedToApplyOnGithubIssues"];
  lastName!: UserResponse["lastName"];
  login!: UserResponse["login"];
  missingPayoutPreference!: UserResponse["missingPayoutPreference"];
  pendingApplications!: UserResponse["pendingApplications"];
  pendingProjectsLed!: UserResponse["pendingProjectsLed"];
  projectsLed!: UserResponse["projectsLed"];
  sponsors!: UserResponse["sponsors"];
  programs!: UserResponse["programs"];

  constructor(props: UserResponse) {
    Object.assign(this, props);
  }
}
