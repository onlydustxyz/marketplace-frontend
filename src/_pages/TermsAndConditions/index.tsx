"use client";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { RoutePaths } from "src/App";
import MeApi from "src/api/me";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import SEO from "src/components/SEO";

import TermsAndConditionsMainCard from "./MainCard";
import TermsAndConditionsPromptCard from "./PromptCard";

export default function TermsAndConditions() {
  const location = useLocation();
  const [showTermsAndConditions, setShowTermsAndConditions] = useState(false);
  const { mutate: updateUserMutation, isSuccess } = MeApi.mutations.useUpdateMe({
    options: {
      onSuccess: () => {
        navigate(RoutePaths.Projects);
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
        {!showTermsAndConditions && !location.state?.skipIntro ? (
          <div className="mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-2 pb-6 text-greyscale-50 md:p-6">
            <TermsAndConditionsPromptCard {...{ setShowTermsAndConditions }} />
          </div>
        ) : (
          <>
            {!isSuccess && (
              <div className="flex h-full items-center justify-center md:p-6">
                <div className="relative flex max-h-full w-full max-w-full flex-col overflow-hidden bg-card-background-base md:w-[688px] md:rounded-2xl">
                  <TermsAndConditionsMainCard handleAcceptTermsAndConditions={onAcceptTermsAndConditions} />
                </div>
              </div>
            )}
          </>
        )}
      </Background>
    </>
  );
}
