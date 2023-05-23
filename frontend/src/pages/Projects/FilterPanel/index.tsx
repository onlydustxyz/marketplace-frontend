import { useAuth } from "src/hooks/useAuth";
import { getDeduplicatedAggregatedLanguages, getMostUsedLanguages } from "src/utils/languages";
import { useGetAllFilterOptionsQuery } from "src/__generated/graphql";
import View from "./View";
import { chain } from "lodash";
import { contextWithCacheHeaders } from "src/utils/headers";
import { isProjectVisibleToUser } from "src/hooks/useProjectVisibility";

type Props = {
  isProjectLeader: boolean;
};

export default function FilterPanel({ isProjectLeader }: Props) {
  const { user, githubUserId } = useAuth();
  const filterOptionsQuery = useGetAllFilterOptionsQuery(contextWithCacheHeaders);

  const visibleProjects = chain(filterOptionsQuery.data?.projects).filter(
    project =>
      isProjectVisibleToUser({
        project,
        user: {
          userId: user?.id,
          githubUserId,
        },
      }) !== false
  );

  const availableTechnologies = visibleProjects
    .flatMap(p => getMostUsedLanguages(getDeduplicatedAggregatedLanguages(p.githubRepos.map(r => r.repo))))
    .sort((t1: string, t2: string) => t1.localeCompare(t2))
    .uniq()
    .value();

  const availableSponsors = visibleProjects
    .flatMap(p => p.projectSponsors.map(s => s.sponsor.name))
    .sort()
    .uniq()
    .value();

  return (
    <View
      {...{
        availableTechnologies,
        availableSponsors,
        isProjectLeader,
      }}
    />
  );
}
