"use client";

import { createContext, useMemo, useState } from "react";

import { HackathonUtils } from "app/hackathons/[hackathonSlug]/utils";

import { THackathonContext } from "./hackathon.context.types";

export const HackathonContext = createContext<THackathonContext.Return>({
  issues: {
    isOpen: false,
    open: () => null,
    close: () => null,
  },
  timeline: {
    isOpen: false,
  },
  panelSize: {
    container: "100%",
    panels: {
      issues: "0px",
      timeline: "0px",
    },
  },
});

export function HackathonContextProvider({ children }: THackathonContext.Props) {
  const [isIssuesOpen, setIsIssuesOpen] = useState<boolean>(false);
  // TODO keep this until timeline is done
  // const isTimelineOpen = !isIssuesOpen;
  const isTimelineOpen = false;

  const panelSize = useMemo(
    () =>
      HackathonUtils.getContainerSize({
        isTimelineOpen,
        isIssueOpen: isIssuesOpen,
        isProjectOpen: false,
      }),
    [isIssuesOpen]
  );

  return (
    <HackathonContext.Provider
      value={{
        panelSize,
        timeline: {
          isOpen: isTimelineOpen,
        },
        issues: {
          isOpen: isIssuesOpen,
          open: () => setIsIssuesOpen(true),
          close: () => setIsIssuesOpen(false),
        },
      }}
    >
      {children}
    </HackathonContext.Provider>
  );
}
