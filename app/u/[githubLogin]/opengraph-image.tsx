import { usersApiClient } from "api-client/resources/users";

import { TActivityGraph } from "components/features/graphs/activity-graph/activity-graph.types";
import { getDateFromWeekNumber } from "components/features/graphs/activity-graph/utils/getDateFromWeekNumber";
import { getLevelFromCount } from "components/features/graphs/activity-graph/utils/getLevelFromCount";
import { getLevelRange } from "components/features/graphs/activity-graph/utils/getLevelRange";
import { getWeekId } from "components/features/graphs/activity-graph/utils/getWeekId";
import { Generator } from "components/features/seo/image-metadata/commons/generator/generator";
import { GenericImageMetadata } from "components/features/seo/image-metadata/generic/image-metadata";

export const runtime = "edge";
export default async function Image(props: { params: { githubLogin: string } }) {
  try {
    const user = await usersApiClient.fetch.getUserPublicProfileByGithubLogin(props.params.githubLogin).request();
    const githubUserId = user?.githubUserId || 0;
    const [stats] = await Promise.all([
      usersApiClient.fetch
        .getUserPublicStats(githubUserId)
        .request()
        .then(res => res)
        .catch(e => {
          console.error(e);
          return null;
        }),
      usersApiClient.fetch
        .getUserPublicLanguages(githubUserId, { pageSize: 2, pageIndex: 0 })
        .request()
        .then(res => res)
        .catch(e => {
          console.error(e);
          return null;
        }),
      usersApiClient.fetch
        .getUserPublicEcosystems(githubUserId, { pageSize: 2, pageIndex: 0 })
        .request()
        .then(res => res)
        .catch(e => {
          console.error(e);
          return null;
        }),
    ]);

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

    createData();

    return Generator({
      children: <GenericImageMetadata />,
    });
  } catch {
    return Generator({
      children: <GenericImageMetadata />,
    });
  }
}
