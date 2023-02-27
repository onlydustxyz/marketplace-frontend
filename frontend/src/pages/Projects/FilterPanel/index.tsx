import { gql } from "@apollo/client";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import {
  getDeduplicatedAggregatedLanguages,
  getMostUsedLanguages,
  GITHUB_REPOS_LANGUAGES_FRAGMENT,
} from "src/utils/languages";
import { GetAllTechnologiesQuery } from "src/__generated/graphql";
import { ProjectOwnershipType } from "..";
import View from "./View";

type Props = {
  onTechnologiesChange?: (technologies: string[]) => void;
  projectOwnershipType: ProjectOwnershipType;
  setProjectOwnershipType: (projectType: ProjectOwnershipType) => void;
  isProjectLeader: boolean;
};

export default function FilterPanel({
  onTechnologiesChange,
  projectOwnershipType,
  setProjectOwnershipType,
  isProjectLeader,
}: Props) {
  const technologiesQuery = useHasuraQuery<GetAllTechnologiesQuery>(GET_ALL_TECHNOLOGIES_QUERY, HasuraUserRole.Public);

  const technologies = new Set(
    technologiesQuery.data?.projects
      .map(p => getMostUsedLanguages(getDeduplicatedAggregatedLanguages(p.githubRepos)))
      .flat()
  );

  return (
    <View
      technologies={Array.from(technologies).sort((t1: string, t2: string) => t1.localeCompare(t2))}
      onTechnologiesChange={onTechnologiesChange}
      projectOwnershipType={projectOwnershipType}
      setProjectOwnershipType={setProjectOwnershipType}
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
