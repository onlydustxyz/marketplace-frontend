import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { isInArray } from "src/utils/isInArray";

export enum AllTabs {
  All = "ALL_CONTRIBUTIONS",
  InProgress = "IN_PROGRESS",
  Completed = "COMPLETED",
  Cancelled = "CANCELLED",
}

const tabValues = Object.values(AllTabs);

export function useContributionTabs() {
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

  return {
    isActiveTab,
    updateActiveTab,
  };
}
