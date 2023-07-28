import { createContext, PropsWithChildren, useContext } from "react";
import { useGetOnboardingStateQuery } from "src/__generated/graphql";
import { useAuth } from "src/hooks/useAuth";
import { generatePath, Navigate, useLocation } from "react-router-dom";
import { RoutePaths } from "src/App";

export const TERMS_AND_CONDITIONS_LAST_REDACTION_DATE = "2023-06-01";

type Onboarding = {
  onboardingInProgress: boolean;
};

export const OnboardingContext = createContext<Onboarding>({ onboardingInProgress: false });

export default function OnboardingProvider({ children }: PropsWithChildren) {
  const { user, impersonating } = useAuth();
  const userId = user?.id;

  const { data, loading } = useGetOnboardingStateQuery({
    variables: { userId },
    skip: !userId || impersonating,
  });

  const location = useLocation();

  const onboardingRoutes: string[] = [RoutePaths.TermsAndConditions, RoutePaths.Onboarding];

  const termsAndConditionsAccepted =
    data?.onboardingsByPk?.termsAndConditionsAcceptanceDate &&
    new Date(data?.onboardingsByPk?.termsAndConditionsAcceptanceDate) >=
      new Date(TERMS_AND_CONDITIONS_LAST_REDACTION_DATE);

  const onboardingWizzardCompleted = !!data?.onboardingsByPk?.profileWizardDisplayDate;

  const onboardingInProgress = onboardingRoutes.includes(location.pathname);

  const skipRedirection = onboardingInProgress || !userId || loading;

  return !skipRedirection && !onboardingWizzardCompleted && !impersonating ? (
    <Navigate to={generatePath(RoutePaths.Onboarding)} />
  ) : !skipRedirection && !termsAndConditionsAccepted && !impersonating ? (
    <Navigate
      to={generatePath(RoutePaths.TermsAndConditions)}
      state={{ skipIntro: location.state?.onboardingWizzardCompleted }}
    />
  ) : (
    <OnboardingContext.Provider value={{ onboardingInProgress }}>{children}</OnboardingContext.Provider>
  );
}

export const useOnboarding = (): Onboarding => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
