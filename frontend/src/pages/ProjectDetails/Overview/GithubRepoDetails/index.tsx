import { gql } from "@apollo/client";
import { useGetGithubRepositoryDetailsQuery } from "src/__generated/graphql";
import View from "./View";
import { contextWithCacheHeaders } from "src/utils/headers";

type Props = {
  githubRepoId: number;
};

export default function GithubRepoDetails({ githubRepoId }: Props) {
  const { data } = useGetGithubRepositoryDetailsQuery({
    variables: { githubRepoId },
    ...contextWithCacheHeaders,
  });

  const githubRepoDetails = data?.crmGithubReposByPk &&
    data?.crmGithubReposByPk?.languages?.languages && {
      ...data?.crmGithubReposByPk,
      ...data?.crmGithubReposByPk?.languages,
    };

  return <>{githubRepoDetails && <View {...githubRepoDetails} />}</>;
}

gql`
  query GetGithubRepositoryDetails($githubRepoId: bigint!) {
    crmGithubReposByPk(id: $githubRepoId) {
      ...GithubRepo
      languages {
        id
        languages
      }
    }
  }
`;
