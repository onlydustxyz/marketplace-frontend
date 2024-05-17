import { usersApiClient } from "api-client/resources/users";

import { TMostActiveEcosystems } from "app/migration/u/[githubLogin]/features/profile-overview/components/most-active-ecosystems/most-active-ecosystems.types";
import { MostActiveSection } from "app/migration/u/[githubLogin]/features/profile-overview/components/most-active-section/most-active-section";

export async function MostActiveEcosystems({ githubUserId }: TMostActiveEcosystems.Props) {
  const ecosystems = await usersApiClient.fetch
    .getUserPublicEcosystems(githubUserId, {
      pageSize: 2,
      pageIndex: 0,
    })
    .request()
    .then(res =>
      res.ecosystems?.map(ecosystem => ({
        logoUrl: ecosystem.ecosystem.logoUrl,
        name: ecosystem.ecosystem.name,
        contributionCount: ecosystem.contributionCount,
        rewardCount: ecosystem.rewardCount,
        totalUsdEquivalent: ecosystem.totalEarnedUsd,
        status: ecosystem.contributingStatus,
      }))
    );

  if (!ecosystems?.length) return null;

  return (
    <div className="flex w-full md:w-1/3">
      <MostActiveSection
        icon={{
          remixName: "ri-global-line",
        }}
        title={{
          translate: {
            token: "v2.pages.publicProfile.header.ecosystems.title",
          },
        }}
        list={ecosystems}
        wrapperClassName="md:grid-cols-1 xl:grid-cols-2"
      />
    </div>
  );
}
