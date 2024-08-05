import { usersApiClient } from "api-client/resources/users";

import { TMostActiveLanguages } from "app/(v1)/u/[githubLogin]/features/profile-overview/components/most-active-languages/most-active-languages.types";
import { MostActiveSection } from "app/(v1)/u/[githubLogin]/features/profile-overview/components/most-active-section/most-active-section";

export async function MostActiveLanguages({ githubUserId }: TMostActiveLanguages.Props) {
  const languages = await usersApiClient.fetch
    .getUserPublicLanguages({
      pathParams: { githubId: githubUserId },
      pagination: {
        pageSize: 4,
        pageIndex: 0,
      },
    })
    .request({
      next: { revalidate: 120 },
    })
    .then(res =>
      res.languages.map(language => ({
        logoUrl: language.language.logoUrl,
        name: language.language.name,
        contributionCount: language.contributionCount,
        rewardCount: language.rewardCount,
        totalUsdEquivalent: language.totalEarnedUsd,
        status: language.contributingStatus,
      }))
    );

  if (!languages.length) return null;

  return (
    <div className="flex w-full flex-1 pt-6 md:pt-10">
      <MostActiveSection
        icon={{
          remixName: "ri-code-s-slash-line",
        }}
        title={{
          translate: {
            token: "v2.pages.publicProfile.header.languages.title",
          },
        }}
        list={languages}
        wrapperClassName="xl:grid-cols-4"
      />
    </div>
  );
}
