import Card from "src/components/Card";
import ContributionGraph from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/ReadOnlyView/ContributionGraph";
import { ContributionCountFragment } from "src/__generated/graphql";

export default {
  title: "ContributionGraph",
  component: ContributionGraph,
};

const entries: ContributionCountFragment[] = [
  { year: 2023, week: 10, pullRequestCount: 16, issueCount: 6, codeReviewCount: 3 },
  { year: 2023, week: 11, pullRequestCount: 21, issueCount: 0, codeReviewCount: 3 },
  { year: 2023, week: 12, pullRequestCount: 18, issueCount: 4, codeReviewCount: 3 },
  { year: 2023, week: 13, pullRequestCount: 22, issueCount: 0, codeReviewCount: 3 },
  { year: 2023, week: 14, pullRequestCount: 21, issueCount: 9, codeReviewCount: 3 },
  { year: 2023, week: 15, pullRequestCount: 2, issueCount: 1, codeReviewCount: 3 },
  { year: 2023, week: 16, pullRequestCount: 32, issueCount: 1, codeReviewCount: 34 },
  { year: 2023, week: 17, pullRequestCount: 12, issueCount: 0, codeReviewCount: 3 },
  { year: 2023, week: 18, pullRequestCount: 22, issueCount: 3, codeReviewCount: 3 },
  { year: 2023, week: 19, pullRequestCount: 22, issueCount: 6, codeReviewCount: 3 },
  { year: 2023, week: 20, pullRequestCount: 22, issueCount: 1, codeReviewCount: 38 },
  { year: 2023, week: 21, pullRequestCount: 7, issueCount: 3, codeReviewCount: 37 },
  { year: 2023, week: 22, pullRequestCount: 0, issueCount: 3, codeReviewCount: 37 },
];

export const Default = {
  render: () => (
    <Card padded={false} fullWidth={false} className="m-20 w-fit">
      <div className="rounded-xl bg-noise-light px-4" style={{ width: 526 }}>
        <ContributionGraph entries={entries} />
      </div>
    </Card>
  ),
  parameters: {
    chromatic: { delay: 1500 },
  },
};

const fewEntries: ContributionCountFragment[] = [
  { year: 2023, week: 10, pullRequestCount: 16, issueCount: 6, codeReviewCount: 3 },
  { year: 2023, week: 11, pullRequestCount: 0, issueCount: 0, codeReviewCount: 3 },
  { year: 2023, week: 12, pullRequestCount: 0, issueCount: 0, codeReviewCount: 3 },
  { year: 2023, week: 13, pullRequestCount: 0, issueCount: 0, codeReviewCount: 3 },
  { year: 2023, week: 14, pullRequestCount: 0, issueCount: 0, codeReviewCount: 3 },
  { year: 2023, week: 15, pullRequestCount: 2, issueCount: 1, codeReviewCount: 3 },
  { year: 2023, week: 16, pullRequestCount: 0, issueCount: 0, codeReviewCount: 3 },
  { year: 2023, week: 17, pullRequestCount: 0, issueCount: 0, codeReviewCount: 3 },
  { year: 2023, week: 18, pullRequestCount: 0, issueCount: 3, codeReviewCount: 3 },
  { year: 2023, week: 19, pullRequestCount: 2, issueCount: 0, codeReviewCount: 3 },
  { year: 2023, week: 20, pullRequestCount: 0, issueCount: 0, codeReviewCount: 3 },
  { year: 2023, week: 21, pullRequestCount: 0, issueCount: 5, codeReviewCount: 3 },
  { year: 2023, week: 22, pullRequestCount: 0, issueCount: 0, codeReviewCount: 3 },
];

export const FewData = {
  render: () => (
    <Card padded={false} fullWidth={false} className="m-20 w-fit">
      <div className="rounded-xl bg-noise-light px-4" style={{ width: 526 }}>
        <ContributionGraph entries={fewEntries} />
      </div>
    </Card>
  ),
  parameters: {
    chromatic: { delay: 1500 },
  },
};
