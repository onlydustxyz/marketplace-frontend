"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { applicationsApiClient } from "api-client/resources/applications";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import ProjectApi from "src/api/Project";

import { withLeadRequired } from "components/features/auth0/guards/lead-guard";
import { Flex } from "components/layout/flex/flex";

import { ContributionHeader } from "./features/contribution-header/contribution-header";
import { ContributorDetails } from "./features/contributor-details/contributor-details";
import { ContributorSelect } from "./features/contributor-select/contributor-select";

function ContributionPage() {
  const { slug = "", contributionId = "" } = useParams<{ slug?: string; contributionId?: string }>();

  const [search, setSearch] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const { data: project } = ProjectApi.queries.useGetProjectBySlug({
    params: { slug },
  });

  const handleSelectUser = (githubId: number) => {
    setSelectedUser(githubId);
  };

  const { data: newComersApplicationsData, hasNextPage: newComersApplicationsHasNextPage } =
    applicationsApiClient.queries.useInfiniteGetAllApplications({
      // queryParams: { projectId: project?.id, issueId: contributionId },
      queryParams: { projectId: project?.id },
      options: { enabled: !!project?.id },
    });

  const { data: projectMembersApplicationsData, hasNextPage: projectMembersApplicationsHasNextPage } =
    applicationsApiClient.queries.useInfiniteGetAllApplications({
      // queryParams: { projectId: project?.id, issueId: contributionId, isApplicantProjectMember: true },
      queryParams: { projectId: project?.id },
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

  useEffect(() => {
    const applications = [...(newComersApplications || []), ...(projectMembersApplications || [])];

    if (applications.length) {
      setSelectedUser(applications[0].applicant.githubUserId);
    }
  }, [newComersApplications, projectMembersApplications]);

  if (!newComersApplications?.length && !projectMembersApplications?.length) return null;

  return (
    <Flex direction="col" className="gap-6">
      <ContributionHeader title={title} />

      <Flex className="gap-6">
        <ContributorSelect
          search={search}
          setSearch={setSearch}
          selectedUser={selectedUser}
          handleSelectUser={handleSelectUser}
          newComersApplications={newComersApplications}
          projectMembersApplications={projectMembersApplications}
        />

        {selectedUser ? <ContributorDetails githubId={selectedUser} /> : null}
      </Flex>
    </Flex>
  );
}

export default withAuthenticationRequired(withLeadRequired(ContributionPage));
