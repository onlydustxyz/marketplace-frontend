"use client";

import { activityApiClient } from "api-client/resources/activity";
import { GetActivityItem } from "api-client/resources/activity/types";
import { useEffect, useRef, useState } from "react";

import { useRequestAnimationFrame } from "hooks/animations/use-request-animation-frame";

export enum ActivityAnimationState {
  Enter = "enter",
  Exit = "exit",
  Hidden = "hidden",
}

export interface ActivityItem extends GetActivityItem {
  state: ActivityAnimationState;
}
const MAX_ACTIVITY = 4;

export function useActivity() {
  const keys = useRef<string[]>([]);

  const stocks = useRef<ActivityItem[]>([]);

  const [activityItem, setActivityItem] = useState<ActivityItem[]>([]);

  const { data } = activityApiClient.queries.useGetPublicActivity({
    pagination: {
      pageSize: 10,
      pageIndex: 0,
    },
    options: {
      refetchInterval: () => 5000,
    },
  });

  function setInitialActivityItem(items: ActivityItem[]) {
    setActivityItem(items);
  }

  function createSlug(item: GetActivityItem) {
    return `${item.type}-${item.timestamp}`;
  }

  function addKeys(item: GetActivityItem[]) {
    keys.current = [...keys.current, ...item.map(i => createSlug(i))];
  }

  useEffect(() => {
    if (data) {
      const activities = data.activities.reverse();
      if (!activityItem?.length) {
        const initial = activities.slice(0, MAX_ACTIVITY);
        const stock = activities.slice(MAX_ACTIVITY);
        setInitialActivityItem(initial.reverse().map(p => ({ ...p, state: ActivityAnimationState.Enter })));
        stocks.current = stock.map(p => ({ ...p, state: ActivityAnimationState.Enter }));
        addKeys([...initial, ...stock]);
      } else {
        const newActivities = activities.filter(a => !keys.current.includes(createSlug(a)));
        addKeys(newActivities);
        stocks.current = [
          ...stocks.current,
          ...newActivities.map(p => ({ ...p, state: ActivityAnimationState.Enter })),
        ];
      }
    }
  }, [data]);

  const addActivityItem = () => {
    const newActivityItem = stocks.current.shift();
    if (newActivityItem) {
      setActivityItem(prev => {
        const newActivity = [...prev.map(p => ({ ...p, state: ActivityAnimationState.Enter })).slice(0, MAX_ACTIVITY)];
        newActivity.unshift(newActivityItem);
        newActivity[MAX_ACTIVITY].state = ActivityAnimationState.Exit;
        return newActivity;
      });
    }
  };

  useRequestAnimationFrame(addActivityItem, 5000);

  return {
    items: activityItem,
  };
}
