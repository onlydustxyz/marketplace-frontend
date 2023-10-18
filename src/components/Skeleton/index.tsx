import React from "react";
import SkeletonCard from "./SkeletonCard";
import SkeletonFilters from "./SkeletonFilters";
import SkeletonHeader from "./SkeletonHeader";
import SkeletonSearch from "./SkeletonSearch";
import SkeletonSort from "./SkeletonSort";

type SkeletonVariant = "card" | "filters" | "header" | "search" | "sort";

interface SkeletonProps {
  variant: SkeletonVariant;
}

export default function Skeleton({ variant }: SkeletonProps) {
  switch (variant) {
    case "card":
      return <SkeletonCard />;
    case "filters":
      return <SkeletonFilters />;
    case "header":
      return <SkeletonHeader />;
    case "search":
      return <SkeletonSearch />;
    case "sort":
      return <SkeletonSort />;
    default:
      return null;
  }
}
