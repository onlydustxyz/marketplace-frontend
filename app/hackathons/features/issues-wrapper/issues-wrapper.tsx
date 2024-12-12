"use client";

import { ProjectReactQueryAdapter } from "core/application/react-query-adapter/project";
import { UserReactQueryAdapter } from "core/application/react-query-adapter/user";
import { Fragment, useMemo } from "react";

import { TIssuesWrapper } from "app/hackathons/features/issues-wrapper/issues-wrapper.types";

import { ApplyIssueDrawer } from "components/features/apply-issue-drawer/apply-issue-drawer";
import { useApplyIssueDrawerState } from "components/features/apply-issue-drawer/apply-issue-drawer.hooks";
import { Translate } from "components/layout/translate/translate";
import { CardIssue, CardIssueLoading } from "components/molecules/cards/card-issue";

export function IssuesWrapper({ projectId, hackathonId, queryParams, Wrapper = Fragment }: TIssuesWrapper.Props) {
  const applyIssueDrawerState = useApplyIssueDrawerState();
  const [, setApplyIssueDrawerState] = applyIssueDrawerState;

  const { data: user } = UserReactQueryAdapter.client.useGetMe({});

  const { data, isLoading } = ProjectReactQueryAdapter.client.useGetProjectPublicIssues({
    pathParams: { projectId },
    queryParams: {
      ...queryParams,
      hackathonId,
      sort: "CREATED_AT",
      direction: "DESC",
      pageSize: 100,
    },
  });

  const flatIssues = useMemo(() => data?.pages.flatMap(({ issues }) => issues) ?? [], [data]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        <CardIssueLoading />
        <CardIssueLoading />
      </div>
    );
  }

  function handleOpenDrawer({
    issueId,
    applicationId,
    projectId,
  }: {
    issueId: number;
    applicationId: string;
    projectId: string;
  }) {
    setApplyIssueDrawerState(prevState => ({ ...prevState, isOpen: true, issueId, applicationId, projectId }));
  }

  if (!flatIssues.length) {
    return null;
  }

  return (
    <Wrapper>
      <div className="flex flex-col gap-3">
        {flatIssues.map(issue => (
          <CardIssue
            key={issue.id}
            issueId={issue.id}
            title={issue.title}
            githubLink={issue.htmlUrl}
            status={issue.getApplicationStatus(user?.pendingApplications)}
            applyActionProps={{
              onClick: () =>
                handleOpenDrawer({
                  issueId: issue.id,
                  applicationId: issue.getCurrentUserApplicationId(user?.pendingApplications),
                  projectId,
                }),
              children: <Translate token="v2.pages.hackathons.details.issues.card.apply" />,
            }}
            viewActionProps={{
              onClick: () =>
                handleOpenDrawer({
                  issueId: issue.id,
                  applicationId: issue.getCurrentUserApplicationId(user?.pendingApplications),
                  projectId,
                }),
              children: <Translate token="v2.pages.hackathons.details.issues.card.viewApplication" />,
            }}
            assignedActionProps={{
              children: <Translate token="v2.pages.hackathons.details.issues.card.assigned" />,
            }}
            tokens={{
              createdBy: <Translate token="v2.pages.hackathons.details.issues.card.createdBy" />,
              applicantsCount: (
                <Translate
                  token="v2.pages.hackathons.details.issues.card.applicantsCount"
                  params={{
                    count: issue.applicants.length,
                  }}
                />
              ),
            }}
            createdAt={new Date(issue.createdAt)}
            createdBy={{
              name: issue.author.login,
              avatar: {
                src: issue.author.avatarUrl,
              },
            }}
            repo={{
              name: issue.repo.name,
            }}
            applicants={issue.applicants.map(applicant => ({
              name: applicant.login,
              avatarUrl: applicant.avatarUrl,
            }))}
            applicantsCount={issue.applicants.length}
            tags={issue.labels.map(label => ({
              children: label.name,
            }))}
          />
        ))}
      </div>
      <ApplyIssueDrawer state={applyIssueDrawerState} />
    </Wrapper>
  );
}
