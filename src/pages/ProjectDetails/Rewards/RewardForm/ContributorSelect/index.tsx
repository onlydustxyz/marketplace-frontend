import { useCallback, useEffect, useState } from "react";
import View from "./View";
import { useLocation } from "react-router-dom";
import { Contributor } from "src/pages/ProjectDetails/Rewards/RewardForm/types";
import ProjectApi from "src/api/Project";
import useQueryParamsSorting from "src/components/RewardTable/useQueryParamsSorting";
import { debounce } from "lodash";
import UsersApi from "src/api/Users";

enum ContributorsSortFields {
  ContributionCount = "CONTRIBUTION_COUNT",
  Earned = "EARNED",
  Login = "LOGIN",
  RewardCount = "REWARD_COUNT",
  ToRewardCount = "TO_REWARD_COUNT",
}

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

  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const debounceSearch = useCallback(
    debounce(newSearch => {
      setDebouncedSearch(newSearch);
    }, 300),
    []
  );

  useEffect(() => {
    if (typeof search === "string") {
      debounceSearch(search);
    }
  }, [search, debounceSearch]);

  const { data: searchedUsers, isLoading: isUsersSearchLoading } = UsersApi.queries.useUsersSearchByLogin({
    params: { login: debouncedSearch, externalSearchOnly: "true" },
    options: { enabled: debouncedSearch !== "" },
  });

  const { queryParams } = useQueryParamsSorting({
    field: ContributorsSortFields.Login,
    isAscending: true,
    storageKey: "ProjectContributionSorting",
  });

  const {
    data: ProjectContributors,
    isError,
    isLoading: isProjectContributorsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = ProjectApi.queries.useProjectContributorsInfiniteList({
    params: { projectId, queryParams },
  });

  const contributors = ProjectContributors?.pages.flatMap(({ contributors }) => contributors) ?? [];

  const internalContributors: Contributor[] = contributors.map(c => {
    const completedUnpaidPullRequestCount = c.pullRequestToReward || 0;
    const completedUnpaidIssueCount = c.issueToReward || 0;
    const completedUnpaidCodeReviewCount = c.codeReviewToReward || 0;

    return {
      githubUserId: c.githubUserId,
      login: c.login || "",
      avatarUrl: c.avatarUrl || "",
      unpaidCompletedContributions:
        completedUnpaidPullRequestCount + completedUnpaidIssueCount + completedUnpaidCodeReviewCount,
      unpaidMergedPullsCount: completedUnpaidPullRequestCount,
      unpaidCompletedIssuesCount: completedUnpaidIssueCount,
      unpaidCompletedCodeReviewsCount: completedUnpaidCodeReviewCount,
      userId: c.login,
    };
  });

  const filteredContributors = internalContributors.filter(
    contributor => !search || (search && contributor.login?.toLowerCase().startsWith(search.toLowerCase()))
  );

  const filteredExternalContributors: Contributor[] = sortListByLogin(searchedUsers?.externalContributors)
    ?.slice(0, 5)
    .filter(
      contributor =>
        !filteredContributors
          .map(filteredContributor => filteredContributor.login?.toLocaleLowerCase())
          .includes(contributor.login.toLocaleLowerCase())
    )
    .map(c => ({
      githubUserId: c.githubUserId,
      login: c.login,
      avatarUrl: c.avatarUrl,
      unpaidCompletedContributions: 0,
      userId: c.login,
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
        search,
        setSearch,
        filteredContributors,
        filteredExternalContributors,
        isSearchGithubUsersByHandleSubstringQueryLoading: isUsersSearchLoading || isProjectContributorsLoading,
        contributor,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isError,
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
