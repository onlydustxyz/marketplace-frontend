import { max, range } from "lodash";
import { Area, AreaChart, Legend, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Dot from "./Dot";
import Label from "./Label";
import Tick from "./Tick";
import { ContributionCountFragment } from "src/__generated/graphql";
import CustomTooltip from "./Tootip";
import CustomLegend from "./Legend";
import { useIntl } from "src/hooks/useIntl";

type Props = {
  entries: ContributionCountFragment[];
};

export enum Color {
  Primary = "#AE00FF",
  Secondary = "#06B6D4",
}

export default function ContributionGraph({ entries }: Props) {
  const { T } = useIntl();

  const maxCount = max(entries.map(e => e.paidCount + e.unpaidCount)) || 0;

  return (
    <ResponsiveContainer minWidth={200} height={200}>
      <AreaChart data={entries} margin={{ top: 30, right: 5, left: 5 }}>
        <defs>
          <linearGradient id="fillGradientPrimary" x1="0" y1="-1" x2="0" y2="1">
            <stop offset="0%" stopColor={Color.Primary} stopOpacity={1} />
            <stop offset="100%" stopColor={Color.Primary} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="fillGradientSecondary" x1="0" y1="-1" x2="0" y2="1">
            <stop offset="0%" stopColor={Color.Secondary} stopOpacity={1} />
            <stop offset="100%" stopColor={Color.Secondary} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          name={T("contributionGraph.unpaid")}
          dataKey="unpaidCount"
          stroke={Color.Secondary}
          strokeWidth={2}
          fill="url(#fillGradientSecondary)"
          fillOpacity={0.8}
          dot={<Dot color={Color.Secondary} />}
          stackId={1}
        />
        <Area
          name={T("contributionGraph.paid")}
          dataKey="paidCount"
          stroke="#8B00CC"
          strokeWidth={2}
          fill="url(#fillGradientPrimary)"
          fillOpacity={0.8}
          dot={<Dot />}
          label={<Label />}
          stackId={1}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
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
