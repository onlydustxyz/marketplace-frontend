import ProjectApi from "src/api/Project";

import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { EmptyState } from "./components/empty-state/empty-state";
import { IssueCard } from "./components/issue-card/issue-card";
import { TGoodFirstIssues } from "./good-first-issues.types";

// TODO: Do infinite scroll
// TODO: Add in translate
// TODO: Truncate title if > 2 lines
export function GoodFirstIssues({ projectId, organizations }: TGoodFirstIssues.Props) {
  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    ProjectApi.queries.useProjectGoodFirstIssuesInfiniteList({
      params: { projectId },
    });

  const issues = data?.pages?.flatMap(data => data.issues);

  return (
    <Card background="base" hasPadding={false}>
      <Flex direction="col" className="gap-4">
        <Flex alignItems="center" className="gap-3 border-b border-greyscale-50/8 p-6 pb-4">
          <Flex alignItems="center" justifyContent="center" className="rounded-lg bg-card-background-heavy p-3">
            <Icon remixName="ri-thumb-up-line" size={20} />
          </Flex>

          <Flex direction="col" className="gap-1">
            <Typography variant="body-m-bold">Good first issues</Typography>

            <Typography variant="body-s" className="text-spaceBlue-200">
              Apply to a list of curated issues well suited for beginners to kickstart your journey.
            </Typography>
          </Flex>
        </Flex>

        {issues && issues?.length > 0 ? (
          <Flex direction="col" className="gap-4 p-6 pt-0">
            {issues?.map(issue => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </Flex>
        ) : (
          <EmptyState organizations={organizations} />
        )}
      </Flex>
    </Card>
  );
}
