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

  const [selectedTab, setSelectedTab] = useState(Tabs.PullRequests);

  return (
    <SidePanel {...props} title={T("payment.form.workItems.addWorkItem")}>
      <div className="flex flex-row items-center gap-8 border-b border-greyscale-50/8">
        <Tab
          testId="tab-pull-requests"
          active={selectedTab === Tabs.PullRequests}
          onClick={() => setSelectedTab(Tabs.PullRequests)}
        >
          <GitPullRequestLine />
          {T("payment.form.workItems.pullRequests.tab")}
        </Tab>
        <Tab testId="tab-issues" active={selectedTab === Tabs.Issues} onClick={() => setSelectedTab(Tabs.Issues)}>
          <IssueOpen />
          {T("payment.form.workItems.issues.tab")}
        </Tab>
        <Tab testId="tab-other-work" active={selectedTab === Tabs.Other} onClick={() => setSelectedTab(Tabs.Other)}>
          <DiscussLine />
          {T("payment.form.workItems.other.tab")}
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
        <OtherWorkForm projectId={projectId} contributorHandle={contributorHandle} onWorkItemAdded={onWorkItemAdded} />
      )}
    </SidePanel>
  );
}
