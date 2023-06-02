import Card from "src/components/Card";
import ContributionGraph from ".";
import { ContributionCountFragment } from "src/__generated/graphql";

export default {
  title: "ContributionGraph",
  component: ContributionGraph,
};

const entries: ContributionCountFragment[] = [
  { year: 2023, week: 14, paidCount: 0, unpaidCount: 2 },
  { year: 2023, week: 15, paidCount: 2, unpaidCount: 0 },
  { year: 2023, week: 16, paidCount: 1, unpaidCount: 1 },
  { year: 2023, week: 17, paidCount: 5, unpaidCount: 0 },
  { year: 2023, week: 18, paidCount: 3, unpaidCount: 0 },
  { year: 2023, week: 19, paidCount: 4, unpaidCount: 3 },
  { year: 2023, week: 20, paidCount: 1, unpaidCount: 0 },
  { year: 2023, week: 21, paidCount: 2, unpaidCount: 4 },
  { year: 2023, week: 22, paidCount: 5, unpaidCount: 1 },
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
