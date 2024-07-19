interface getContainerSizeParameters {
  isTimelineOpen: boolean;
  isIssueOpen: boolean;
  isProjectOpen: boolean;
}

function getContainerSize(p: getContainerSizeParameters): {
  container: string;
  panels: {
    issues: string;
    timeline: string;
  };
} {
  const panels = {
    issues: "40%",
    timeline: "30%",
  };

  if (p.isIssueOpen) {
    return {
      container: "60%",
      panels,
    };
  }

  if (p.isProjectOpen) {
    return {
      container: "60%",
      panels,
    };
  }

  if (p.isTimelineOpen) {
    return {
      container: "70%",
      panels,
    };
  }

  return {
    container: "100%",
    panels,
  };
}

export const HackathonUtils = {
  getContainerSize,
};
