import { useAuth } from "src/hooks/useAuth";
import View from "src/App/Layout/Header/ProfileButton/View";
import usePayoutSettings from "src/hooks/usePayoutSettings";
import { useGetTermsAndConditionsAcceptancesQuery, usePendingUserPaymentsQuery } from "src/__generated/graphql";
import { TERMS_AND_CONDITIONS_LAST_REDACTION_DATE } from "src/App/TermsAndConditionsWrapper";

const ProfileButton = () => {
  const { user, logout, githubUserId, impersonating } = useAuth();
  const { avatarUrl, login } = user ?? { avatarUrl: null, login: "My Account" };

  const { valid } = usePayoutSettings(githubUserId);
  const { data } = usePendingUserPaymentsQuery({ variables: { userId: user?.id }, skip: (valid ?? true) || !user?.id });

  const termsAndConditionsAcceptanceQuery = useGetTermsAndConditionsAcceptancesQuery({
    variables: { userId: user?.id },
    skip: !user?.id,
  });

  const hideProfileItems = !!(
    user?.id &&
    !termsAndConditionsAcceptanceQuery.loading &&
    !impersonating &&
    (!termsAndConditionsAcceptanceQuery?.data?.termsAndConditionsAcceptancesByPk?.acceptanceDate ||
      new Date(termsAndConditionsAcceptanceQuery?.data?.termsAndConditionsAcceptancesByPk?.acceptanceDate) <
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
