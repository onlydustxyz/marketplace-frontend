interface getContainerSizeParameters {
  isTimelineOpen: boolean;
  isIssueOpen: boolean;
  isProjectOpen: boolean;
}

function getContainerSize(p: getContainerSizeParameters): { container: string; panel: string } {
  if (p.isIssueOpen) {
    return {
      container: "60%",
      panel: "40%",
    };
  }

  if (p.isIssueOpen) {
    return {
      container: "60%",
      panel: "40%",
    };
  }

  return {
    container: "70%",
    panel: "30%",
  };
}

export const HackathonUtils = {
  getContainerSize,
};
