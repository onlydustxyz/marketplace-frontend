import { useEffect, useState } from "react";
import { useSearchGithubUsersByHandleSubstringQuery } from "src/__generated/graphql";
import View from "./View";
import { useLocation } from "react-router-dom";
import useDebounce from "src/hooks/useDebounce";
import useProjectContributors from "src/hooks/useProjectContributors";
import { Contributor } from "src/pages/ProjectDetails/Payments/PaymentForm/types";

const EXTERNAL_USER_QUERY_DEBOUNCE_TIME = 500;

type Props = {
  projectId: string;
  contributor?: Contributor | null | undefined;
  setContributor: (contributor: Contributor | null | undefined) => void;
};

export default function ContributorSelect({ projectId, contributor, setContributor }: Props) {
  const location = useLocation();

  const [selectedGithubHandle, setSelectedGithubHandle] = useState<string | null>(
    location.state?.recipientGithubLogin || null
  );
  const [githubHandleSubstring, setGithubHandleSubstring] = useState<string>("");
  const debouncedGithubHandleSubstring = useDebounce(githubHandleSubstring, EXTERNAL_USER_QUERY_DEBOUNCE_TIME);
  const handleSubstringQuery = `type:user ${debouncedGithubHandleSubstring} in:login`;

  const { contributors } = useProjectContributors(projectId);

  const searchGithubUsersByHandleSubstringQuery = useSearchGithubUsersByHandleSubstringQuery({
    variables: { handleSubstringQuery },
    skip: (githubHandleSubstring?.length || 0) < 2 || githubHandleSubstring !== debouncedGithubHandleSubstring,
  });

  const internalContributors: Contributor[] = contributors.map(c => ({
    githubUserId: c.githubUserId,
    login: c.login || "",
    avatarUrl: c.avatarUrl || "",
    unpaidMergedPullsCount: c.contributionStatsAggregate.aggregate?.sum?.unpaidCount || 0,
    userId: c.userId,
  }));

  const filteredContributors = sortListByLogin(
    internalContributors.filter(
      contributor =>
        !githubHandleSubstring ||
        (githubHandleSubstring && contributor.login?.toLowerCase().startsWith(githubHandleSubstring.toLowerCase()))
    )
  );

  const filteredExternalContributors: Contributor[] = sortListByLogin(
    searchGithubUsersByHandleSubstringQuery?.data?.searchUsers
  )
    ?.slice(0, 5)
    .filter(
      contributor =>
        !filteredContributors
          .map(filteredContributor => filteredContributor.login?.toLocaleLowerCase())
          .includes(contributor.login.toLocaleLowerCase())
    )
    .map(c => ({
      githubUserId: c.id,
      login: c.login,
      avatarUrl: c.avatarUrl,
      unpaidMergedPullsCount: 0,
      userId: c.user?.id,
    }));

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
        debouncedGithubHandleSubstring,
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
