"use client";

import { useContext } from "react";

import { HackathonContext } from "app/hackathons/[hackathonSlug]/context/hackathon.context";

import { ButtonSecondaryLight } from "components/atoms/button/variants/button-secondary-light";

export function Header() {
  const {
    project: { close },
  } = useContext(HackathonContext);

  return (
    <div className="flex items-center justify-between gap-2">
      <p>project</p>

      <ButtonSecondaryLight
        onClick={close}
        size="l"
        hideText
        startIcon={{
          remixName: "ri-close-line",
        }}
      />
    </div>
  );
}
