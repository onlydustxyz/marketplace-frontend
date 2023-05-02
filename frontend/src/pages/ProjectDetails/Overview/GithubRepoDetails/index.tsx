import { gql } from "@apollo/client";
import {
  GithubRepoDynamicDetailsFragmentDoc,
  GithubRepoStaticDetailsFragmentDoc,
  useGetGithubRepositoryDetailsQuery,
} from "src/__generated/graphql";
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
