import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { isInArray } from "src/utils/isInArray";

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
  const [searchParams, setSearchParams] = useSearchParams();

  const tab = searchParams.get("tab") as typeof tabValues[number] | null;
  const [activeTab, setActiveTab] = useState(isInArray(tabValues, tab ?? "") ? tab : AllTabs.All);

  function isActiveTab(tab: AllTabs) {
    return activeTab === tab;
  }

  function updateActiveTab(tab: AllTabs) {
    setActiveTab(tab);
    setSearchParams({ tab });
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
