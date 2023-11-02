import { useIntl } from "src/hooks/useIntl";
import { WorkItems } from "./WorkItems/WorkItems";
import SidePanel from "src/components/SidePanel";
import { useState } from "react";
import Tab from "./Tab";
import GitPullRequestLine from "src/icons/GitPullRequestLine";
import IssueOpen from "src/assets/icons/IssueOpen";
import OtherWorkForm from "./OtherWorkForm";
import DiscussLine from "src/icons/DiscussLine";
import { viewportConfig } from "src/config";
import { useMediaQuery } from "usehooks-ts";
import { WorkItemFragment, WorkItemType } from "src/__generated/graphql";
import CodeReviewIcon from "src/assets/icons/CodeReviewIcon";

type Props = {
  projectId: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  contributorId: number;
  contributorHandle: string;
  workItems: WorkItemFragment[];
  addWorkItem: (workItem: WorkItemFragment) => void;
};

enum Tabs {
  PullRequest = "PullRequest",
  Issue = "Issue",
  CodeReview = "CodeReview",
  Other = "Other",
}

export default function WorkItemSidePanel({
  projectId,
  contributorId,
  contributorHandle,
  workItems,
  addWorkItem,
  ...props
}: Props) {
  const { T } = useIntl();
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);

  const [selectedTab, setSelectedTab] = useState(Tabs.PullRequest);

  return (
    <SidePanel {...props}>
      <div className="flex h-full flex-col">
        <div className="px-6 py-8 font-belwe text-2xl font-normal text-greyscale-50">
          {T("reward.form.contributions.addContribution")}
        </div>
        <div className="[2xl]:gap-6 flex flex-row items-center gap-5 border-b border-greyscale-50/8 px-6">
          <Tab
            testId="tab-pull-requests"
            active={selectedTab === Tabs.PullRequest}
            onClick={() => setSelectedTab(Tabs.PullRequest)}
          >
            <GitPullRequestLine />
            {isXl
              ? T("reward.form.contributions.pullRequests.tab")
              : T("reward.form.contributions.pullRequests.tabShort")}
          </Tab>
          <Tab testId="tab-issues" active={selectedTab === Tabs.Issue} onClick={() => setSelectedTab(Tabs.Issue)}>
            <IssueOpen />
            {T("reward.form.contributions.issues.tab")}
          </Tab>
          <Tab
            testId="tab-code-reviews"
            active={selectedTab === Tabs.CodeReview}
            onClick={() => setSelectedTab(Tabs.CodeReview)}
          >
            <CodeReviewIcon />

            {T("reward.form.contributions.codeReviews.tab")}
          </Tab>
          <Tab testId="tab-other-work" active={selectedTab === Tabs.Other} onClick={() => setSelectedTab(Tabs.Other)}>
            <DiscussLine />
            {isXl ? T("reward.form.contributions.other.tab") : T("reward.form.contributions.other.tabShort")}
          </Tab>
        </div>

        {selectedTab === Tabs.Other ? (
          <OtherWorkForm
            projectId={projectId}
            contributorHandle={contributorHandle}
            addWorkItem={addWorkItem}
          />
        ) : (
          <WorkItems
            projectId={projectId}
            contributorId={contributorId}
            workItems={workItems}
            addWorkItem={addWorkItem}
            type={WorkItemType[selectedTab]}
          />
        )}
      </div>
    </SidePanel>
  );
}
