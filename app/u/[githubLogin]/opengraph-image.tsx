import { usersApiClient } from "api-client/resources/users";

import { TActivityGraph } from "components/features/graphs/activity-graph/activity-graph.types";
import { getDateFromWeekNumber } from "components/features/graphs/activity-graph/utils/getDateFromWeekNumber";
import { getLevelFromCount } from "components/features/graphs/activity-graph/utils/getLevelFromCount";
import { getLevelRange } from "components/features/graphs/activity-graph/utils/getLevelRange";
import { getWeekId } from "components/features/graphs/activity-graph/utils/getWeekId";
import { Generator } from "components/features/seo/image-metadata/commons/generator/generator";
import { GenericImageMetadata } from "components/features/seo/image-metadata/generic/image-metadata";
import { PublicProfileImageMetadata } from "components/features/seo/image-metadata/public-profile/image-metadata";
import { TPublicProfileImageMetadata } from "components/features/seo/image-metadata/public-profile/image-metadata.types";

export default async function Image(props: { params: { githubLogin: string } }) {
  try {
    const user = await usersApiClient.fetch
      .getUserPublicProfileByGithubLogin(props.params.githubLogin)
      .request({ next: { revalidate: 86400 } });
    const githubUserId = user?.githubUserId || 0;
    const [stats, languages, ecosystems] = await Promise.all([
      usersApiClient.fetch
        .getUserPublicStats(githubUserId)
        .request({ next: { revalidate: 86400 } })
        .then(res => res)
        .catch(e => {
          console.error(e);
          return null;
        }),
      usersApiClient.fetch
        .getUserPublicLanguages({
          pathParams: { githubId: githubUserId },
          pagination: {
            pageSize: 2,
            pageIndex: 0,
          },
        })
        .request({ next: { revalidate: 86400 } })
        .then(res => res)
        .catch(e => {
          console.error(e);
          return null;
        }),

      usersApiClient.fetch
        .getUserPublicEcosystems({
          pathParams: { githubId: githubUserId },
          pagination: {
            pageSize: 2,
            pageIndex: 0,
          },
        })
        .request({ next: { revalidate: 86400 } })
        .then(res => res)
        .catch(e => {
          console.error(e);
          return null;
        }),
    ]);

    const ecosystem = ecosystems?.ecosystems?.[0];
    const language = languages?.languages?.[0];

    const createData = () => {
      const data: {
        [key: string]: {
          level: TActivityGraph.level;
          reward?: boolean;
        };
      } = {};

      const levelRange = getLevelRange(
        stats?.activity?.map(activity => activity.issueCount + activity.codeReviewCount + activity.pullRequestCount) ||
          []
      );

      stats?.activity?.forEach(activity => {
        data[getWeekId(getDateFromWeekNumber(activity.year, activity.week))] = {
          level: getLevelFromCount(
            levelRange,
            activity.issueCount + activity.codeReviewCount + activity.pullRequestCount
          ),
          reward: activity.rewardCount > 0,
        };
      });
      return data;
    };

    const data = createData();

    return Generator({
      children: (
        <PublicProfileImageMetadata
          login={user.login}
          image={user.avatarUrl}
          contributionCount={user.statsSummary?.contributionCount || 0}
          rewardsCount={user.statsSummary?.rewardCount || 0}
          title={
            user.statsSummary?.rankCategory
              ? TPublicProfileImageMetadata.rankCategoryTranslationMapping[user.statsSummary?.rankCategory]
              : ""
          }
          rank={user.statsSummary?.rank || 0}
          rankPercentile={user.statsSummary?.rankPercentile || 0}
          {...(ecosystem
            ? {
                topEcosystem: {
                  name: ecosystem.ecosystem.name,
                  image: ecosystem.ecosystem.logoUrl,
                },
              }
            : {})}
          {...(language
            ? {
                topLanguages: {
                  name: language.language.name,
                  image: language.language.logoUrl,
                },
              }
            : {})}
          data={data}
        />
      ),
    });
  } catch {
    return Generator({
      children: <GenericImageMetadata />,
    });
  }
}
