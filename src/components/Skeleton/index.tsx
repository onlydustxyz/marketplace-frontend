import React from "react";
import SkeletonCard from "./SkeletonCard";
import SkeletonFilters from "./SkeletonFilters";
import SkeletonHeader from "./SkeletonHeader";
import SkeletonSearch from "./SkeletonSearch";
import SkeletonSort from "./SkeletonSort";
import SkeletonCounter from "./SkeletonCounter";
import SkeletonContributorList from "./SkeletonContributorList";
import SkeletonRewardsList from "./SkeletonRewardsList";

type SkeletonVariant =
  | "card"
  | "filters"
  | "header"
  | "search"
  | "sort"
  | "counter"
  | "contributorList"
  | "rewardsList";

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
  rewardsList: SkeletonRewardsList,
};

export default function Skeleton({ variant }: SkeletonProps) {
  const Component = VARIANT_COMPONENTS[variant];
  return Component ? <Component /> : null;
}
