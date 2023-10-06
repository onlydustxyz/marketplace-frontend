import { useAuth } from "src/hooks/useAuth";
import { getDeduplicatedAggregatedLanguages, getMostUsedLanguages } from "src/utils/languages";
import { useGetAllFilterOptionsQuery } from "src/__generated/graphql";
import View from "./View";
import { chain } from "lodash";
import { contextWithCacheHeaders } from "src/utils/headers";
import { isProjectVisibleToUser } from "src/hooks/useProjectVisibility";

type Props = {
  isProjectLeader: boolean;
  fromSidePanel?: boolean;
  technologies: string[];
  sponsors: string[];
};

export default function FilterPanel({ isProjectLeader, fromSidePanel, technologies, sponsors }: Props) {
  const { user, githubUserId } = useAuth();
  const filterOptionsQuery = useGetAllFilterOptionsQuery(contextWithCacheHeaders);

  let availableTechnologies: string[] = [];
  let availableSponsors: string[] = [];

  if (import.meta.env.VITE_USE_APOLLO === "true") {
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

    availableTechnologies = visibleProjects
      .flatMap(p => getMostUsedLanguages(getDeduplicatedAggregatedLanguages(p.githubRepos.map(r => r.repo))))
      .sort((t1: string, t2: string) => t1.localeCompare(t2))
      .uniq()
      .value();

    availableSponsors = visibleProjects
      .flatMap(p => p.sponsors.map(s => s.sponsor.name))
      .sort()
      .uniq()
      .value();
  } else {
    availableTechnologies = technologies;
    availableSponsors = sponsors;
  }

  return (
    <View
      {...{
        availableTechnologies,
        availableSponsors,
        isProjectLeader,
      }}
      fromSidePanel={fromSidePanel}
    />
  );
}
