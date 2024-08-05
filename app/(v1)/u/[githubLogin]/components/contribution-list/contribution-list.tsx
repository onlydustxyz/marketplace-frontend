"use client";

import { usersApiClient } from "api-client/resources/users";

import { ContributionItem } from "app/(v1)/u/[githubLogin]/components/contribution-item/contribution-item";
import { ContributionItemLoading } from "app/(v1)/u/[githubLogin]/components/contribution-item/contribution-item.loading";
import { TContributionList } from "app/(v1)/u/[githubLogin]/components/contribution-list/contribution-list.types";

import { IMAGES } from "src/assets/img";
import { ShowMore } from "src/components/Table/ShowMore";

import { EmptyState } from "components/layout/placeholders/empty-state/empty-state";

export function ContributionList({ githubUserId, languageId, ecosystemId }: TContributionList.Props) {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    usersApiClient.queries.useGetUserContributionsByGithubId({
      pathParams: {
        githubId: githubUserId,
      },
      queryParams: {
        ...(languageId ? { languages: [languageId] } : {}),
        ...(ecosystemId ? { ecosystems: [ecosystemId] } : {}),
        statuses: ["COMPLETED"],
        direction: "DESC",
      },
      options: {
        enabled: !!githubUserId && (!!languageId || !!ecosystemId),
      },
      pagination: { pageSize: 5 },
    });

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
        title={{ token: "v2.pages.publicProfile.contributions.empty.title" }}
        description={{ token: "v2.pages.publicProfile.contributions.empty.description" }}
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
