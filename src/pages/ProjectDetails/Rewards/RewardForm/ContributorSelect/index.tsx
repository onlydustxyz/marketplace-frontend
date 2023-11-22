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

  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const debounceSearch = useCallback(
    debounce(newSearch => {
      setDebouncedSearch(newSearch);
    }, 300),
    []
  );

  useEffect(() => {
    if (search || search === "") {
      debounceSearch(search);
    }
  }, [search, debounceSearch]);

  const { data: searchedUsers, isLoading: isUsersSearchLoading } = UsersApi.queries.useUsersSearchByLogin({
    params: { login: debouncedSearch, externalSearchOnly: "true" },
    options: { enabled: debouncedSearch !== "" },
  });

  // const debouncedGithubHandleSubstring = useDebounce(githubHandleSubstring, EXTERNAL_USER_QUERY_DEBOUNCE_TIME);
  // const handleSubstringQuery = `type:user ${debouncedGithubHandleSubstring} in:login`;

  const { queryParams } = useQueryParamsSorting({
    field: ContributorsSortFields.Login,
    isAscending: true,
    storageKey: "ProjectContributionSorting",
  });

  const {
    data: ProjectContributors,
    error,
    isLoading: isProjectContributorsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = ProjectApi.queries.useProjectContributorsInfiniteList({
    params: { projectId, queryParams },
  });

  const contributors = ProjectContributors?.pages.flatMap(({ contributors }) => contributors) ?? [];

  // console.log("githubHandleSubstring", githubHandleSubstring);

  // const { data } = useSuspenseQuery<GetProjectPendingContributorsQuery>(GetProjectPendingContributorsDocument, {
  //   variables: { projectId },
  //   fetchPolicy: "no-cache",
  // });
  // const contributors = data?.projectsPendingContributors.map(u => u.user).filter(isDefined);

  // const searchGithubUsersByHandleSubstringQuery = useSearchGithubUsersByHandleSubstringQuery({
  //   variables: { handleSubstringQuery },
  //   skip: (githubHandleSubstring?.length || 0) < 2 || githubHandleSubstring !== debouncedGithubHandleSubstring,
  // });

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
    contributor => !search || (search && contributor.login?.toLowerCase().startsWith(query.toLowerCase()))
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
        isSearchGithubUsersByHandleSubstringQueryLoading: isUsersSearchLoading,
        contributor,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
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
