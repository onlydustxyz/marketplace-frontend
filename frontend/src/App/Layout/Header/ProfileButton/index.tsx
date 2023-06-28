import { useAuth } from "src/hooks/useAuth";
import View from "src/App/Layout/Header/ProfileButton/View";
import usePayoutSettings from "src/hooks/usePayoutSettings";
import {
  useGetOnboardingStateQuery,
  useGetUserAvatarUrlQuery,
  usePendingUserPaymentsQuery,
} from "src/__generated/graphql";
import { TERMS_AND_CONDITIONS_LAST_REDACTION_DATE } from "src/App/OnboardingWrapper";

const ProfileButton = () => {
  const { user, logout, githubUserId, impersonating } = useAuth();
  const { login } = user ?? { login: "My Account" };

  const { data: profile } = useGetUserAvatarUrlQuery({
    variables: { githubUserId },
    skip: !githubUserId,
  });
  const avatarUrl = profile?.userProfiles.at(0)?.avatarUrl || "";

  const { valid } = usePayoutSettings(githubUserId);
  const { data } = usePendingUserPaymentsQuery({ variables: { userId: user?.id }, skip: (valid ?? true) || !user?.id });

  const onboardingStateQuery = useGetOnboardingStateQuery({
    variables: { userId: user?.id },
    skip: !user?.id,
  });

  const hideProfileItems = !!(
    user?.id &&
    !onboardingStateQuery.loading &&
    !impersonating &&
    (!onboardingStateQuery?.data?.onboardingsByPk?.termsAndConditionsAcceptanceDate ||
      new Date(onboardingStateQuery?.data?.onboardingsByPk?.termsAndConditionsAcceptanceDate) <
        new Date(TERMS_AND_CONDITIONS_LAST_REDACTION_DATE))
  );

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
        showMissingPayoutSettingsState: payoutSettingsInvalid && !hideProfileItems,
        hideProfileItems,
      }}
    />
  );
};

export default ProfileButton;
