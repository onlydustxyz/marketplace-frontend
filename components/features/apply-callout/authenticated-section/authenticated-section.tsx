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
}: TApplyAuthenticatedSection.Props) {
  const isMd = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);

  const contactInfoProvided = isContactInfoProvided({ profile, channels: ["TELEGRAM"] });

  const [showForm, setShowForm] = useState(false);

  function handleApplyClick() {
    if (!contactInfoProvided) {
      setShowForm(true);
    } else {
      onApply();
    }
  }

  if (showForm) {
    return (
      <ApplyForm
        formDescription={formDescription}
        buttonConnected={buttonConnected}
        onApply={handleApplyClick}
        profile={profile}
        setShowForm={setShowForm}
      />
    );
  }

  return (
    <Button
      onClick={handleApplyClick}
      disabled={alreadyApplied}
      size={isMd ? "m" : "s"}
      width="full"
      backgroundColor="blue"
    >
      <Icon remixName={alreadyApplied ? "ri-check-line" : "ri-send-plane-2-line"} size={20} />
      <Translate token={buttonConnected} />
    </Button>
  );
}
