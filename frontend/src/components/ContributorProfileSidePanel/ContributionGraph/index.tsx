import { max, range } from "lodash";
import { Area, AreaChart, ReferenceLine, ResponsiveContainer, XAxis, YAxis } from "recharts";
import Dot from "./Dot";
import Label from "./Label";
import Tick from "./Tick";
import { ContributionCountFragment } from "src/__generated/graphql";

type Props = {
  entries: ContributionCountFragment[];
};

export default function ContributionGraph({ entries }: Props) {
  const maxCount = max(entries.map(e => e.count)) || 0;

  return (
    <ResponsiveContainer minWidth={200} height={200}>
      <AreaChart data={entries} margin={{ top: 30, right: 5, left: 5 }}>
        <defs>
          <linearGradient id="fillGradient" x1="0" y1="-1" x2="0" y2="1">
            <stop offset="00%" stopColor="#AE00FF" stopOpacity={1} />
            <stop offset="100%" stopColor="#AE00FF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          dataKey="count"
          stroke="#8B00CC"
          strokeWidth={2}
          fill="url(#fillGradient)"
          fillOpacity={0.8}
          dot={<Dot />}
          label={<Label />}
        />
        <YAxis scale="linear" width={0} domain={[0, maxCount + 1]} />
        <XAxis dataKey={formatDate} tickLine={false} tick={<Tick />} interval={0} opacity={0.08} stroke="#F3F0EE" />
        {range(1, maxCount + 2).map(y => (
          <ReferenceLine key={y} y={y} stroke="#F3F0EE" strokeOpacity={0.08} />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

const formatDate = (contributionCount: ContributionCountFragment) =>
  new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "short" }).format(dateFromWeek(contributionCount));

const dateFromWeek = ({ year, week }: ContributionCountFragment) => new Date(year, 0, 1 + 7 * (week - 1));
