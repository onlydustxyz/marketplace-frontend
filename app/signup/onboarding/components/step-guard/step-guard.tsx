import { UserReactQueryAdapter } from "core/application/react-query-adapter/user";
import { UserOnboardingInterface } from "core/domain/user/models/user-onboarding-model";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { NEXT_ROUTER } from "constants/router";

export function StepGuard({
  step,
}: {
  step: keyof Pick<
    UserOnboardingInterface,
    | "verificationInformationProvided"
    | "termsAndConditionsAccepted"
    | "payoutInformationProvided"
    | "projectPreferencesProvided"
    | "profileCompleted"
  >;
}) {
  const router = useRouter();
  const { data: userOnboarding } = UserReactQueryAdapter.client.useGetMyOnboarding({});

  useEffect(() => {
    if (userOnboarding?.[step]) {
      router.push(NEXT_ROUTER.signup.onboarding.root);
    }
  }, [userOnboarding, step]);

  return null;
}
