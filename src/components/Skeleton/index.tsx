import SkeletonCard from "./SkeletonCard";
import SkeletonContributorList from "./SkeletonContributorList";
import SkeletonCounter from "./SkeletonCounter";
import SkeletonEarnedRewards from "./SkeletonEarnedRewards";
import SkeletonFilters from "./SkeletonFilters";
import SkeletonHeader from "./SkeletonHeader";
import SkeletonInvoice from "./SkeletonInvoice";
import SkeletonOrganizationItem from "./SkeletonOrganizationItem";
import SkeletonProjectInsightProfilCard from "./SkeletonProjectInsightProfilCard";
import SkeletonProjectInsightProfilCardContent from "./SkeletonProjectInsightProfilCardContent";
import SkeletonProjectInsightTable from "./SkeletonProjectInsightTable";
import SkeletonProjectInsightTableContent from "./SkeletonProjectInsightTableContent";
import SkeletonProjectOverview from "./SkeletonProjectOverview";
import SkeletonProjectRemainingBudgets from "./SkeletonProjectRemainingBudgets";
import SkeletonProjectRewardForm from "./SkeletonProjectRewardForm";
import SkeletonProjectRewards from "./SkeletonProjectRewards";
import SkeletonProjectSidebar from "./SkeletonProjectSidebar";
import SkeletonQuickActions from "./SkeletonQuickActions";
import SkeletonRewardableItems from "./SkeletonRewardableItems";
import SkeletonRewards from "./SkeletonRewards";
import SkeletonRewardsList from "./SkeletonRewardsList";
import SkeletonSearch from "./SkeletonSearch";
import SkeletonSort from "./SkeletonSort";
import SkeletonSubmitProject from "./SkeletonSubmitProject";
import SkeletonTitle from "./SkeletonTitle";

export type SkeletonVariant =
  | "title"
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
  | "projectRemainingBudgets"
  | "submitProject"
  | "projectInsightProfilCard"
  | "projectInsightTable"
  | "projectInsightTableContent"
  | "projectInsightProfilCardContent";

interface SkeletonProps {
  variant: SkeletonVariant;
}

const VARIANT_COMPONENTS = {
  title: SkeletonTitle,
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
  submitProject: SkeletonSubmitProject,
  projectInsightProfilCard: SkeletonProjectInsightProfilCard,
  projectInsightTable: SkeletonProjectInsightTable,
  projectInsightTableContent: SkeletonProjectInsightTableContent,
  projectInsightProfilCardContent: SkeletonProjectInsightProfilCardContent,
};

export default function Skeleton({ variant }: SkeletonProps) {
  const Component = VARIANT_COMPONENTS[variant];
  return Component ? <Component /> : null;
}
