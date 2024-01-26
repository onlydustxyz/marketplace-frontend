import { useOnboarding } from "src/App/OnboardingProvider";
import MeApi from "src/api/me";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";
import { Fragment, useRef } from "react";
import FeedbackButton from "../FeedbackButton";
import { View } from "./View";
import { ViewMobile } from "./ViewMobile";

const ProfileButton = () => {
  const feedbackButtonRef = useRef<{ open: () => void }>(null);

  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);

  const { data: userInfo } = MeApi.queries.useGetMe({});

  const { githubUserId, login = "", avatarUrl = "" } = userInfo || {};

  const { onboardingInProgress } = useOnboarding();

  const payoutSettingsInvalid = userInfo?.hasValidPayoutInfos === false;

  const openFeedback = () => {
    feedbackButtonRef?.current?.open?.();
  };

  const props = {
    githubUserId,
    avatarUrl,
    login,
    isMissingPayoutSettingsInfo: payoutSettingsInvalid && !onboardingInProgress,
    hideProfileItems: onboardingInProgress,
    openFeedback,
  };

  return (
    <>
      <FeedbackButton customButton={<Fragment />} ref={feedbackButtonRef} />
      {isXl ? <View {...props} /> : <ViewMobile {...props} />}
    </>
  );
};

export default ProfileButton;
