import { max, range } from "lodash";
import { Area, AreaChart, ReferenceLine, XAxis } from "recharts";
import Dot from "./Dot";
import Label from "./Label";
import Tick from "./Tick";

export type Entry = {
  year: number;
  week: number;
  count: number;
};

type Props = {
  entries: Entry[];
};

export default function View({ entries }: Props) {
  return (
    <AreaChart data={entries} width={500} height={200}>
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
      <XAxis dataKey={formatDate} tickLine={false} tick={<Tick />} interval={0} opacity={0.08} stroke="#F3F0EE" />
      {range(1, (max(entries.map(e => e.count)) || 0) + 2).map(y => (
        <ReferenceLine key={y} y={y} stroke="#F3F0EE" strokeOpacity={0.08} />
      ))}
    </AreaChart>
  );
}

const formatDate = ({ year, week }: Entry) =>
  new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "short" }).format(new Date(year, 0, 1 + 7 * (week - 1)));
