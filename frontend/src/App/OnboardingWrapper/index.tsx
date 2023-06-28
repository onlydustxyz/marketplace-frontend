import { PropsWithChildren } from "react";
import { useGetOnboardingStateQuery } from "src/__generated/graphql";
import { useAuth } from "src/hooks/useAuth";
import { generatePath, Navigate, useLocation } from "react-router-dom";
import { RoutePaths } from "src/App";

export const TERMS_AND_CONDITIONS_LAST_REDACTION_DATE = "2023-06-01";

export default function OnboardingWrapper({ children }: PropsWithChildren) {
  const { user, impersonating } = useAuth();
  const userId = user?.id;
  const { data, loading } = useGetOnboardingStateQuery({
    variables: { userId },
    skip: !userId,
  });
  const location = useLocation();

  const redirectedPaths: string[] = [RoutePaths.TermsAndConditions, RoutePaths.Onboarding];

  const termsAndConditionsValidationNeeded =
    !redirectedPaths.includes(location.pathname) &&
    user?.id &&
    !loading &&
    !impersonating &&
    (!data?.onboardingsByPk?.termsAndConditionsAcceptanceDate ||
      new Date(data?.onboardingsByPk?.termsAndConditionsAcceptanceDate) <
        new Date(TERMS_AND_CONDITIONS_LAST_REDACTION_DATE));

  const onboardingWizzardNeeded =
    !redirectedPaths.includes(location.pathname) &&
    user?.id &&
    !loading &&
    !impersonating &&
    !data?.onboardingsByPk?.profileWizardDisplayDate;

  return onboardingWizzardNeeded ? (
    <Navigate to={generatePath(RoutePaths.Onboarding)} />
  ) : termsAndConditionsValidationNeeded ? (
    <Navigate
      to={generatePath(RoutePaths.TermsAndConditions)}
      state={{ skipIntro: location.state?.onboardingWizzardCompleted }}
    />
  ) : (
    <> {children}</>
  );
}
