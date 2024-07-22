"use client";

import { createContext, useMemo, useState } from "react";

import { HackathonUtils } from "app/hackathons/[hackathonSlug]/utils";

import { viewportConfig } from "src/config";

import { useClientMediaQuery } from "hooks/layout/useClientMediaQuery/use-client-media-query";

import { THackathonContext } from "./hackathon.context.types";

export const HackathonContext = createContext<THackathonContext.Return>({
  issues: {
    isOpen: false,
    open: () => null,
    close: () => null,
  },
  project: {
    isOpen: false,
    projectId: "",
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
      project: "0px",
      timeline: "0px",
    },
  },
});

export function HackathonContextProvider({ children, hasEvents }: THackathonContext.Props) {
  const isLg = useClientMediaQuery(`(max-width: ${viewportConfig.breakpoints.lg}px)`);

  const [isIssuesOpen, setIsIssuesOpen] = useState<boolean>(false);
  const [isProjectOpen, setIsProjectOpen] = useState<boolean>(false);
  const [projectId, setProjectId] = useState("");

  const isTimelineOpen = isLg ? false : hasEvents && !isIssuesOpen && !isProjectOpen;

  const panelSize = useMemo(
    () =>
      HackathonUtils.getContainerSize({
        isTimelineOpen,
        isIssueOpen: isIssuesOpen,
        isProjectOpen,
      }),
    [isIssuesOpen, isProjectOpen]
  );

  function toggleIssues() {
    if (isIssuesOpen) {
      setIsIssuesOpen(false);
    } else {
      setIsIssuesOpen(true);
      setIsProjectOpen(false);
    }
  }

  function openProject(projectId: string) {
    setProjectId(projectId);
    setIsIssuesOpen(false);
    setIsProjectOpen(true);
  }

  function closeProject() {
    setProjectId("");
    setIsProjectOpen(false);
  }

  return (
    <HackathonContext.Provider
      value={{
        panelSize: {
          ...panelSize,
          container: isLg ? "100%" : panelSize.container,
        },
        timeline: {
          isOpen: isTimelineOpen,
        },
        issues: {
          isOpen: isIssuesOpen,
          open: toggleIssues,
          close: toggleIssues,
        },
        project: {
          isOpen: isProjectOpen,
          projectId,
          open: openProject,
          close: closeProject,
        },
      }}
    >
      {children}
    </HackathonContext.Provider>
  );
}
