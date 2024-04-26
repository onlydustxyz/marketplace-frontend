import { eachDayOfInterval, eachWeekOfInterval, endOfWeek, isSameDay, startOfWeek, subWeeks } from "date-fns";
import { useEffect, useMemo, useState } from "react";

import { TActivityGraph } from "components/features/graphs/activity-graph/activity-graph.types";
import { getDayId } from "components/features/graphs/activity-graph/utils/getDayId";
import { getWeekId } from "components/features/graphs/activity-graph/utils/getWeekId";

const WEEK_NUMBER = 55;
const NUMBER_OF_ROW = 8;
export const useActivityGraph = ({ endDate }: TActivityGraph.UseActivityGraph) => {
  const [start, setStart] = useState(subWeeks(new Date(), WEEK_NUMBER));
  const [end, setEnd] = useState(new Date());
  const [weeks, setWeeks] = useState<TActivityGraph.Week[]>([]);

  useEffect(() => {
    if (endDate && !isSameDay(end, endDate)) {
      setEnd(endDate);
      setStart(subWeeks(new Date(), WEEK_NUMBER));
    }
  }, [endDate]);

  useEffect(() => {
    const eachWeek = eachWeekOfInterval({
      start,
      end,
    });

    setWeeks(
      eachWeek.map(week => {
        const startWeek = startOfWeek(week);
        const endWeek = endOfWeek(week);
        const eachDay = eachDayOfInterval({
          start: startWeek,
          end: endWeek,
        });

        return {
          id: getWeekId(week),
          startDate: startWeek,
          endDate: endWeek,
          days: eachDay.map(day => ({ date: day, id: getDayId(day) })),
        };
      })
    );
  }, [end, start]);

  const splitedWeeks = useMemo(() => {
    // 7 array of 8 weeks
    return weeks.reduce((acc, week, index) => {
      if (index % NUMBER_OF_ROW === 0) {
        acc.push([]);
      }
      acc[acc.length - 1].push(week);
      return acc;
    }, [] as TActivityGraph.Week[][]);
  }, [weeks]);

  return { splitedWeeks, weeks, start, end };
};
