"use client";

import { isSameDay } from "date-fns";
import { useEffect, useMemo, useState } from "react";

import { TActivityGraph } from "components/features/graphs/activity-graph/activity-graph.types";
import { createEndDate } from "components/features/graphs/activity-graph/utils/createEndDate";
import { createStartDate } from "components/features/graphs/activity-graph/utils/createStartDate";
import { createWeeks } from "components/features/graphs/activity-graph/utils/createWeeks";
import { splitWeeksIntoSubArray } from "components/features/graphs/activity-graph/utils/splitWeeks";

export const ACTIVITY_WEEK_NUMBER = 54;
export const ACTIVITY_NUMBER_OF_ROW = 8;
export const useActivityGraph = ({ endDate }: TActivityGraph.UseActivityGraph) => {
  const [start, setStart] = useState(createStartDate());
  const [end, setEnd] = useState(createEndDate());
  const [weeks, setWeeks] = useState<TActivityGraph.Week[]>([]);

  useEffect(() => {
    if (endDate && !isSameDay(end, endDate)) {
      setEnd(createEndDate(endDate));
      setStart(createStartDate(endDate));
    }
  }, [endDate]);

  useEffect(() => {
    setWeeks(createWeeks({ start, end }));
  }, [end, start]);

  const splitWeeks = useMemo(() => {
    // 7 array of 8 weeks
    return splitWeeksIntoSubArray({ weeks });
  }, [weeks]);

  return { splitWeeks, weeks, start, end };
};
