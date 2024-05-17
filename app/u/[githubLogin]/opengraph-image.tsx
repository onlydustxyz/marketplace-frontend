import { usersApiClient } from "api-client/resources/users";

import { TActivityGraph } from "components/features/graphs/activity-graph/activity-graph.types";
import { getDateFromWeekNumber } from "components/features/graphs/activity-graph/utils/getDateFromWeekNumber";
import { getLevelFromCount } from "components/features/graphs/activity-graph/utils/getLevelFromCount";
import { getLevelRange } from "components/features/graphs/activity-graph/utils/getLevelRange";
import { getWeekId } from "components/features/graphs/activity-graph/utils/getWeekId";
import { Generator } from "components/features/seo/image-metadata/commons/generator/generator";
import { GenericImageMetadata } from "components/features/seo/image-metadata/generic/image-metadata";
import { PublicProfileImageMetadata } from "components/features/seo/image-metadata/public-profile/image-metadata";

export default async function Image(props: { params: { githubLogin: string } }) {
  try {
    const user = await usersApiClient.fetch.getUserPublicProfileByGithubLogin(props.params.githubLogin).request();
    const githubUserId = user?.githubUserId || 0;

    const stats = await usersApiClient.fetch.getUserPublicStats(githubUserId).request();

    const languages = await usersApiClient.fetch
      .getUserPublicLanguages(githubUserId, { pageSize: 1, pageIndex: 0 })
      .request();

    const ecosystems = await usersApiClient.fetch
      .getUserPublicEcosystems(githubUserId, { pageSize: 1, pageIndex: 0 })
      .request();

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

    return Generator({
      children: (
        <PublicProfileImageMetadata
          login={user.login}
          image={user.avatarUrl}
          contributionCount={user.statsSummary?.contributionCount || 0}
          rewardsCount={user.statsSummary?.rewardCount || 0}
          title="Onlydust legend"
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
          data={createData()}
        />
      ),
    });
  } catch {
    return Generator({
      children: <GenericImageMetadata />,
    });
  }
}
