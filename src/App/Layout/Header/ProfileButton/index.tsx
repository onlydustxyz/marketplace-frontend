import { useMediaQuery } from "usehooks-ts";

import { useOnboarding } from "src/App/OnboardingProvider";
import MeApi from "src/api/me";
import { viewportConfig } from "src/config";

import { useMenu } from "hooks/menu/use-menu/use-menu";

import { View } from "./View";
import { ViewMobile } from "./ViewMobile";

const ProfileButton = () => {
  const { labelToken, redirection, errorColor } = useMenu();

  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);

  const { data: userInfo } = MeApi.queries.useGetMe({});

  const { githubUserId, login = "", avatarUrl = "" } = userInfo || {};

  const { onboardingInProgress } = useOnboarding();

  const props = {
    githubUserId,
    avatarUrl,
    login,
    labelToken,
    redirection,
    errorColor,
    hideProfileItems: onboardingInProgress,
  };
  return isXl ? <View {...props} /> : <ViewMobile {...props} />;
};

export default ProfileButton;
