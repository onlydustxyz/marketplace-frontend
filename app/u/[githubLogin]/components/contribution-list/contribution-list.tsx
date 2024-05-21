"use client";

import { usersApiClient } from "api-client/resources/users";

import { ContributionItem } from "app/u/[githubLogin]/components/contribution-item/contribution-item";
import { ContributionItemLoading } from "app/u/[githubLogin]/components/contribution-item/contribution-item.loading";
import { TContributionList } from "app/u/[githubLogin]/components/contribution-list/contribution-list.types";

import { IMAGES } from "src/assets/img";
import { ShowMore } from "src/components/Table/ShowMore";

import { EmptyState } from "components/layout/placeholders/empty-state/empty-state";

export function ContributionList({ githubUserId, languageId, ecosystemId }: TContributionList.Props) {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    usersApiClient.queries.useGetUserContributionsByGithubId(
      githubUserId,
      {
        ...(languageId ? { languages: [languageId] } : {}),
        ...(ecosystemId ? { ecosystems: [ecosystemId] } : {}),
        statuses: ["COMPLETED"],
        direction: "DESC",
      },
      {
        pageSize: "5",
        enabled: !!githubUserId && (!!languageId || !!ecosystemId),
      }
    );

  const flattenContributions = data?.pages.flatMap(({ contributions }) => contributions) ?? [];

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-4">
        <ContributionItemLoading />
        <ContributionItemLoading />
        <ContributionItemLoading />
      </div>
    );
  }

  if (!flattenContributions.length) {
    return (
      <EmptyState
        illustrationSrc={IMAGES.global.categories}
        title={{ token: "v2.pages.publicProfile.emptyStates.contributions.title" }}
        description={{ token: "v2.pages.publicProfile.emptyStates.contributions.description" }}
      />
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {flattenContributions.map(contribution => (
        <ContributionItem
          contribution={contribution}
          key={contribution.id}
          project={{
            name: contribution.project.name,
            slug: contribution.project.slug,
            logoUrl: contribution.project.logoUrl,
          }}
        />
      ))}
      {hasNextPage ? <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} isInfinite={false} /> : null}
    </div>
  );
}
