import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import { useAuth } from "src/hooks/useAuth";
import {
  GetOnboardingStateDocument,
  GetOnboardingStateQuery,
  useAcceptTermsAndConditionsMutation,
} from "src/__generated/graphql";
import TermsAndConditionsMainCard from "./MainCard";
import TermsAndConditionsPromptCard from "./PromptCard";

export default function TermsAndConditions() {
  const { user } = useAuth();
  const location = useLocation();
  const [showTermsAndConditions, setShowTermsAndConditions] = useState(false);
  const [acceptTermsAndConditionsMutation, { data }] = useAcceptTermsAndConditionsMutation({
    update: cache => {
      const cachedData = cache.readQuery<GetOnboardingStateQuery>({
        query: GetOnboardingStateDocument,
        variables: { userId: user?.id },
      });
      cache.writeQuery({
        query: GetOnboardingStateDocument,
        variables: { userId: user?.id },
        data: {
          onboardingsByPk: {
            userId: user?.id,
            termsAndConditionsAcceptanceDate: new Date(),
            profileWizardDisplayDate: cachedData?.onboardingsByPk?.profileWizardDisplayDate || null,
          },
        },
      });
    },
    onCompleted: () => {
      navigate(RoutePaths.Home);
    },
  });
  const navigate = useNavigate();

  return (
    <Background roundedBorders={BackgroundRoundedBorders.Full} centeredContent={!showTermsAndConditions}>
      <div className="flex flex-col items-center justify-center text-greyscale-50">
        <div className="w-1/2">
          {!showTermsAndConditions && !location.state?.skipIntro ? (
            <TermsAndConditionsPromptCard {...{ setShowTermsAndConditions }} />
          ) : (
            <>
              {!data && (
                <TermsAndConditionsMainCard handleAcceptTermsAndConditions={acceptTermsAndConditionsMutation} />
              )}
            </>
          )}
        </div>
      </div>
    </Background>
  );
}
