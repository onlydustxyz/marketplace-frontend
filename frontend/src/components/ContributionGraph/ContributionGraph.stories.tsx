import Card from "src/components/Card";
import ContributionGraph, { Entry } from "./View";

export default {
  title: "ContributionGraph",
  component: ContributionGraph,
};

const entries: Entry[] = [
  { year: 2023, week: 14, count: 0 },
  { year: 2023, week: 15, count: 2 },
  { year: 2023, week: 16, count: 1 },
  { year: 2023, week: 17, count: 5 },
  { year: 2023, week: 18, count: 3 },
  { year: 2023, week: 19, count: 4 },
  { year: 2023, week: 20, count: 1 },
  { year: 2023, week: 21, count: 2 },
  { year: 2023, week: 22, count: 5 },
];

export const Default = {
  render: () => (
    <Card padded={false} fullWidth={false} className="w-fit">
      <div className="px-4 bg-noise-light rounded-xl w-fit">
        <ContributionGraph entries={entries} />
      </div>
    </Card>
  ),
};
