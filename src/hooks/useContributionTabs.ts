import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { isInArray } from "src/utils/isInArray";

import { useUpdateSearchParams } from "hooks/router/useUpdateSearchParams";

import { useIntl } from "./useIntl";

export enum AllTabs {
  All = "ALL_CONTRIBUTIONS",
  InProgress = "IN_PROGRESS",
  Completed = "COMPLETED",
  Cancelled = "CANCELLED",
}

const tabValues = Object.values(AllTabs);

export function useContributionTabs() {
  const { T } = useIntl();
  const searchParams = useSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  const tab = searchParams.get("tab") as typeof tabValues[number] | null;
  const [activeTab, setActiveTab] = useState(isInArray(tabValues, tab ?? "") ? tab : AllTabs.All);

  function isActiveTab(tab: AllTabs) {
    return activeTab === tab;
  }

  function updateActiveTab(tab: AllTabs) {
    setActiveTab(tab);
    updateSearchParams("tab", tab);
  }

  function getActiveTab() {
    const tabNames = {
      [AllTabs.All]: T("contributions.nav.allContributions").toLowerCase(),
      [AllTabs.InProgress]: T("contributions.inProgress.title").toLowerCase(),
      [AllTabs.Completed]: T("contributions.completed.title").toLowerCase(),
      [AllTabs.Cancelled]: T("contributions.canceled.title").toLowerCase(),
    };

    return tabNames[activeTab ?? AllTabs.All];
  }

  return {
    activeTab: getActiveTab(),
    isActiveTab,
    updateActiveTab,
  };
}
