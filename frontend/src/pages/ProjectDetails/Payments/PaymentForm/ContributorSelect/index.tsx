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
import { useLocation } from "react-router-dom";

type Props = {
  projectId: string;
  contributor: GithubContributorFragment | null | undefined;
  setContributor: (contributor: GithubContributorFragment | null | undefined) => void;
};

export default function ContributorSelect({ projectId, contributor, setContributor }: Props) {
  const location = useLocation();

  const [selectedGithubHandle, setSelectedGithubHandle] = useState<string | null>(
    location.state?.recipientGithubLogin || null
  );
  const [githubHandleSubstring, setGithubHandleSubstring] = useState<string>("");
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

  const filteredContributors = sortListByLogin(
    internalContributors.filter(
      contributor =>
        !githubHandleSubstring ||
        (githubHandleSubstring && contributor.login.toLowerCase().startsWith(githubHandleSubstring.toLowerCase()))
    )
  );

  const filteredExternalContributors = sortListByLogin(searchGithubUsersByHandleSubstringQuery?.data?.searchUsers)
    ?.slice(0, 5)
    .filter(
      contributor =>
        !filteredContributors
          .map(filteredContributor => filteredContributor.login.toLocaleLowerCase())
          .includes(contributor.login.toLocaleLowerCase())
    );

  useEffect(() => {
    if (!contributor || (contributor && contributor.login !== selectedGithubHandle)) {
      setContributor(
        internalContributors?.find(contributor => contributor.login === selectedGithubHandle) ||
          filteredExternalContributors?.find(contributor => contributor.login === selectedGithubHandle)
      );
    }
  }, [selectedGithubHandle, contributor, filteredContributors, filteredExternalContributors, internalContributors]);

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

function sortListByLogin<T extends { login: string }>(objectsWithLogin: T[] | null | undefined) {
  return objectsWithLogin
    ? [...objectsWithLogin].sort((objectWithLoginA, objectWithLoginB) =>
        objectWithLoginA.login.toLocaleLowerCase().localeCompare(objectWithLoginB.login.toLocaleLowerCase())
      )
    : [];
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
