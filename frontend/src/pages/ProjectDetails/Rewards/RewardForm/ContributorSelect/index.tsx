import { useEffect, useState } from "react";
import {
  GetProjectPendingContributorsDocument,
  GetProjectPendingContributorsQuery,
  useSearchGithubUsersByHandleSubstringQuery,
} from "src/__generated/graphql";
import View from "./View";
import { useLocation } from "react-router-dom";
import { Contributor } from "src/pages/ProjectDetails/Rewards/RewardForm/types";
import { useDebounce } from "usehooks-ts";
import { contextWithCacheHeaders } from "src/utils/headers";
import isDefined from "src/utils/isDefined";
import { useSuspenseQuery_experimental as useSuspenseQuery } from "@apollo/client";

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

  const { data } = useSuspenseQuery<GetProjectPendingContributorsQuery>(GetProjectPendingContributorsDocument, {
    variables: { projectId },
    ...contextWithCacheHeaders,
  });
  const contributors = data?.projectsPendingContributors.map(u => u.user).filter(isDefined);

  const searchGithubUsersByHandleSubstringQuery = useSearchGithubUsersByHandleSubstringQuery({
    variables: { handleSubstringQuery },
    skip: (githubHandleSubstring?.length || 0) < 2 || githubHandleSubstring !== debouncedGithubHandleSubstring,
  });

  const internalContributors: Contributor[] = contributors.map(c => {
    const completedUnpaidPullRequestCount = c.completedUnpaidPullRequestsAggregate.aggregate?.count || 0;
    const completedUnpaidIssueCount = c.completedUnpaidIssuesAggregate.aggregate?.count || 0;
    const completedUnpaidCodeReviewCount = c.completedUnpaidCodeReviewsAggregate.aggregate?.count || 0;

    return {
      githubUserId: c.githubUserId,
      login: c.login || "",
      avatarUrl: c.avatarUrl || "",
      unpaidCompletedContributions:
        completedUnpaidPullRequestCount + completedUnpaidIssueCount + completedUnpaidCodeReviewCount,
      unpaidMergedPullsCount: completedUnpaidPullRequestCount,
      unpaidCompletedIssuesCount: completedUnpaidIssueCount,
      unpaidCompletedCodeReviewsCount: completedUnpaidCodeReviewCount,
      userId: c.userId,
    };
  });

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
      unpaidCompletedContributions: 0,
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
