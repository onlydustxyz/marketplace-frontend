import { useAuth } from "src/hooks/useAuth";
import View from "src/App/Layout/Header/ProfileButton/View";
import { useGetUserAvatarUrlQuery, usePendingUserPaymentsQuery } from "src/__generated/graphql";
import { useOnboarding } from "src/App/OnboardingProvider";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";
import ViewMobile from "./ViewMobile";
import { useRestfulData } from "src/hooks/useRestfulData/useRestfulData";
import { ApiResourcePaths } from "src/hooks/useRestfulData/config";

const ProfileButton = () => {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  const { user, logout, githubUserId } = useAuth();
  const { login } = user ?? { login: "My Account" };

  const { data: profile } = useGetUserAvatarUrlQuery({
    variables: { githubUserId },
    skip: !githubUserId,
  });
  const avatarUrl = profile?.userProfiles.at(0)?.avatarUrl || "";

  const { data: userInfo } = useRestfulData({
    resourcePath: ApiResourcePaths.GET_USER,
    method: "GET",
  });

  const { data } = usePendingUserPaymentsQuery({
    variables: { userId: user?.id },
    skip: (userInfo?.hasValidPayoutInfos ?? true) || !user?.id,
  });
  const { onboardingInProgress } = useOnboarding();

  const pendingPaymentRequestsCount =
    data?.registeredUsers
      ?.at(0)
      ?.paymentRequests.filter(p => p.paymentsAggregate.aggregate?.sum?.amount || 0 < p.amount).length || 0;

  const payoutSettingsInvalid = userInfo?.hasValidPayoutInfos === false && pendingPaymentRequestsCount > 0;

  const props = {
    githubUserId,
    avatarUrl,
    login,
    logout,
    isMissingPayoutSettingsInfo: payoutSettingsInvalid && !onboardingInProgress,
    hideProfileItems: onboardingInProgress,
  };

  return isXl ? <View {...props} /> : <ViewMobile {...props} />;
};

export default ProfileButton;
