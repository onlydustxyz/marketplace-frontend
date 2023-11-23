import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import Background, { BackgroundRoundedBorders } from "src/components/Background";

import TermsAndConditionsMainCard from "./MainCard";
import TermsAndConditionsPromptCard from "./PromptCard";
import SEO from "src/components/SEO";
import MeApi from "src/api/me";

export default function TermsAndConditions() {
  const location = useLocation();
  const [showTermsAndConditions, setShowTermsAndConditions] = useState(false);
  const { mutate: updateUserMutation, isSuccess } = MeApi.mutations.useUpdateMe({
    options: {
      onSuccess: () => {
        navigate(RoutePaths.Home);
      },
    },
  });

  const onAcceptTermsAndConditions = () => {
    updateUserMutation({
      hasAcceptedTermsAndConditions: true,
    });
  };
  const navigate = useNavigate();

  return (
    <>
      <SEO />
      <Background roundedBorders={BackgroundRoundedBorders.Full}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-2 pb-6 text-greyscale-50">
          {!showTermsAndConditions && !location.state?.skipIntro ? (
            <TermsAndConditionsPromptCard {...{ setShowTermsAndConditions }} />
          ) : (
            <>
              {!isSuccess && <TermsAndConditionsMainCard handleAcceptTermsAndConditions={onAcceptTermsAndConditions} />}
            </>
          )}
        </div>
      </Background>
    </>
  );
}
