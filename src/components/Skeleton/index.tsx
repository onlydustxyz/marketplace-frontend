import React from "react";
import SkeletonCard from "./SkeletonCard";
import SkeletonFilters from "./SkeletonFilters";
import SkeletonHeader from "./SkeletonHeader";
import SkeletonSearch from "./SkeletonSearch";
import SkeletonSort from "./SkeletonSort";
import SkeletonCounter from "./SkeletonCounter";
import SkeletonContributorList from "./SkeletonContributorList";
import SkeletonRewards from "./SkeletonRewards";
import SkeletonEarnedRewards from "./SkeletonEarnedRewards";
import SkeletonRewardsList from "./SkeletonRewardsList";
import SkeletonInvoice from "./SkeletonInvoice";
import SkeletonOrganizationItem from "./SkeletonOrganizationItem";

type SkeletonVariant =
  | "card"
  | "filters"
  | "header"
  | "search"
  | "sort"
  | "counter"
  | "contributorList"
  | "rewards"
  | "earnedRewards"
  | "rewardsList"
  | "invoice"
  | "organizationItem";

interface SkeletonProps {
  variant: SkeletonVariant;
}

const VARIANT_COMPONENTS = {
  card: SkeletonCard,
  filters: SkeletonFilters,
  header: SkeletonHeader,
  search: SkeletonSearch,
  sort: SkeletonSort,
  counter: SkeletonCounter,
  contributorList: SkeletonContributorList,
  rewards: SkeletonRewards,
  earnedRewards: SkeletonEarnedRewards,
  rewardsList: SkeletonRewardsList,
  invoice: SkeletonInvoice,
  organizationItem: SkeletonOrganizationItem,
};

export default function Skeleton({ variant }: SkeletonProps) {
  const Component = VARIANT_COMPONENTS[variant];
  return Component ? <Component /> : null;
}
