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
}: TApplyGlobalSection.Props) {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const isMd = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);

  const { data: profile, isLoading } = MeApi.queries.useGetMyProfileInfo({});

  function handleLoginClick() {
    handleLoginWithRedirect(loginWithRedirect);
  }

  if (!profile) {
    return null;
  }

  if (isLoading) {
    return null;
  }

  return (
    <>
      {isAuthenticated ? (
        <ApplyAuthenticatedSection
          formDescription={formDescription}
          buttonConnected={buttonConnected}
          onApply={onApply}
          profile={profile}
          alreadyApplied={alreadyApplied}
        />
      ) : (
        <Button onClick={handleLoginClick} size={isMd ? "m" : "s"} width="full">
          <Translate token={buttonNotConnected} />
        </Button>
      )}
    </>
  );
}
