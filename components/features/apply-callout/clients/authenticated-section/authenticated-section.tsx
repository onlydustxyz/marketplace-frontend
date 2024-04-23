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

  const [showContactInfos, setShowContactInfos] = useState(false);

  function handleApplyClick() {
    if (!contactInfoProvided) {
      setShowContactInfos(true);
    } else {
      onApply();
    }
  }

  return (
    <>
      {showContactInfos ? (
        <ApplyForm
          formDescription={formDescription}
          buttonConnected={buttonConnected}
          onApply={handleApplyClick}
          profile={profile}
          setShow={setShowContactInfos}
        />
      ) : (
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
      )}
    </>
  );
}
