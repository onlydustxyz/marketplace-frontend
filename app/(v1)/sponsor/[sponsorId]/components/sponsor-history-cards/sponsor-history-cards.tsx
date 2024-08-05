import { useMemo } from "react";

import { SponsorHistoryCard } from "app/(v1)/sponsor/[sponsorId]/components/sponsor-history-card/sponsor-history-card";
import { useSponsorHistory } from "app/(v1)/sponsor/[sponsorId]/hooks/use-sponsor-history/use-sponsor-history";

import { IMAGES } from "src/assets/img";
import { ShowMore } from "src/components/Table/ShowMore";

import { Card } from "components/ds/card/card";
import { EmptyState } from "components/layout/placeholders/empty-state/empty-state";

export function SponsorHistoryCards() {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useSponsorHistory();

  const transactions = useMemo(() => data?.pages.flatMap(({ transactions }) => transactions) ?? [], [data]);

  if (isLoading) {
    return (
      <div className={"grid gap-3"}>
        {Array.from({ length: 3 }).map((_, i) => (
          <SponsorHistoryCard.Skeleton key={i} />
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <Card>
        <EmptyState
          illustrationSrc={IMAGES.icons.emptyState}
          description={{ token: "v2.pages.sponsor.history.empty" }}
        />
      </Card>
    );
  }

  return (
    <div className={"grid gap-3"}>
      {transactions.map(t => (
        <SponsorHistoryCard key={t.id} {...t} />
      ))}
      {hasNextPage ? <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} /> : null}
    </div>
  );
}
