"use client";

import { useContext } from "react";

import { HackathonIssuesContext } from "app/hackathons/[hackathonSlug]/context/hackathon-issues.context";

import { ButtonSecondaryLight } from "components/atoms/button/variants/button-secondary-light";

export function Header() {
  const {
    drawer: { close },
  } = useContext(HackathonIssuesContext);

  return (
    <div className="flex items-center justify-between gap-2">
      <p>Filters</p>
      <p>Search</p>

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
