import { useState } from "react";
import Callout from "src/components/Callout";
import GithubIssue, { Action, WorkItem } from "src/components/GithubIssue";
import QueryWrapper, { QueryResult } from "src/components/QueryWrapper";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
import Link from "src/icons/Link";
import EmptyState from "src/pages/ProjectDetails/Payments/PaymentForm/WorkItemSidePanel/EmptyState";
import Toggle from "src/pages/ProjectDetails/Payments/PaymentForm/WorkItemSidePanel/Toggle";
import OtherPrInput from "./OtherPrInput";
import { MAX_ISSUE_COUNT } from ".";

type Props<T, E> = {
  workItems: WorkItem[];
  onWorkItemAdded: (workItem: WorkItem) => void;
  isMore: boolean;
  query: QueryResult<T, E>;
};

export default function PullRequestsView<T, E>({ workItems, onWorkItemAdded, isMore, query }: Props<T, E>) {
  const { T } = useIntl();

  const [addOtherPrEnabled, setAddOtherPrEnabled] = useState(false);
  const showToaster = useShowToaster();

  const onIssueAdded = (item: WorkItem) => {
    onWorkItemAdded(item);
    showToaster(T("payment.form.workItems.pullRequests.addedToaster"));
  };

  return (
    <div className="flex flex-col gap-4 overflow-hidden -mr-4 h-full">
      <div className="flex flex-col gap-3 mr-4">
        <Toggle
          enabled={addOtherPrEnabled}
          setEnabled={setAddOtherPrEnabled}
          icon={<Link />}
          label={T("payment.form.workItems.pullRequests.addOther.toggle")}
          testId="add-other-pr-toggle"
        />
        {addOtherPrEnabled && <OtherPrInput onWorkItemAdded={onIssueAdded} />}
      </div>
      <QueryWrapper query={query}>
        {workItems.length > 0 ? (
          <div
            data-testid="elligible-pulls"
            className="flex flex-col gap-3 h-full p-px pr-4 overflow-auto scrollbar-thin scrollbar-w-2 scrollbar-thumb-spaceBlue-500 scrollbar-thumb-rounded"
          >
            {workItems.map(pr => (
              <GithubIssue key={pr.id} workItem={pr} action={Action.Add} onClick={() => onIssueAdded(pr)} />
            ))}
          </div>
        ) : (
          <div className="mr-4">
            <EmptyState />
          </div>
        )}
        {isMore && (
          <div className="mr-4">
            <Callout>{T("payment.form.workItems.pullRequests.moreCallout", { count: MAX_ISSUE_COUNT })}</Callout>
          </div>
        )}
      </QueryWrapper>
    </div>
  );
}
