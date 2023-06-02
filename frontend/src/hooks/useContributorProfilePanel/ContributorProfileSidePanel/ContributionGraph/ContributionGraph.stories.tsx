import Card from "src/components/Card";
import ContributionGraph, { ContributionCount } from ".";

export default {
  title: "ContributionGraph",
  component: ContributionGraph,
};

const entries: ContributionCount[] = [
  { year: 2023, week: 14, count: 0, unpaidCount: 2 },
  { year: 2023, week: 15, count: 2, unpaidCount: 0 },
  { year: 2023, week: 16, count: 1, unpaidCount: 1 },
  { year: 2023, week: 17, count: 5, unpaidCount: 0 },
  { year: 2023, week: 18, count: 3, unpaidCount: 0 },
  { year: 2023, week: 19, count: 4, unpaidCount: 3 },
  { year: 2023, week: 20, count: 1, unpaidCount: 0 },
  { year: 2023, week: 21, count: 2, unpaidCount: 4 },
  { year: 2023, week: 22, count: 5, unpaidCount: 1 },
];

export const Default = {
  render: () => (
    <Card padded={false} fullWidth={false} className="w-116">
      <div className="px-4 bg-noise-light rounded-xl w-116">
        <ContributionGraph entries={entries} />
      </div>
    </Card>
  ),
  parameters: {
    chromatic: { delay: 1500 },
  },
};
