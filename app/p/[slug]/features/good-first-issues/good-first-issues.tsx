import { useMemo } from "react";

import ProjectApi from "src/api/Project";
import { ShowMore } from "src/components/Table/ShowMore";

import { Badge } from "components/ds/badge/badge";
import { Card } from "components/ds/card/card";
import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { ApplyIssueDrawer } from "components/features/apply-issue-drawer/apply-issue-drawer";
import { useApplyIssueDrawerState } from "components/features/apply-issue-drawer/apply-issue-drawer.hooks";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

import { EmptyState } from "./components/empty-state/empty-state";
import { IssueCard } from "./components/issue-card/issue-card";
import { TGoodFirstIssues } from "./good-first-issues.types";

export function GoodFirstIssues({ projectId }: TGoodFirstIssues.Props) {
  const applyIssueDrawerState = useApplyIssueDrawerState();
  const [, setApplyIssueDrawerState] = applyIssueDrawerState;

  const { user } = useCurrentUser();

  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    ProjectApi.queries.useProjectGoodFirstIssuesInfiniteList({
      params: { projectId },
    });

  const issues = useMemo(() => {
    return data?.pages?.flatMap(data => data.issues);
  }, [data]);

  const totalIssues = data?.pages[0]?.totalItemNumber;

  function renderContent() {
    if (isError) {
      return <EmptyState projectId={projectId} />;
    }

    if (isLoading) {
      return (
        <Flex direction="col" className="gap-4 p-6 pt-0">
          <SkeletonEl height="158px" width="100%" variant="rounded" />

          <SkeletonEl height="158px" width="100%" variant="rounded" />
        </Flex>
      );
    }

    if (issues?.length) {
      return (
        <Flex direction="col" className="gap-4 p-6 pt-0">
          {issues.map(issue => (
            <IssueCard
              key={issue.id}
              issue={issue}
              onDrawerOpen={() => {
                setApplyIssueDrawerState({
                  isOpen: true,
                  issueId: issue.id,
                  applicationId:
                    user?.pendingApplications?.find(application => application.issue?.id === issue.id)?.id ?? "",
                });
              }}
            />
          ))}

          {hasNextPage ? <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} isInfinite /> : null}

          <ApplyIssueDrawer state={applyIssueDrawerState} />
        </Flex>
      );
    }

    return <EmptyState projectId={projectId} />;
  }

  return (
    <Card background="base" hasPadding={false}>
      <Flex direction="col" className="gap-4">
        <Flex alignItems="center" className="gap-3 border-b border-greyscale-50/8 p-6 pb-4">
          <Flex alignItems="center" justifyContent="center" className="rounded-lg bg-card-background-heavy p-3">
            <Icon remixName="ri-thumb-up-line" size={20} />
          </Flex>

          <Flex direction="col" className="gap-1" width="full">
            <Flex alignItems="center" justifyContent="between">
              <Typography
                variant="body-m-bold"
                translate={{ token: "v2.pages.project.overview.goodFirstIssues.title" }}
              />

              {totalIssues ? <Badge value={totalIssues} size="s" /> : null}
            </Flex>

            <Typography
              variant="body-s"
              className="text-spaceBlue-200"
              translate={{ token: "v2.pages.project.overview.goodFirstIssues.description" }}
            />
          </Flex>
        </Flex>

        {renderContent()}
      </Flex>
    </Card>
  );
}
