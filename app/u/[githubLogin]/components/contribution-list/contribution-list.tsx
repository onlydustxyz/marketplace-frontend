"use client";

import { usersApiClient } from "api-client/resources/users";

import { ContributionItem } from "app/u/[githubLogin]/components/contribution-item/contribution-item";
import { ContributionItemLoading } from "app/u/[githubLogin]/components/contribution-item/contribution-item.loading";
import { TContributionList } from "app/u/[githubLogin]/components/contribution-list/contribution-list.types";

import { ShowMore } from "src/components/Table/ShowMore";

export function ContributionList({ githubUserId, languageId, ecosystemId }: TContributionList.Props) {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    usersApiClient.queries.useGetUserContributionsByGithubId(
      githubUserId,
      { ...(languageId ? { languages: [languageId] } : {}), ...(ecosystemId ? { ecosystems: [ecosystemId] } : {}) },
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
