"use client";

import { useContext } from "react";

import { HackathonIssuesContext } from "app/hackathons/[hackathonSlug]/features/hackathon-issues/context/hackathon-issues.context";
import { THackathonIssuesContext } from "app/hackathons/[hackathonSlug]/features/hackathon-issues/context/hackathon-issues.context.types";

import { Paper } from "components/atoms/paper";
import { Typo } from "components/atoms/typo";
import { RadioButtonGroup } from "components/molecules/radio-button-group";

import { useIntl } from "hooks/translate/use-translate";

export function RecommendedFilters() {
  const { T } = useIntl();

  const {
    filters: {
      set,
      values: { availability },
    },
  } = useContext(HackathonIssuesContext);

  function handleAvailability(value: THackathonIssuesContext.FilterAvailability) {
    set({ availability: value });
  }

  return (
    <Paper size="s" container="2" classNames={{ base: "flex flex-col gap-2" }}>
      <Typo size="xs" weight="medium" translate={{ token: "v2.pages.hackathons.details.issues.filters.recommended" }} />

      <RadioButtonGroup
        classNames={{ base: "gap-2" }}
        items={[
          { label: T("v2.pages.hackathons.details.issues.filters.modal.issuesStates.all"), value: "all" },
          { label: T("v2.pages.hackathons.details.issues.filters.modal.issuesStates.available"), value: "available" },
          {
            label: T("v2.pages.hackathons.details.issues.filters.modal.issuesStates.notAvailable"),
            value: "notAvailable",
          },
        ]}
        value={availability}
        onChange={handleAvailability}
      />
    </Paper>
  );
}
