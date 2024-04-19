import LegacyOnboarding from "src/_pages/Onboarding/index";

import { withClientOnly } from "components/layout/client-only/client-only";

function OnboardingPage() {
  return <LegacyOnboarding />;
}

export default withClientOnly(OnboardingPage);
