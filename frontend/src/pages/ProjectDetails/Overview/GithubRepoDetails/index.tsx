import { gql } from "@apollo/client";
import { useGetGithubRepositoryDetailsQuery } from "src/__generated/graphql";
import View from "./View";
import { contextWithCacheHeaders } from "src/utils/headers";

type Props = {
  githubRepoId?: number;
};

export default function GithubRepoDetails({ githubRepoId }: Props) {
  const { data } = useGetGithubRepositoryDetailsQuery({
    variables: { githubRepoId },
    ...contextWithCacheHeaders,
  });

  return <>{data?.githubRepos && data?.githubRepos[0] && <View {...data?.githubRepos[0]} />}</>;
}

gql`
  query GetGithubRepositoryDetails($githubRepoId: bigint!) {
    githubRepos(where: { id: { _eq: $githubRepoId } }) {
      ...GithubRepo
    }
  }
`;
