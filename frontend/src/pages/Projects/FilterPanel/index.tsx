import { gql } from "@apollo/client";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import {
  getDeduplicatedAggregatedLanguages,
  getMostUsedLanguages,
  GITHUB_REPOS_LANGUAGES_FRAGMENT,
} from "src/utils/languages";
import { GetAllTechnologiesQuery } from "src/__generated/graphql";
import { ProjectFilter } from "..";
import View from "./View";

type Props = {
  projectFilter: ProjectFilter;
  setProjectFilter: (projectFilter: ProjectFilter) => void;
  isProjectLeader: boolean;
};

export default function FilterPanel({ projectFilter, setProjectFilter, isProjectLeader }: Props) {
  const technologiesQuery = useHasuraQuery<GetAllTechnologiesQuery>(GET_ALL_TECHNOLOGIES_QUERY, HasuraUserRole.Public);

  const availableTechnologies = new Set(
    technologiesQuery.data?.projects
      .map(p => getMostUsedLanguages(getDeduplicatedAggregatedLanguages(p.githubRepos)))
      .flat()
  );

  return (
    <View
      availableTechnologies={Array.from(availableTechnologies).sort((t1: string, t2: string) => t1.localeCompare(t2))}
      projectFilter={projectFilter}
      setProjectFilter={setProjectFilter}
      isProjectLeader={isProjectLeader}
    />
  );
}

export const GET_ALL_TECHNOLOGIES_QUERY = gql`
  ${GITHUB_REPOS_LANGUAGES_FRAGMENT}
  query GetAllTechnologies {
    projects {
      id
      githubRepos {
        ...GithubRepoLanguagesFields
      }
    }
  }
`;
