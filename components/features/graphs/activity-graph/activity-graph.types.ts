import { ReactNode } from "react";

import { TIcon } from "components/layout/icon/icon.types";

export namespace TActivityGraph {
  export type level = 1 | 2 | 3 | 4;
  export interface WeekData<T> {
    level: level;
    tooltipContent?: ReactNode;
    icon?: TIcon.Props;
    data?: T;
  }
  export interface Day {
    date: Date;
    id: string;
  }

  export type getWeekId = (date: Date) => string;
  export type weekDataFunction = { getWeekId: getWeekId };
  export type weeksData<T> = { [key: string]: WeekData<T> };
  export interface Week {
    id: string;
    startDate: Date;
    endDate: Date;
    days: Day[];
  }
  export interface Props<T> {
    endDate?: Date;
    weekData?: (props: { getWeekId: getWeekId }) => weeksData<T>;
  }

  export interface UseActivityGraph {
    endDate?: Date;
  }
}
