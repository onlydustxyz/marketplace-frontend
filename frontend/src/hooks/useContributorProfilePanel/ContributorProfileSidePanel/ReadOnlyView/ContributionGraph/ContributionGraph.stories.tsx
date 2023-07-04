import Card from "src/components/Card";
import ContributionGraph from ".";
import { ContributionCountFragment } from "src/__generated/graphql";

export default {
  title: "ContributionGraph",
  component: ContributionGraph,
};

const entries: ContributionCountFragment[] = [
  { year: 2023, week: 10, paidCount: 16, unpaidCount: 6 },
  { year: 2023, week: 11, paidCount: 21, unpaidCount: 0 },
  { year: 2023, week: 12, paidCount: 18, unpaidCount: 4 },
  { year: 2023, week: 13, paidCount: 22, unpaidCount: 0 },
  { year: 2023, week: 14, paidCount: 21, unpaidCount: 9 },
  { year: 2023, week: 15, paidCount: 2, unpaidCount: 1 },
  { year: 2023, week: 16, paidCount: 32, unpaidCount: 14 },
  { year: 2023, week: 17, paidCount: 12, unpaidCount: 0 },
  { year: 2023, week: 18, paidCount: 22, unpaidCount: 3 },
  { year: 2023, week: 19, paidCount: 22, unpaidCount: 6 },
  { year: 2023, week: 20, paidCount: 22, unpaidCount: 18 },
  { year: 2023, week: 21, paidCount: 7, unpaidCount: 37 },
  { year: 2023, week: 22, paidCount: 0, unpaidCount: 37 },
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
  { year: 2023, week: 10, paidCount: 16, unpaidCount: 6 },
  { year: 2023, week: 11, paidCount: 0, unpaidCount: 0 },
  { year: 2023, week: 12, paidCount: 0, unpaidCount: 0 },
  { year: 2023, week: 13, paidCount: 0, unpaidCount: 0 },
  { year: 2023, week: 14, paidCount: 0, unpaidCount: 0 },
  { year: 2023, week: 15, paidCount: 2, unpaidCount: 1 },
  { year: 2023, week: 16, paidCount: 0, unpaidCount: 0 },
  { year: 2023, week: 17, paidCount: 0, unpaidCount: 0 },
  { year: 2023, week: 18, paidCount: 0, unpaidCount: 3 },
  { year: 2023, week: 19, paidCount: 2, unpaidCount: 0 },
  { year: 2023, week: 20, paidCount: 0, unpaidCount: 0 },
  { year: 2023, week: 21, paidCount: 0, unpaidCount: 5 },
  { year: 2023, week: 22, paidCount: 0, unpaidCount: 0 },
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
