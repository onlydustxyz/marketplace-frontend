"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocalStorage } from "react-use";

import MeApi from "src/api/me";
import Background, { BackgroundRoundedBorders } from "src/components/Background";
import SEO from "src/components/SEO";

import { ONBOARDING_COMPLETED_STORAGE_KEY } from "constants/onboarding";
import { NEXT_ROUTER } from "constants/router";

import TermsAndConditionsMainCard from "./MainCard";
import TermsAndConditionsPromptCard from "./PromptCard";

export default function TermsAndConditions() {
  const router = useRouter();

  const { data } = MeApi.queries.useGetMe({});
  const [onboardingWizardCompleted] = useLocalStorage(
    `${ONBOARDING_COMPLETED_STORAGE_KEY}-${data?.id ?? "default"}`,
    false
  );

  const [showTermsAndConditions, setShowTermsAndConditions] = useState(false);
  const { mutate: updateUserMutation, isSuccess } = MeApi.mutations.useUpdateMe({
    options: {
      onSuccess: () => {
        router.push(NEXT_ROUTER.projects.all);
      },
    },
  });

  const onAcceptTermsAndConditions = () => {
    updateUserMutation({
      hasAcceptedTermsAndConditions: true,
    });
  };

  return (
    <>
      <SEO />
      <Background roundedBorders={BackgroundRoundedBorders.Full}>
        {!showTermsAndConditions && !onboardingWizardCompleted ? (
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
