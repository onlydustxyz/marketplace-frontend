import { useIntl } from "src/hooks/useIntl";
import { WorkItem } from "src/components/GithubIssue";
import Issues from "./Issues";
import SidePanel from "src/components/SidePanel";
import { useState } from "react";
import EmptyState from "./EmptyState";
import Tab from "./Tab";
import GitPullRequestLine from "src/icons/GitPullRequestLine";
import RecordCircleLine from "src/icons/RecordCircleLine";

type Props = {
  projectId: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  contributorHandle: string;
  workItems: WorkItem[];
  onWorkItemAdded: (workItem: WorkItem) => void;
};

enum Tabs {
  PullRequests = "pull-requests",
  Issues = "issues",
}

export default function WorkItemSidePanel({
  projectId,
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
        <Tab active={selectedTab === Tabs.PullRequests} onClick={() => setSelectedTab(Tabs.PullRequests)}>
          <GitPullRequestLine />
          {T("payment.form.workItems.pullRequests.tab")}
        </Tab>
        <Tab active={selectedTab === Tabs.Issues} onClick={() => setSelectedTab(Tabs.Issues)}>
          <RecordCircleLine />
          {T("payment.form.workItems.issues.tab")}
        </Tab>
      </div>
      {selectedTab === Tabs.PullRequests && (
        <Issues
          projectId={projectId}
          contributorHandle={contributorHandle}
          workItems={workItems}
          onWorkItemAdded={onWorkItemAdded}
        />
      )}
      {selectedTab === Tabs.Issues && <EmptyState />}
    </SidePanel>
  );
}
