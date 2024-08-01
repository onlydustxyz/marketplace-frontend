import { components } from "src/__generated/api";

type UserOnboardingResponse = components["schemas"]["OnboardingCompletionResponse"];

export interface UserOnboardingInterface extends UserOnboardingResponse {
  hasCompletedMandatoryOnboarding(): boolean;
  shouldGoToHome(isOnSignupPage: boolean): boolean;
  shouldGoToOnboarding(isOnOnboardingPage: boolean): boolean;
  shouldGoToOnboardingVerifyInformation(): boolean;
  shouldGoToOnboardingTermsAndConditions(): boolean;
}

export class UserOnboarding implements UserOnboardingInterface {
  completed!: UserOnboardingResponse["completed"];
  completion!: UserOnboardingResponse["completion"];
  payoutInformationProvided!: UserOnboardingResponse["payoutInformationProvided"];
  profileCompleted!: UserOnboardingResponse["profileCompleted"];
  projectPreferencesProvided!: UserOnboardingResponse["projectPreferencesProvided"];
  termsAndConditionsAccepted!: UserOnboardingResponse["termsAndConditionsAccepted"];
  verificationInformationProvided!: UserOnboardingResponse["verificationInformationProvided"];

  constructor(props: UserOnboardingResponse) {
    Object.assign(this, props);
  }

  hasCompletedMandatoryOnboarding() {
    return this.verificationInformationProvided && this.termsAndConditionsAccepted;
  }

  shouldGoToHome(isOnSignupPage: boolean) {
    return this.completed && isOnSignupPage;
  }

  shouldGoToOnboarding(isOnOnboardingPage: boolean) {
    return !this.completed && !isOnOnboardingPage;
  }

  shouldGoToOnboardingVerifyInformation() {
    return !this.verificationInformationProvided;
  }

  shouldGoToOnboardingTermsAndConditions() {
    return !this.termsAndConditionsAccepted;
  }
}
