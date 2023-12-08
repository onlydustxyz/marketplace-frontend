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
import SkeletonRewardableItems from "./SkeletonRewardableItems";
import SkeletonQuickActions from "./SkeletonQuickActions";
import SkeletonProjectSidebar from "./SkeletonProjectSidebar";
import SkeletonProjectOverview from "./SkeletonProjectOverview";
import SkeletonProjectRewards from "./SkeletonProjectRewards";
import SkeletonProjectRewardForm from "./SkeletonProjectRewardForm";
import SkeletonProjectRemainingBudgets from "./SkeletonProjectRemainingBudgets";

type SkeletonVariant =
  | "card"
  | "filters"
  | "header"
  | "search"
  | "sort"
  | "counter"
  | "contributorList"
  | "rewards"
  | "rewardableItems"
  | "earnedRewards"
  | "rewardsList"
  | "invoice"
  | "organizationItem"
  | "quickActions"
  | "projectSidebar"
  | "projectOverview"
  | "projectRewards"
  | "projectRewardForm"
  | "projectRemainingBudgets";

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
  rewardableItems: SkeletonRewardableItems,
  earnedRewards: SkeletonEarnedRewards,
  rewardsList: SkeletonRewardsList,
  invoice: SkeletonInvoice,
  organizationItem: SkeletonOrganizationItem,
  quickActions: SkeletonQuickActions,
  projectSidebar: SkeletonProjectSidebar,
  projectOverview: SkeletonProjectOverview,
  projectRewards: SkeletonProjectRewards,
  projectRewardForm: SkeletonProjectRewardForm,
  projectRemainingBudgets: SkeletonProjectRemainingBudgets,
};

export default function Skeleton({ variant }: SkeletonProps) {
  const Component = VARIANT_COMPONENTS[variant];
  return Component ? <Component /> : null;
}
