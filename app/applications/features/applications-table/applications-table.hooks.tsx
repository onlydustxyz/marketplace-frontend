"use client";

import { applicationsApiClient } from "api-client/resources/applications";
import { useMemo } from "react";

import { mapIssueToContribution } from "app/p/[slug]/applications/features/applications-table/application-table.utils";
import { useApplyIssueDrawerState } from "app/p/[slug]/features/apply-issue-drawer/apply-issue-drawer.hooks";

import { useStackProjectOverview } from "src/App/Stacks/Stacks";
import { Contribution } from "src/components/Contribution/Contribution";
import displayRelativeDate from "src/utils/displayRelativeDate";

import { Button } from "components/atoms/button/variants/button-default";
import { Avatar } from "components/ds/avatar/avatar";
import { Link } from "components/ds/link/link";
import { TTable } from "components/ds/table/table.types";
import { Translate } from "components/layout/translate/translate";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

export function useApplicationsTable() {
  const { githubUserId } = useCurrentUser();
  const [openProjectOverview] = useStackProjectOverview();
  const applyIssueDrawerState = useApplyIssueDrawerState();
  const [, setApplyIssueDrawerState] = applyIssueDrawerState;

  const { data, ...query } = applicationsApiClient.queries.useInfiniteGetAllApplications({
    queryParams: {
      applicantId: githubUserId,
    },
    options: { enabled: Boolean(githubUserId) },
  });

  const applications = useMemo(() => data?.pages?.flatMap(data => data.applications) ?? [], [data]);
  const hasApplications = Boolean(applications.length);

  function handleProjectClick(slug: string) {
    openProjectOverview({ slug });
  }

  function handleOpenDrawer({ issueId, applicationId }: { issueId: number; applicationId: string }) {
    setApplyIssueDrawerState(prevState => ({ ...prevState, isOpen: true, issueId, applicationId }));
  }

  const columns: TTable.Column[] = useMemo(
    () => [
      {
        key: "CREATED_AT",
        children: <Translate token={"v2.pages.applications.table.columns.date"} />,
        icon: {
          remixName: "ri-time-line",
        },
        width: 120,
      },
      {
        key: "project",
        children: <Translate token={"v2.pages.applications.table.columns.project"} />,
        icon: {
          remixName: "ri-folder-3-line",
        },
      },
      {
        key: "repository",
        children: <Translate token={"v2.pages.applications.table.columns.repository"} />,
        icon: {
          remixName: "ri-git-repository-line",
        },
      },
      {
        key: "contribution",
        children: <Translate token={"v2.pages.applications.table.columns.contribution"} />,
        icon: {
          remixName: "ri-stack-line",
        },
      },
      {
        key: "actions",
        children: "",
        align: "end",
        width: 150,
      },
    ],
    []
  );

  const rows: TTable.Row[] = useMemo(
    () =>
      applications.map(row => {
        const repoName = row.issue.repo.name;
        const truncateLength = 200;
        const contribution = mapIssueToContribution({
          ...row.issue,
          author: { ...row.issue.author, isRegistered: false },
          repository: { ...row.issue.repo, owner: "" },
          createdAt: row.receivedAt,
        });

        return {
          key: String(row.id ?? ""),
          CREATED_AT: <div className={"whitespace-nowrap"}>{displayRelativeDate(row.receivedAt)}</div>,
          project: (
            <Avatar.Labelled avatarProps={{ src: row.project.logoUrl, shape: "square" }}>
              <Link.Button
                onClick={() => handleProjectClick(row.project.slug)}
                className="whitespace-normal text-left"
                title={row.project.name}
              >
                {row.project.name}
              </Link.Button>
            </Avatar.Labelled>
          ),
          repository: (
            <Link href={row.issue.repo.htmlUrl} className="whitespace-nowrap text-left" title={repoName}>
              {truncateLength && repoName.length > truncateLength
                ? repoName.substring(0, truncateLength) + "..."
                : repoName}
            </Link>
          ),
          contribution: <Contribution contribution={contribution} />,
          actions: (
            <div className={"flex justify-end"}>
              <Button
                variant={"secondary-light"}
                size={"m"}
                onClick={() => handleOpenDrawer({ issueId: row.issue.id, applicationId: row.id })}
              >
                <Translate token={"v2.pages.applications.table.rows.seeApplication"} />
              </Button>
            </div>
          ),
        };
      }),
    [applications]
  );

  return { query, applications, hasApplications, columns, rows, applyIssueDrawerState, handleOpenDrawer };
}
