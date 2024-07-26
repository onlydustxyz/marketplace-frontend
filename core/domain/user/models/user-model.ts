import { components } from "src/__generated/api";

type UserResponse = components["schemas"]["GetMeResponse"];

export interface UserInterface extends UserResponse {
  hasCompletedVerificationInformation: boolean;
  hasCompletedProjectRecommendations: boolean;
  hasCompletedProfile: boolean;
  hasCompletePayoutInformation: boolean;

  isProjectRecommendationCompleted(): boolean;
  isProfileCompleted(): boolean;
  isPayoutInformationCompleted(): boolean;
  isVerificationInformationCompleted(): boolean;
  isOnboardingWizardSeen(): boolean;
  isTermsAndConditionsAccepted(): boolean;
}

export class User implements UserInterface {
  avatarUrl!: UserResponse["avatarUrl"];
  createdAt!: UserResponse["createdAt"];
  email!: UserResponse["email"];
  firstName!: UserResponse["firstName"];
  githubUserId!: UserResponse["githubUserId"];
  hasAcceptedLatestTermsAndConditions!: UserResponse["hasAcceptedLatestTermsAndConditions"];
  hasSeenOnboardingWizard!: UserResponse["hasSeenOnboardingWizard"];
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

  // MOCK
  hasCompletedVerificationInformation = true;
  hasCompletedProjectRecommendations = false;
  hasCompletedProfile = false;
  hasCompletePayoutInformation = false;

  constructor(props: UserResponse) {
    Object.assign(this, props);
  }

  isProjectRecommendationCompleted() {
    return this.hasCompletedProjectRecommendations;
  }

  isProfileCompleted() {
    return this.hasCompletedProfile;
  }

  isPayoutInformationCompleted() {
    return this.hasCompletePayoutInformation;
  }

  isVerificationInformationCompleted() {
    return this.hasCompletedVerificationInformation;
  }

  isOnboardingWizardSeen() {
    return this.hasSeenOnboardingWizard;
  }

  isTermsAndConditionsAccepted() {
    return this.hasAcceptedLatestTermsAndConditions;
  }
}
