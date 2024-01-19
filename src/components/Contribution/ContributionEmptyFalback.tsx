import { useRef } from "react";
import { ContributionsFilterRef } from "../../_pages/Contributions/Filter.tsx";
import { ProjectContributionsFilterRef } from "../../_pages/ProjectDetails/Contributions/Filter.tsx";
import { IMAGES } from "src/assets/img";
import { EmptyState } from "components/layout/placeholders/empty-state.tsx";
import { Card } from "components/ds/card/card.tsx";

interface ContributionEmptyFallBackParams {
  isMobile?: boolean;
  hasActiveFilters?: boolean;
  nbColumns?: number;
  activeTab?: string;
  filterRef: ReturnType<typeof useRef<ContributionsFilterRef | ProjectContributionsFilterRef | null>>;
}

export function ContributionEmptyFallBack({
  isMobile = false,
  hasActiveFilters = false,
  nbColumns = 1,
  activeTab,
  filterRef,
}: ContributionEmptyFallBackParams) {
  const descriptionToken = hasActiveFilters
    ? "contributions.table.emptyFilteredDescription"
    : "contributions.table.emptyDescription";
  const descriptionParams = !hasActiveFilters ? { tab: activeTab ?? "" } : undefined;
  const actionProps = hasActiveFilters
    ? {
        actionLabel: { token: "contributions.table.emptyButtonLabel" },
        onAction: filterRef.current?.reset,
      }
    : {};

  const emptyStateProps = {
    illustrationSrc: IMAGES.global.categories,
    title: { token: "contributions.table.emptyTitle" },
    description: { token: descriptionToken, params: descriptionParams },
    ...actionProps,
  };

  const EmptyStateComponent = <EmptyState {...emptyStateProps} />;

  if (isMobile) {
    return <Card className="bg-card-background-base">{EmptyStateComponent}</Card>;
  }

  return (
    <tr>
      <td colSpan={nbColumns}>{EmptyStateComponent}</td>
    </tr>
  );
}
