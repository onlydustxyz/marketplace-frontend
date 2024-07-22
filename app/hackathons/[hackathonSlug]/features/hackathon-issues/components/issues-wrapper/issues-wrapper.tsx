"use client";

import { ProjectReactQueryAdapter } from "core/application/react-query-adapter/project";
import { useContext, useMemo } from "react";

import { HackathonIssuesContext } from "app/hackathons/[hackathonSlug]/features/hackathon-issues/context/hackathon-issues.context";

import { Translate } from "components/layout/translate/translate";
import { CardIssue, CardIssueLoading } from "components/molecules/cards/card-issue";

import { TIssuesWrapper } from "./issues-wrapper.types";

export function IssuesWrapper({ projectId }: TIssuesWrapper.Props) {
  const { hackathonId, queryParams } = useContext(HackathonIssuesContext);

  const { data, isLoading } = ProjectReactQueryAdapter.client.useGetProjectPublicIssues({
    pathParams: { projectId },
    queryParams: {
      ...queryParams,
      hackathonId,
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

  return (
    <div className="flex flex-col gap-3">
      {flatIssues.map(issue => (
        <CardIssue
          key={issue.id}
          title={issue.title}
          githubLink={issue.htmlUrl}
          applyActionProps={{
            onClick: () => console.log("Apply"),
            children: <Translate token="v2.pages.hackathons.details.issues.card.apply" />,
          }}
          viewActionProps={{
            onClick: () => console.log("View application"),
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
          applicantsCount={issue.applicants.length}
          tags={issue.labels.map(label => ({
            children: label.name,
          }))}
        />
      ))}
    </div>
  );
}
