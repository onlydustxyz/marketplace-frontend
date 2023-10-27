import { Bar, BarChart, Legend, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import XTick from "./XTick";
import CustomBar from "./Bar";
import CustomTooltip from "./Tootip";
import CustomLegend from "./Legend";
import { useIntl } from "src/hooks/useIntl";
import YTick from "./YTick";
import { useMemo, useState } from "react";
import { components } from "src/__generated/api";
import { chain, max, round, find, range, slice, sortBy, unionBy } from "lodash";
import { daysFromNow, weekNumber } from "src/utils/date";

type ContributionCount = components["schemas"]["UserContributionStats"];

type Props = {
  entries: ContributionCount[];
};

const MAX_CONTRIBUTION_COUNTS = 13;

const EMPTY_DATA: ContributionCount[] = range(0, MAX_CONTRIBUTION_COUNTS)
  .map(c => daysFromNow(7 * c))
  .map(date => ({
    year: date.getFullYear(),
    week: weekNumber(date),
    codeReviewCount: 0,
    issueCount: 0,
    pullRequestCount: 0,
  }));

export default function ContributionGraph({ entries }: Props) {
  const { T } = useIntl();

  const entriesFormated = useMemo(() => {
    return chain([...entries])
      .unionWith(EMPTY_DATA, (e1, e2) => e1.year === e2.year && e1.week === e2.week)
      .sortBy(["year", "week"])
      .reverse()
      .take(MAX_CONTRIBUTION_COUNTS)
      .reverse()
      .value();
  }, [entries]);

  const maxCount =
    max(entriesFormated.map(e => (e.codeReviewCount || 0) + (e.issueCount || 0) + (e.pullRequestCount || 0))) || 0;
  const tickStep = maxCount <= 5 ? 1 : maxCount <= 10 ? 2 : maxCount <= 20 ? 5 : 10;
  const ticks = range(0, round(maxCount / tickStep) + 1).map(t => t * tickStep);
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number>();

  return (
    <ResponsiveContainer minWidth={200} height={200}>
      <BarChart data={entriesFormated} margin={{ top: 30, right: 5, left: 5 }} barSize={16}>
        <Bar
          name={T("contributionGraph.pullRequests")}
          dataKey="pullRequestCount"
          fill="#CE66FF"
          opacity={0.7}
          stackId={1}
          shape={<CustomBar hoveredBarIndex={hoveredBarIndex} type="PullRequests" />}
          onMouseEnter={(_, index) => setHoveredBarIndex(index)}
          onMouseLeave={() => setHoveredBarIndex(undefined)}
        />
        <Bar
          name={T("contributionGraph.issues")}
          dataKey="issueCount"
          fill="#FFBC66"
          opacity={0.7}
          stackId={1}
          shape={<CustomBar hoveredBarIndex={hoveredBarIndex} type="Issues" />}
          onMouseEnter={(_, index) => setHoveredBarIndex(index)}
          onMouseLeave={() => setHoveredBarIndex(undefined)}
        />
        <Bar
          name={T("contributionGraph.codeReviews")}
          dataKey="codeReviewCount"
          fill="#666BD7"
          opacity={0.7}
          stackId={1}
          shape={<CustomBar hoveredBarIndex={hoveredBarIndex} type="CodeReviews" />}
          onMouseEnter={(_, index) => setHoveredBarIndex(index)}
          onMouseLeave={() => setHoveredBarIndex(undefined)}
        />
        <Tooltip
          isAnimationActive={false}
          cursor={false}
          content={<CustomTooltip hoveredBarIndex={hoveredBarIndex} />}
        />
        <Legend content={<CustomLegend />} />
        <YAxis
          scale="linear"
          width={8}
          axisLine={false}
          ticks={ticks}
          tick={<YTick />}
          interval={1}
          tickLine={{ stroke: "#F3F0EE", opacity: 0.08 }}
          tickSize={10}
        />
        <XAxis
          dataKey={formatDate}
          tickLine={false}
          tick={<XTick count={entriesFormated.length} />}
          interval={0}
          opacity={0.08}
          stroke="#F3F0EE"
        />
        {ticks.map(y => (
          <ReferenceLine key={y} y={y} stroke="#F3F0EE" strokeOpacity={0.08} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export const formatDate = (contributionCount: ContributionCount) => {
  return new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short" }).format(dateFromWeek(contributionCount));
};

const dateFromWeek = ({ year, week }: ContributionCount) => new Date(year, 0, 1 + 7 * (week - 1));
