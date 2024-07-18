"use client";

import { createContext, useState } from "react";

import { HackathonUtils } from "app/hackathons/[hackathonSlug]/utils";

import { THackathonContext } from "./hackathon.context.types";

export const HackathonContext = createContext<THackathonContext.Return>({
  issues: {
    isOpen: false,
    open: () => null,
    close: () => null,
  },
  panelSize: {
    container: "100%",
    panel: "0px",
  },
});

export function HackathonContextProvider({ children }: THackathonContext.Props) {
  const [isIssuesOpen, setIsIssuesOpen] = useState<boolean>(false);

  return (
    <HackathonContext.Provider
      value={{
        panelSize: HackathonUtils.getContainerSize({
          isTimelineOpen: !isIssuesOpen,
          isIssueOpen: isIssuesOpen,
          isProjectOpen: false,
        }),
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
