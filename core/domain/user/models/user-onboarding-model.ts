import { components } from "src/__generated/api";

type UserOnboardingResponse = components["schemas"]["OnboardingCompletionResponse"];

export interface UserOnboardingInterface extends UserOnboardingResponse {}

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
}
