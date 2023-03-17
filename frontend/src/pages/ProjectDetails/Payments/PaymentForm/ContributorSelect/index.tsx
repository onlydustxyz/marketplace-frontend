import { gql } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import {
  GetProjectContributorsForPaymentSelectQuery,
  GithubContributorFragment,
  SearchGithubUsersByHandleSubstringQuery,
} from "src/__generated/graphql";
import { getContributors } from "src/utils/project";
import { GITHUB_CONTRIBUTOR_FRAGMENT } from "src/hooks/useIsGithubLoginValid";
import View from "./View";

type Props = {
  projectId: string;
  contributor: GithubContributorFragment | null | undefined;
  setContributor: (contributor: GithubContributorFragment | null | undefined) => void;
};

export default function ContributorSelect({ projectId, contributor, setContributor }: Props) {
  const [selectedGithubHandle, setSelectedGithubHandle] = useState<string | null>(null);
  const [githubHandleSubstring, setGithubHandleSubstring] = useState<string | null>(null);
  const handleSubstringQuery = `type:user ${githubHandleSubstring} in:login`;

  const getProjectContributorsQuery = useHasuraQuery<GetProjectContributorsForPaymentSelectQuery>(
    GET_PROJECT_CONTRIBUTORS_QUERY,
    HasuraUserRole.Public,
    {
      variables: { projectId },
    }
  );
  const searchGithubUsersByHandleSubstringQuery = useHasuraQuery<SearchGithubUsersByHandleSubstringQuery>(
    SEARCH_GITHUB_USERS_BY_HANDLE_SUBSTRING_QUERY,
    HasuraUserRole.RegisteredUser,
    {
      variables: { handleSubstringQuery },
      skip: !githubHandleSubstring || (githubHandleSubstring && githubHandleSubstring.length) < 2,
    }
  );

  const { contributors: internalContributors } = useMemo(
    () => getContributors(getProjectContributorsQuery.data?.projectsByPk),
    [getProjectContributorsQuery.data]
  );

  const filteredContributors = internalContributors.filter(
    contributor =>
      !githubHandleSubstring || (githubHandleSubstring && contributor.login.startsWith(githubHandleSubstring))
  );

  const filteredExternalContributors = searchGithubUsersByHandleSubstringQuery?.data?.searchUsers
    ?.slice(0, 5)
    .filter(
      contributor =>
        !filteredContributors.map(filteredContributor => filteredContributor.login).includes(contributor.login)
    );

  useEffect(
    () =>
      setContributor(
        filteredContributors?.find(contributor => contributor.login === selectedGithubHandle) ||
          filteredExternalContributors?.find(contributor => contributor.login === selectedGithubHandle)
      ),
    [selectedGithubHandle]
  );

  return (
    <View
      {...{
        selectedGithubHandle,
        setSelectedGithubHandle,
        githubHandleSubstring,
        setGithubHandleSubstring,
        filteredContributors,
        filteredExternalContributors,
        isSearchGithubUsersByHandleSubstringQueryLoading: searchGithubUsersByHandleSubstringQuery.loading,
        contributor,
      }}
    />
  );
}

export const SEARCH_GITHUB_USERS_BY_HANDLE_SUBSTRING_QUERY = gql`
  query SearchGithubUsersByHandleSubstring($handleSubstringQuery: String!) {
    searchUsers(query: $handleSubstringQuery, sort: "followers", order: "desc") {
      id
      login
      avatarUrl
      user {
        userId
      }
    }
  }
`;

export const GET_PROJECT_CONTRIBUTORS_QUERY = gql`
  ${GITHUB_CONTRIBUTOR_FRAGMENT}
  query GetProjectContributorsForPaymentSelect($projectId: uuid!) {
    projectsByPk(id: $projectId) {
      id
      githubRepos {
        githubRepoDetails {
          content {
            id
            contributors {
              ...GithubContributor
            }
          }
        }
      }
      budgets {
        paymentRequests {
          id
          githubRecipient {
            ...GithubContributor
          }
        }
      }
    }
  }
`;
