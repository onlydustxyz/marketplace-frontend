import { Fragment, useRef } from "react";
import { useMediaQuery } from "usehooks-ts";

import { useOnboarding } from "src/App/OnboardingProvider";
import MeApi from "src/api/me";
import { viewportConfig } from "src/config";

import { useMenu } from "hooks/menu/useMenu";

import FeedbackButton from "../FeedbackButton";
import { View } from "./View";
import { ViewMobile } from "./ViewMobile";

const ProfileButton = () => {
  const { color, labelToken, redirection, error } = useMenu();

  const feedbackButtonRef = useRef<{ open: () => void }>(null);

  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);

  const { data: userInfo } = MeApi.queries.useGetMe({});

  const { githubUserId, login = "", avatarUrl = "" } = userInfo || {};

  const { onboardingInProgress } = useOnboarding();

  const openFeedback = () => {
    feedbackButtonRef?.current?.open?.();
  };

  const props = {
    githubUserId,
    avatarUrl,
    login,
    color,
    labelToken,
    redirection,
    error,
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
