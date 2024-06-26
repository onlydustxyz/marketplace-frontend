import { applicationsApiClient } from "api-client/resources/applications";
import { useParams } from "next/navigation";
import { useMemo } from "react";

import ProjectApi from "src/api/Project";

import { TUseApplications } from "./use-applications.types";

export function UseApplications({ search }: TUseApplications.Props): TUseApplications.Return {
  const { slug = "", contributionId = "" } = useParams<{ slug?: string; contributionId?: string }>();

  const { data: project } = ProjectApi.queries.useGetProjectBySlug({
    params: { slug },
  });

  const {
    data: newComersApplicationsData,
    fetchNextPage: newComersFetchNextPage,
    hasNextPage: newComersApplicationsHasNextPage,
    isFetchingNextPage: newComersIsFetchingNextPage,
    isPending: newComersIsPending,
  } = applicationsApiClient.queries.useInfiniteGetAllApplications({
    queryParams: {
      projectId: project?.id,
      issueId: contributionId,
      applicantLoginSearch: search,
      isApplicantProjectMember: false,
    },
    options: { enabled: !!project?.id },
  });

  const {
    data: projectMembersApplicationsData,
    fetchNextPage: projectMembersFetchNextPage,
    hasNextPage: projectMembersApplicationsHasNextPage,
    isFetchingNextPage: projectMembersIsFetchingNextPage,
    isPending: projectMembersIsPending,
  } = applicationsApiClient.queries.useInfiniteGetAllApplications({
    queryParams: {
      projectId: project?.id,
      issueId: contributionId,
      applicantLoginSearch: search,
      isApplicantProjectMember: true,
    },
    options: { enabled: !!project?.id },
  });

  const newComersApplications = useMemo(
    () => newComersApplicationsData?.pages.flatMap(page => page.applications),
    [newComersApplicationsData]
  );

  const projectMembersApplications = useMemo(
    () => projectMembersApplicationsData?.pages.flatMap(page => page.applications),
    [projectMembersApplicationsData]
  );

  const title = useMemo(() => {
    if (newComersApplications?.length) return newComersApplications[0].issue.title;
    if (projectMembersApplications?.length) return projectMembersApplications[0].issue.title;

    return "";
  }, [newComersApplications, projectMembersApplications]);

  return {
    newComers: {
      applications: newComersApplications,
      fetchNextPage: newComersFetchNextPage,
      hasNextPage: newComersApplicationsHasNextPage,
      isFetchingNextPage: newComersIsFetchingNextPage,
      isPending: newComersIsPending,
    },
    projectMembers: {
      applications: projectMembersApplications,
      fetchNextPage: projectMembersFetchNextPage,
      hasNextPage: projectMembersApplicationsHasNextPage,
      isFetchingNextPage: projectMembersIsFetchingNextPage,
      isPending: projectMembersIsPending,
    },
    title,
  };
}
