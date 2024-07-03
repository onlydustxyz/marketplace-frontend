import { applicationsApiClient } from "api-client/resources/applications";
import { issuesApiClient } from "api-client/resources/issues";
import { debounce } from "lodash";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import ProjectApi from "src/api/Project";

import { TUseApplications } from "./use-applications.types";

export function useApplications({ search }: TUseApplications.Props): TUseApplications.Return {
  const { slug = "", issueId = "" } = useParams<{ slug?: string; issueId?: string }>();

  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);

  const debounceSearch = useCallback(
    debounce(newSearch => {
      setDebouncedSearch(newSearch.trim());
    }, 300),
    []
  );

  useEffect(() => {
    debounceSearch(search);
  }, [search, debounceSearch]);

  const { data: project } = ProjectApi.queries.useGetProjectBySlug({
    params: { slug },
  });

  const {
    data: newComersApplicationsData,
    fetchNextPage: newComersFetchNextPage,
    hasNextPage: newComersHasNextPage,
    isFetchingNextPage: newComersIsFetchingNextPage,
    isPending: newComersIsPending,
  } = applicationsApiClient.queries.useInfiniteGetAllApplications({
    queryParams: {
      projectId: project?.id,
      issueId: Number(issueId),
      isApplicantProjectMember: false,
      applicantLoginSearch: debouncedSearch,
    },
    options: { enabled: !!project?.id },
  });

  const {
    data: projectMembersApplicationsData,
    fetchNextPage: projectMembersFetchNextPage,
    hasNextPage: projectMembersHasNextPage,
    isFetchingNextPage: projectMembersIsFetchingNextPage,
    isPending: projectMembersIsPending,
  } = applicationsApiClient.queries.useInfiniteGetAllApplications({
    queryParams: {
      projectId: project?.id,
      issueId: Number(issueId),
      isApplicantProjectMember: true,
      applicantLoginSearch: debouncedSearch,
    },
    options: { enabled: !!project?.id },
  });

  const { data: issueData, isLoading: issueDataIsLoading } = issuesApiClient.queries.useGetIssueById({
    pathParams: {
      issueId: Number(issueId),
    },
    options: { enabled: !!issueId },
  });

  const newComersApplications = useMemo(
    () => newComersApplicationsData?.pages.flatMap(page => page.applications),
    [newComersApplicationsData]
  );

  const projectMembersApplications = useMemo(
    () => projectMembersApplicationsData?.pages.flatMap(page => page.applications),
    [projectMembersApplicationsData]
  );

  const canInteract = useMemo(() => {
    if (issueDataIsLoading) {
      return true;
    }
    return issueData?.githubAppInstallationStatus === "COMPLETE";
  }, [issueData?.githubAppInstallationStatus, issueDataIsLoading]);

  return {
    newComers: {
      applications: newComersApplications,
      fetchNextPage: newComersFetchNextPage,
      hasNextPage: newComersHasNextPage,
      isFetchingNextPage: newComersIsFetchingNextPage,
      isPending: newComersIsPending,
    },
    projectMembers: {
      applications: projectMembersApplications,
      fetchNextPage: projectMembersFetchNextPage,
      hasNextPage: projectMembersHasNextPage,
      isFetchingNextPage: projectMembersIsFetchingNextPage,
      isPending: projectMembersIsPending,
    },
    title: {
      content: issueData?.title,
      isLoading: issueDataIsLoading,
    },
    canInteract,
  };
}
