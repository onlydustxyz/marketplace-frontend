import { gql } from "@apollo/client";
import QueryWrapper from "src/components/QueryWrapper";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import {
  GetGithubRepositoryDetailsQuery,
  GithubRepoDynamicDetailsFragmentDoc,
  GithubRepoStaticDetailsFragmentDoc,
} from "src/__generated/graphql";
import View from "./View";

type Props = {
  githubRepoId: number;
};

export default function GithubRepoDetails({ githubRepoId }: Props) {
  const { data, loading } = useHasuraQuery<GetGithubRepositoryDetailsQuery>(
    GET_GITHUB_REPOSITORY_DETAILS_QUERY,
    HasuraUserRole.Public,
    {
      variables: { githubRepoId },
    }
  );

  const githubRepoDetails = data?.githubRepoDetailsByPk &&
    data?.githubRepoDetailsByPk?.content && { ...data.githubRepoDetailsByPk, ...data.githubRepoDetailsByPk?.content };

  return <QueryWrapper query={{ loading, data }}>{githubRepoDetails && <View {...githubRepoDetails} />}</QueryWrapper>;
}

export const GET_GITHUB_REPOSITORY_DETAILS_QUERY = gql`
  ${GithubRepoStaticDetailsFragmentDoc}
  ${GithubRepoDynamicDetailsFragmentDoc}
  query GetGithubRepositoryDetails($githubRepoId: bigint!) {
    githubRepoDetailsByPk(id: $githubRepoId) {
      ...GithubRepoStaticDetails
      content {
        ...GithubRepoDynamicDetails
      }
    }
  }
`;
