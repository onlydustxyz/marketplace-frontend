import View from "src/App/Layout/Header/ProfileButton/View";
import { useOnboarding } from "src/App/OnboardingProvider";
import MeApi from "src/api/me";
import { viewportConfig } from "src/config";
import { useAuth } from "src/hooks/useAuth";
import { useMediaQuery } from "usehooks-ts";
import ViewMobile from "./ViewMobile";

const ProfileButton = () => {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  const { user, githubUserId } = useAuth();
  const { login } = user ?? { login: "My Account" };

  const { data: userInfo } = MeApi.queries.useGetMe({});

  const { onboardingInProgress } = useOnboarding();

  const payoutSettingsInvalid = userInfo?.hasValidPayoutInfos === false;

  const avatarUrl = userInfo?.avatarUrl || "";

  const props = {
    githubUserId,
    avatarUrl,
    login,
    isMissingPayoutSettingsInfo: payoutSettingsInvalid && !onboardingInProgress,
    hideProfileItems: onboardingInProgress,
  };

  return isXl ? <View {...props} /> : <ViewMobile {...props} />;
};

export default ProfileButton;
