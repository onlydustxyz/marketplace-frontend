"use client";

import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { isContactInfoProvided } from "utils/profile/contact-info";

import { viewportConfig } from "src/config";

import { Button } from "components/ds/button/button";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";

import { ApplyForm } from "../form/form";
import { TApplyAuthenticatedSection } from "./authenticated-section.types";

export function ApplyAuthenticatedSection({
  formDescription,
  buttonConnected,
  onApply,
  profile,
  alreadyApplied,
  isLoading,
}: TApplyAuthenticatedSection.Props) {
  const isMd = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);

  const contactInfoProvided = isContactInfoProvided({ profile, channels: ["TELEGRAM"] });

  const [showForm, setShowForm] = useState(false);

  function handleSubmit() {
    setShowForm(false);
    onApply();
  }

  function handleRegister() {
    if (contactInfoProvided) {
      onApply();
    } else {
      setShowForm(true);
    }
  }

  if (showForm) {
    return (
      <ApplyForm
        formDescription={formDescription}
        buttonConnected={buttonConnected}
        onApply={handleSubmit}
        profile={profile}
      />
    );
  }

  return (
    <Button
      onClick={handleRegister}
      disabled={alreadyApplied || isLoading}
      size={isMd ? "m" : "s"}
      width="full"
      backgroundColor="blue"
    >
      {isLoading ? (
        <Icon remixName={"ri-loader-4-line"} size={20} className={"animate-spin"} />
      ) : (
        <Icon remixName={alreadyApplied ? "ri-check-line" : "ri-send-plane-2-line"} size={20} />
      )}
      <Translate token={buttonConnected} />
    </Button>
  );
}
