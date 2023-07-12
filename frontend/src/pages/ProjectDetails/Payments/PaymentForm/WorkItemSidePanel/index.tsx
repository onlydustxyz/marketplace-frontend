import { useIntl } from "src/hooks/useIntl";
import { WorkItem } from "src/components/GithubIssue";
import Issues from "./Issues";
import SidePanel from "src/components/SidePanel";
import { useState } from "react";
import Tab from "./Tab";
import GitPullRequestLine from "src/icons/GitPullRequestLine";
import IssueOpen from "src/assets/icons/IssueOpen";
import OtherWorkForm from "./OtherWorkForm";
import DiscussLine from "src/icons/DiscussLine";
import { Type } from "src/__generated/graphql";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";

type Props = {
  projectId: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  contributorId: number;
  contributorHandle: string;
  workItems: WorkItem[];
  onWorkItemAdded: (workItem: WorkItem) => void;
};

enum Tabs {
  PullRequests = "pull-requests",
  Issues = "issues",
  Other = "other",
}

export default function WorkItemSidePanel({
  projectId,
  contributorId,
  contributorHandle,
  workItems,
  onWorkItemAdded,
  ...props
}: Props) {
  const { T } = useIntl();
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);

  const [selectedTab, setSelectedTab] = useState(Tabs.PullRequests);

  return (
    <SidePanel {...props}>
      <div className="flex h-full flex-col gap-8">
        <div className="px-6 pt-8 font-belwe text-2xl font-normal text-greyscale-50">
          {T("reward.form.workItems.addWorkItem")}
        </div>
        <div className="flex flex-row items-center gap-8 border-b border-greyscale-50/8 px-6">
          <Tab
            testId="tab-pull-requests"
            active={selectedTab === Tabs.PullRequests}
            onClick={() => setSelectedTab(Tabs.PullRequests)}
          >
            <GitPullRequestLine />
            {isXl ? T("reward.form.workItems.pullRequests.tab") : T("reward.form.workItems.pullRequests.tabShort")}
          </Tab>
          <Tab testId="tab-issues" active={selectedTab === Tabs.Issues} onClick={() => setSelectedTab(Tabs.Issues)}>
            <IssueOpen />
            {T("reward.form.workItems.issues.tab")}
          </Tab>
          <Tab testId="tab-other-work" active={selectedTab === Tabs.Other} onClick={() => setSelectedTab(Tabs.Other)}>
            <DiscussLine />
            {isXl ? T("reward.form.workItems.other.tab") : T("reward.form.workItems.other.tabShort")}
          </Tab>
        </div>
        {selectedTab === Tabs.PullRequests && (
          <Issues
            projectId={projectId}
            contributorId={contributorId}
            workItems={workItems}
            onWorkItemAdded={onWorkItemAdded}
            type={Type.PullRequest}
          />
        )}
        {selectedTab === Tabs.Issues && (
          <Issues
            projectId={projectId}
            contributorId={contributorId}
            workItems={workItems}
            onWorkItemAdded={onWorkItemAdded}
            type={Type.Issue}
          />
        )}
        {selectedTab === Tabs.Other && (
          <OtherWorkForm
            projectId={projectId}
            contributorHandle={contributorHandle}
            onWorkItemAdded={onWorkItemAdded}
          />
        )}
      </div>
    </SidePanel>
  );
}
