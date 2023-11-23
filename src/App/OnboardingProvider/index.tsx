import { createContext, PropsWithChildren, useContext } from "react";
import { useAuth } from "src/hooks/useAuth";
import { generatePath, Navigate, useLocation } from "react-router-dom";
import { RoutePaths } from "src/App";
import MeApi from "src/api/me";

type Onboarding = {
  onboardingInProgress: boolean;
};

export const OnboardingContext = createContext<Onboarding>({ onboardingInProgress: false });

export default function OnboardingProvider({ children }: PropsWithChildren) {
  const { impersonating } = useAuth();

  const { data, isLoading } = MeApi.queries.useGetMe({});

  const location = useLocation();

  const onboardingRoutes: string[] = [RoutePaths.TermsAndConditions, RoutePaths.Onboarding];

  const onboardingInProgress = onboardingRoutes.includes(location.pathname);

  const skipRedirection = onboardingInProgress || !data?.id || isLoading;

  const showOnboarding = !skipRedirection && !data?.hasSeenOnboardingWizard && !impersonating;
  const showTermsAndConditions = !skipRedirection && !data?.hasAcceptedLatestTermsAndConditions && !impersonating;

  return showOnboarding ? (
    <Navigate to={generatePath(RoutePaths.Onboarding)} />
  ) : showTermsAndConditions ? (
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
