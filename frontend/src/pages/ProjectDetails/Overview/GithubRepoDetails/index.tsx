import { gql } from "@apollo/client";
import { useCachableHasuraQuery } from "src/hooks/useHasuraQuery";
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
  const { data } = useCachableHasuraQuery<GetGithubRepositoryDetailsQuery>(
    GET_GITHUB_REPOSITORY_DETAILS_QUERY,
    HasuraUserRole.Public,
    {
      variables: { githubRepoId },
    }
  );

  const githubRepoDetails = data?.githubRepoDetailsByPk &&
    data?.githubRepoDetailsByPk?.content && { ...data.githubRepoDetailsByPk, ...data.githubRepoDetailsByPk?.content };

  return <>{githubRepoDetails && <View {...githubRepoDetails} />}</>;
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
