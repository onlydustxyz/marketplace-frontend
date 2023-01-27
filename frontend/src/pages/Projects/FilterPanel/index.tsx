import { gql } from "@apollo/client";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import { GetAllTechnologiesQuery } from "src/__generated/graphql";
import View from "./View";

type Props = {
  onTechnologiesChange?: (technologies: string[]) => void;
};

export default function FilterPanel({ onTechnologiesChange }: Props) {
  const technologiesQuery = useHasuraQuery<GetAllTechnologiesQuery>(GET_ALL_TECHNOLOGIES_QUERY, HasuraUserRole.Public);

  const technologies = new Set(
    technologiesQuery.data?.projects.map(p => Object.keys(p.githubRepo?.languages || {}).slice(0, 2)).flat()
  );

  return (
    <View
      technologies={Array.from(technologies).sort((t1: string, t2: string) => t1.localeCompare(t2))}
      onTechnologiesChange={onTechnologiesChange}
    />
  );
}

export const GET_ALL_TECHNOLOGIES_QUERY = gql`
  query GetAllTechnologies {
    projects {
      githubRepo {
        languages
      }
    }
  }
`;
