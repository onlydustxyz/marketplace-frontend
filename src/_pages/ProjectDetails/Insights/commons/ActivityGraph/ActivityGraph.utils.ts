const calculateHeight = (count: number, maxCount: number): string => {
  if (count === 0) return "";
  const relativeHeight = Math.ceil((count / maxCount) * 10);
  return `h-${relativeHeight}`;
};

const getFirstNonZeroBar = (codeReviewCount: number, issueCount: number, pullRequestCount: number): string => {
  if (pullRequestCount > 0) return "pullRequest";
  if (issueCount > 0) return "issue";
  if (codeReviewCount > 0) return "codeReview";
  return "";
};

export { calculateHeight, getFirstNonZeroBar };
