import { gql } from "@apollo/client";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import { getMostUsedLanguages } from "src/utils/languages";
import { GetAllTechnologiesQuery } from "src/__generated/graphql";
import { ProjectOwnershipType } from "..";
import View from "./View";

type Props = {
  onTechnologiesChange?: (technologies: string[]) => void;
  projectOwnershipType: ProjectOwnershipType;
  setProjectOwnershipType: (projectType: ProjectOwnershipType) => void;
};

export default function FilterPanel({ onTechnologiesChange, projectOwnershipType, setProjectOwnershipType }: Props) {
  const technologiesQuery = useHasuraQuery<GetAllTechnologiesQuery>(GET_ALL_TECHNOLOGIES_QUERY, HasuraUserRole.Public);

  const technologies = new Set(
    technologiesQuery.data?.projects.map(p => getMostUsedLanguages(p.githubRepo?.languages)).flat()
  );

  return (
    <View
      technologies={Array.from(technologies).sort((t1: string, t2: string) => t1.localeCompare(t2))}
      onTechnologiesChange={onTechnologiesChange}
      projectOwnershipType={projectOwnershipType}
      setProjectOwnershipType={setProjectOwnershipType}
    />
  );
}

export const GET_ALL_TECHNOLOGIES_QUERY = gql`
  query GetAllTechnologies {
    projects {
      githubRepo {
        id
        languages
      }
    }
  }
`;
