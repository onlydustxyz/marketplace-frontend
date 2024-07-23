"use client";

import { createContext, useEffect, useMemo, useState } from "react";

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
    open: () => null,
    close: () => null,
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
  const isXl = useClientMediaQuery(`(max-width: ${viewportConfig.breakpoints.xl}px)`);

  const [isTimelineOpen, setIsTimelineOpen] = useState<boolean>(false);
  const [isIssuesOpen, setIsIssuesOpen] = useState<boolean>(false);
  const [isProjectOpen, setIsProjectOpen] = useState<boolean>(false);
  const [projectId, setProjectId] = useState("");

  const panelSize = useMemo(() => {
    if (isXl) {
      return {
        container: "100%",
        panels: {
          issues: "0px",
          project: "0px",
          timeline: "0px",
        },
      };
    }
    return HackathonUtils.getContainerSize({
      isTimelineOpen,
      isIssueOpen: isIssuesOpen,
      isProjectOpen,
    });
  }, [isIssuesOpen, isProjectOpen, isTimelineOpen, isXl]);

  useEffect(() => {
    if (!isXl) {
      setIsTimelineOpen(hasEvents && !isIssuesOpen && !isProjectOpen);
    } else {
      setIsTimelineOpen(false);
    }
  }, [isXl, isIssuesOpen, isProjectOpen]);

  function toggleIssues() {
    if (isIssuesOpen) {
      setIsIssuesOpen(false);
      setIsTimelineOpen(true);
    } else {
      setIsIssuesOpen(true);
      setIsTimelineOpen(false);
      setIsProjectOpen(false);
    }
  }

  function toggleTimeline() {
    if (isTimelineOpen) {
      setIsTimelineOpen(false);
    } else {
      setIsTimelineOpen(true);
      setIsIssuesOpen(false);
      setIsProjectOpen(false);
    }
  }

  function openProject(projectId: string) {
    setProjectId(projectId);
    setIsIssuesOpen(false);
    setIsTimelineOpen(false);
    setIsProjectOpen(true);
  }

  function closeProject() {
    setProjectId("");
    setIsProjectOpen(false);
    setIsTimelineOpen(true);
  }

  return (
    <HackathonContext.Provider
      value={{
        panelSize,
        timeline: {
          isOpen: isTimelineOpen,
          open: toggleTimeline,
          close: toggleTimeline,
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
