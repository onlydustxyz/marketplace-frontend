"use client";

import { ProjectReactQueryAdapter } from "core/application/react-query-adapter/project";
import { ListIssueInterface } from "core/domain/issue/models/list-issue-model";
import { AnyType } from "core/helpers/types";
import { useContext, useMemo } from "react";

import { HackathonIssuesContext } from "app/hackathons/[hackathonSlug]/features/hackathon-issues/context/hackathon-issues.context";

import { ApplyIssueDrawer } from "components/features/apply-issue-drawer/apply-issue-drawer";
import { useApplyIssueDrawerState } from "components/features/apply-issue-drawer/apply-issue-drawer.hooks";
import { Translate } from "components/layout/translate/translate";
import { CardIssue, CardIssueLoading, CardIssuePort } from "components/molecules/cards/card-issue";

import { NEXT_ROUTER } from "constants/router";

import { TIssuesWrapper } from "./issues-wrapper.types";

export function IssuesWrapper({ projectId }: TIssuesWrapper.Props) {
  const { hackathonId, queryParams } = useContext(HackathonIssuesContext);
  const applyIssueDrawerState = useApplyIssueDrawerState();
  const [, setApplyIssueDrawerState] = applyIssueDrawerState;

  const { data, isLoading } = ProjectReactQueryAdapter.client.useGetProjectPublicIssues({
    pathParams: { projectId },
    queryParams: {
      ...queryParams,
      hackathonId,
      pageSize: 100,
    },
  });

  const flatIssues = useMemo(() => data?.pages.flatMap(({ issues }) => issues) ?? [], [data]);

  function buildFirstAssignee(issue: ListIssueInterface): CardIssuePort<AnyType>["assignee"] {
    const firstAssignee = issue.getFirstAssignee();

    if (firstAssignee) {
      return {
        avatar: { src: firstAssignee.avatarUrl },
        name: firstAssignee.login,
        href: NEXT_ROUTER.publicProfile.root(firstAssignee.login),
      };
    }

    return undefined;
  }

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

  return (
    <>
      <div className="flex flex-col gap-3">
        {flatIssues.map(issue => (
          <CardIssue
            key={issue.id}
            title={issue.title}
            githubLink={issue.htmlUrl}
            status={issue.getApplicationStatus()}
            applyActionProps={{
              onClick: () =>
                handleOpenDrawer({
                  issueId: issue.id,
                  applicationId: issue.currentUserApplication?.id ?? "",
                  projectId,
                }),
              children: <Translate token="v2.pages.hackathons.details.issues.card.apply" />,
            }}
            viewActionProps={{
              onClick: () =>
                handleOpenDrawer({
                  issueId: issue.id,
                  applicationId: issue.currentUserApplication?.id ?? "",
                  projectId,
                }),
              children: <Translate token="v2.pages.hackathons.details.issues.card.viewApplication" />,
            }}
            tokens={{
              githubLink: <Translate token="v2.pages.hackathons.details.issues.card.viewOnGithub" />,
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
            assignee={buildFirstAssignee(issue)}
            applicantsCount={issue.applicants.length}
            tags={issue.labels.map(label => ({
              children: label.name,
            }))}
          />
        ))}
      </div>
      <ApplyIssueDrawer state={applyIssueDrawerState} />
    </>
  );
}
