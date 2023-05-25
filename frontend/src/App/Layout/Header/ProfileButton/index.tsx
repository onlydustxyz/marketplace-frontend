import { useAuth } from "src/hooks/useAuth";
import View from "src/App/Layout/Header/ProfileButton/View";
import usePayoutSettings from "src/hooks/usePayoutSettings";
import { usePendingUserPaymentsQuery } from "src/__generated/graphql";

const ProfileButton = () => {
  const { user, logout, githubUserId } = useAuth();
  const { avatarUrl, login } = user ?? { avatarUrl: null, login: "My Account" };

  const { valid } = usePayoutSettings(githubUserId);
  const { data } = usePendingUserPaymentsQuery({ variables: { userId: user?.id }, skip: (valid ?? true) || !user?.id });

  const pendingPaymentRequestsCount =
    data?.registeredUsers
      ?.at(0)
      ?.paymentRequests.filter(p => p.paymentsAggregate.aggregate?.sum?.amount || 0 < p.amountInUsd).length || 0;

  const payoutSettingsInvalid = valid === false && pendingPaymentRequestsCount > 0;

  return <View {...{ githubUserId, avatarUrl, login, logout, payoutSettingsInvalid }} />;
};

export default ProfileButton;
