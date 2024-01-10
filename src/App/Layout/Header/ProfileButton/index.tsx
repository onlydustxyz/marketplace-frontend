import View from "src/App/Layout/Header/ProfileButton/View";
import { useOnboarding } from "src/App/OnboardingProvider";
import MeApi from "src/api/me";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";
import ViewMobile from "./ViewMobile";

const ProfileButton = () => {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);

  const { data: userInfo } = MeApi.queries.useGetMe({});

  const { githubUserId, login = "", avatarUrl = "" } = userInfo || {};

  const { onboardingInProgress } = useOnboarding();

  const payoutSettingsInvalid = userInfo?.hasValidPayoutInfos === false;

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
