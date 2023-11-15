import View from "src/App/Layout/Header/ProfileButton/View";
import { useOnboarding } from "src/App/OnboardingProvider";
import { usePendingUserPaymentsQuery } from "src/__generated/graphql";
import MeApi from "src/api/me";
import { viewportConfig } from "src/config";
import { useAuth } from "src/hooks/useAuth";
import { useMediaQuery } from "usehooks-ts";
import ViewMobile from "./ViewMobile";

const ProfileButton = () => {
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  const { user, logout, githubUserId } = useAuth();
  const { login } = user ?? { login: "My Account" };

  const { data: userInfo } = MeApi.queries.useGetMe({});

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

  const avatarUrl = userInfo?.avatarUrl || "";

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
