import { useAuth } from "src/hooks/useAuth";
import View from "src/App/Layout/Header/ProfileButton/View";
import usePayoutSettings from "src/hooks/usePayoutSettings";
import { useGetUserAvatarUrlQuery, usePendingUserPaymentsQuery } from "src/__generated/graphql";
import { useOnboarding } from "src/App/OnboardingProvider";

const ProfileButton = () => {
  const { user, logout, githubUserId } = useAuth();
  const { login } = user ?? { login: "My Account" };

  const { data: profile } = useGetUserAvatarUrlQuery({
    variables: { githubUserId },
    skip: !githubUserId,
  });
  const avatarUrl = profile?.userProfiles.at(0)?.avatarUrl || "";

  const { valid } = usePayoutSettings(githubUserId);
  const { data } = usePendingUserPaymentsQuery({ variables: { userId: user?.id }, skip: (valid ?? true) || !user?.id });
  const { onboardingInProgress } = useOnboarding();

  const pendingPaymentRequestsCount =
    data?.registeredUsers
      ?.at(0)
      ?.paymentRequests.filter(p => p.paymentsAggregate.aggregate?.sum?.amount || 0 < p.amountInUsd).length || 0;

  const payoutSettingsInvalid = valid === false && pendingPaymentRequestsCount > 0;

  return (
    <View
      {...{
        githubUserId,
        avatarUrl,
        login,
        logout,
        showMissingPayoutSettingsState: payoutSettingsInvalid && !onboardingInProgress,
        hideProfileItems: onboardingInProgress,
      }}
    />
  );
};

export default ProfileButton;
