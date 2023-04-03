import { useEffect, useMemo, useState } from "react";
import { useHasuraQuery } from "src/hooks/useHasuraQuery";
import { HasuraUserRole } from "src/types";
import {
  GetProjectContributorsForPaymentSelectDocument,
  GetProjectContributorsForPaymentSelectQuery,
  GithubContributorFragment,
  ProjectContributorsForPaymentSelectFragment,
  PullDetailsFragment,
  SearchGithubUsersByHandleSubstringDocument,
  SearchGithubUsersByHandleSubstringQuery,
} from "src/__generated/graphql";
import { getContributors } from "src/utils/project";
import View from "./View";
import { useLocation } from "react-router-dom";
import { chain, flatMap, some } from "lodash";

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
    GetProjectContributorsForPaymentSelectDocument,
    HasuraUserRole.Public,
    {
      variables: { projectId },
    }
  );
  const searchGithubUsersByHandleSubstringQuery = useHasuraQuery<SearchGithubUsersByHandleSubstringQuery>(
    SearchGithubUsersByHandleSubstringDocument,
    HasuraUserRole.RegisteredUser,
    {
      variables: { handleSubstringQuery },
      skip: (githubHandleSubstring?.length || 0) < 2,
    }
  );

  const unpaidMergedPullsCountByContributor = useMemo(
    () =>
      getProjectContributorsQuery.data?.projectsByPk
        ? countUnpaidMergedPullsByContributor(getProjectContributorsQuery.data?.projectsByPk)
        : {},
    [getProjectContributorsQuery.data]
  );

  const { contributors: internalContributors } = useMemo(() => {
    const contributors = getContributors(getProjectContributorsQuery.data?.projectsByPk);
    contributors.contributors.map(c => ({
      ...c,
      unpaidMergedPullsCount: unpaidMergedPullsCountByContributor[c?.login],
    }));
    return contributors;
  }, [getProjectContributorsQuery.data, unpaidMergedPullsCountByContributor]);

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
        objectWithLoginA.login.localeCompare(objectWithLoginB.login)
      )
    : [];
}

export const countUnpaidMergedPullsByContributor = ({
  githubRepos,
  budgets,
}: ProjectContributorsForPaymentSelectFragment) => {
  const paidItemsByLogin = chain(budgets)
    .flatMap("paymentRequests")
    .groupBy("githubRecipient.login")
    .mapValues(requests => flatMap(requests, "workItems"))
    .value();

  const notPaid = ({ author, repoId, number: issueNumber }: PullDetailsFragment) =>
    !some(paidItemsByLogin[author.login], { repoId, issueNumber });

  return chain(githubRepos)
    .flatMap("githubRepoDetails.pullRequests")
    .filter("mergedAt")
    .filter(notPaid)
    .countBy("author.login")
    .value();
};
