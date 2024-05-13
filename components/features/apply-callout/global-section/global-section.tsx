"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useMediaQuery } from "usehooks-ts";

import MeApi from "src/api/me";
import { viewportConfig } from "src/config";

import { Button } from "components/ds/button/button";
import { handleLoginWithRedirect } from "components/features/auth0/handlers/handle-login";
import { Translate } from "components/layout/translate/translate";

import { ApplyAuthenticatedSection } from "../authenticated-section/authenticated-section";
import { TApplyGlobalSection } from "./global-section.types";

export function ApplyGlobalSection({
  formDescription,
  buttonConnected,
  buttonNotConnected,
  onApply,
  alreadyApplied,
  isLoading,
}: TApplyGlobalSection.Props) {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const isMd = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);

  const { data: profile, isLoading: profileIsLoading } = MeApi.queries.useGetMyProfileInfo({});

  function handleLoginClick() {
    handleLoginWithRedirect(loginWithRedirect);
  }

  if (!profile && profileIsLoading) {
    return null;
  }

  if (profile && isAuthenticated) {
    return (
      <ApplyAuthenticatedSection
        formDescription={formDescription}
        buttonConnected={buttonConnected}
        onApply={onApply}
        profile={profile}
        alreadyApplied={alreadyApplied}
        isLoading={isLoading}
      />
    );
  }

  return (
    <Button onClick={handleLoginClick} size={isMd ? "m" : "s"} width="full">
      <Translate token={buttonNotConnected} />
    </Button>
  );
}
