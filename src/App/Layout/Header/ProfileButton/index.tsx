import View from "src/App/Layout/Header/ProfileButton/View";
import { useOnboarding } from "src/App/OnboardingProvider";
import MeApi from "src/api/me";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";
import ViewMobile from "./ViewMobile";
import { useAuth0 } from "@auth0/auth0-react";
import { getGithubUserIdFromSub } from "../../../../../components/features/auth0/utils/getGithubUserIdFromSub.util.ts";

const ProfileButton = () => {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  const { user } = useAuth0();
  const githubUserId = getGithubUserIdFromSub(user?.sub);
  const login = user?.nickname || "My Account";
  const avatarUrl = user?.picture || "";

  const { data: userInfo } = MeApi.queries.useGetMe({});

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
