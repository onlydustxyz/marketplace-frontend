import { usersApiClient } from "api-client/resources/users";
import { subWeeks } from "date-fns";

import { getWeekId } from "components/features/graphs/activity-graph/utils/getWeekId";
import { Generator } from "components/features/seo/image-metadata/commons/generator/generator";
import { GenericImageMetadata } from "components/features/seo/image-metadata/generic/image-metadata";
import { PublicProfileImageMetadata } from "components/features/seo/image-metadata/public-profile/image-metadata";

export default async function Image(props: { params: { githubLogin: string } }) {
  function mockWeekDate(number: number) {
    return subWeeks(new Date(), number);
  }

  try {
    const user = await usersApiClient.fetch.getUserPublicProfileByGithubLogin(props.params.githubLogin).request();
    return Generator({
      children: (
        <PublicProfileImageMetadata
          login={user.login}
          image={user.avatarUrl}
          title="Onlydust legend"
          topLanguages={{
            name: "Cairo",
            image: "https://starkware.co/wp-content/uploads/2021/05/logoicon.svg",
          }}
          topEcosystem={{
            name: "Cairo",
            image: "https://starkware.co/wp-content/uploads/2021/05/logoicon.svg",
          }}
          data={{
            [getWeekId(mockWeekDate(0))]: { level: 4, reward: true },
            [getWeekId(mockWeekDate(4))]: { level: 3, reward: true },
            [getWeekId(mockWeekDate(10))]: { level: 4, reward: true },
            [getWeekId(mockWeekDate(20))]: { level: 2, reward: true },
            [getWeekId(mockWeekDate(30))]: { level: 4, reward: true },
            [getWeekId(mockWeekDate(6))]: { level: 3, reward: true },
            [getWeekId(mockWeekDate(7))]: { level: 2, reward: true },

            [getWeekId(mockWeekDate(2))]: { level: 4 },
            [getWeekId(mockWeekDate(8))]: { level: 3 },
            [getWeekId(mockWeekDate(13))]: { level: 4 },
            [getWeekId(mockWeekDate(25))]: { level: 2 },
            [getWeekId(mockWeekDate(45))]: { level: 4 },
            [getWeekId(mockWeekDate(42))]: { level: 3 },
            [getWeekId(mockWeekDate(39))]: { level: 2 },
          }}
        />
      ),
    });
  } catch (err) {
    return Generator({
      children: <GenericImageMetadata />,
    });
  }
}
