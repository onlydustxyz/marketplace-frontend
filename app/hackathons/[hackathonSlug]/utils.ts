interface getContainerSizeParameters {
  isTimelineOpen: boolean;
  isIssueOpen: boolean;
  isProjectOpen: boolean;
}

interface getContainerSizeReturn {
  container: string;
  panels: {
    issues: string;
    project: string;
    timeline: string;
  };
}

function getContainerSize(p: getContainerSizeParameters): getContainerSizeReturn {
  const panels = {
    issues: "40%",
    project: "40%",
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
