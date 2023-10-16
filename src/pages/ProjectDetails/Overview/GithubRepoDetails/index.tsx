import { gql } from "@apollo/client";
import { useGetGithubRepositoryDetailsQuery } from "src/__generated/graphql";
import View from "./View";
import { contextWithCacheHeaders } from "src/utils/headers";
interface Repo {
  id: number;
  owner: string;
  name: string;
  description: string;
  stars: number;
  forkCount: number;
  htmlUrl: string;
  hasIssues: boolean;
}

type Props = {
  githubRepoId?: number;
  repo?: Repo;
};

export default function GithubRepoDetails({ githubRepoId, repo }: Props) {
  const { data } = useGetGithubRepositoryDetailsQuery({
    variables: { githubRepoId },
    ...contextWithCacheHeaders,
  });

  if (repo) {
    return <View {...repo} />;
  }

  return <>{data?.githubRepos && data?.githubRepos[0] && <View {...data?.githubRepos[0]} />}</>;
}

gql`
  query GetGithubRepositoryDetails($githubRepoId: bigint!) {
    githubRepos(where: { id: { _eq: $githubRepoId } }) {
      ...GithubRepo
    }
  }
`;
