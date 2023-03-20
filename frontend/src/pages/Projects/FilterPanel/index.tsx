import { gql } from "@apollo/client";
import { useAuth } from "src/hooks/useAuth";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import {
  getDeduplicatedAggregatedLanguages,
  getMostUsedLanguages,
  GITHUB_REPOS_LANGUAGES_FRAGMENT,
} from "src/utils/languages";
import { isProjectVisible, VISIBLE_PROJECT_FRAGMENT } from "src/utils/project";
import { GetAllFilterOptionsQuery } from "src/__generated/graphql";
import { ProjectFilter, ProjectFilterAction } from "src/pages/Projects/types";
import View from "./View";
import { chain } from "lodash";

type Props = {
  projectFilter: ProjectFilter;
  dispatchProjectFilter: (action: ProjectFilterAction) => void;
  isProjectFilterCleared: () => boolean;
  isProjectLeader: boolean;
};

export default function FilterPanel({
  projectFilter,
  dispatchProjectFilter,
  isProjectFilterCleared,
  isProjectLeader,
}: Props) {
  const { githubUserId } = useAuth();
  const filterOptionsQuery = useHasuraQuery<GetAllFilterOptionsQuery>(
    GET_ALL_FILTER_OPTIONS_QUERY,
    HasuraUserRole.Public
  );

  const visibleProjects = chain(filterOptionsQuery.data?.projects).filter(isProjectVisible(githubUserId));

  const availableTechnologies = visibleProjects
    .flatMap(p => getMostUsedLanguages(getDeduplicatedAggregatedLanguages(p.githubRepos)))
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
        projectFilter,
        dispatchProjectFilter,
        isProjectFilterCleared,
        isProjectLeader,
      }}
    />
  );
}

export const GET_ALL_FILTER_OPTIONS_QUERY = gql`
  ${VISIBLE_PROJECT_FRAGMENT}
  ${GITHUB_REPOS_LANGUAGES_FRAGMENT}
  query GetAllFilterOptions {
    projects {
      ...VisibleProject
      projectSponsors {
        sponsor {
          id
          name
        }
      }
      githubRepos {
        ...GithubRepoLanguagesFields
      }
    }
  }
`;
