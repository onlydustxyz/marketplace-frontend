import { useEffect, useState } from "react";
import Callout from "src/components/Callout";
import GithubIssue, { Action, WorkItem } from "src/components/GithubIssue";
import QueryWrapper, { QueryResult } from "src/components/QueryWrapper";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
import Link from "src/icons/Link";
import EmptyState from "src/pages/ProjectDetails/Payments/PaymentForm/WorkItemSidePanel/EmptyState";
import Toggle from "src/pages/ProjectDetails/Payments/PaymentForm/WorkItemSidePanel/Toggle";
import OtherIssueInput from "./OtherIssueInput";
import { SEARCH_MAX_DAYS_COUNT } from "src/pages/ProjectDetails/Payments/PaymentForm";
import FormInput from "src/components/FormInput";
import SearchLine from "src/icons/SearchLine";
import { useFormContext } from "react-hook-form";
import useFilteredWorkItems from "./useFilteredWorkItems";

type Props<T, E> = {
  workItems: WorkItem[];
  onWorkItemAdded: (workItem: WorkItem) => void;
  onWorkItemIgnored: (workItem: WorkItem) => void;
  query: QueryResult<T, E>;
};

export default function IssuesView<T, E>({ workItems, onWorkItemAdded, onWorkItemIgnored, query }: Props<T, E>) {
  const { T } = useIntl();
  const { watch, resetField } = useFormContext();

  const [addOtherIssueEnabled, setStateAddOtherIssueEnabled] = useState(false);
  const [searchEnabled, setStateSearchEnabled] = useState(false);
  const setAddOtherIssueEnabled = (value: boolean) => {
    setStateAddOtherIssueEnabled(value);
    setStateSearchEnabled(false);
  };
  const setSearchEnabled = (value: boolean) => {
    setStateSearchEnabled(value);
    setStateAddOtherIssueEnabled(false);
  };
  const showToaster = useShowToaster();

  const onIssueAdded = (item: WorkItem) => {
    onWorkItemAdded(item);
    showToaster(T("payment.form.workItems.issues.addedToaster"));
  };

  useEffect(() => {
    if (searchEnabled === false) {
      resetField("search-issues");
    }
  }, [searchEnabled]);

  const searchPattern = watch("search-issues");
  const filteredWorkItems = useFilteredWorkItems({ pattern: searchPattern, workItems });

  return (
    <div className="flex flex-col gap-4 overflow-hidden -mr-4 h-full">
      <div className="flex flex-col gap-3 mr-4">
        <div className="flex flex-row gap-3">
          <Toggle
            enabled={addOtherIssueEnabled}
            setEnabled={setAddOtherIssueEnabled}
            icon={<Link />}
            label={T("payment.form.workItems.issues.addOther.toggle")}
            testId="add-other-issue-toggle"
          />
          {workItems.length > 0 && (
            <Toggle
              enabled={searchEnabled}
              setEnabled={setSearchEnabled}
              icon={<SearchLine />}
              label={T("payment.form.workItems.issues.search")}
              testId="search-toggle"
            />
          )}
        </div>
        {addOtherIssueEnabled && <OtherIssueInput onWorkItemAdded={onIssueAdded} />}
        {searchEnabled && (
          <FormInput
            name="search-issues"
            placeholder={T("payment.form.workItems.issues.searchPlaceholder")}
            withMargin={false}
            inputClassName="pl-10"
            prefixComponent={
              <div className="mt-0.5">
                <SearchLine className="text-spaceBlue-200 text-xl" />
              </div>
            }
          />
        )}
      </div>
      <QueryWrapper query={query}>
        {filteredWorkItems.length > 0 ? (
          <div
            data-testid="elligible-issues"
            className="flex flex-col gap-3 h-full p-px pr-4 overflow-auto scrollbar-thin scrollbar-w-2 scrollbar-thumb-spaceBlue-500 scrollbar-thumb-rounded"
          >
            {filteredWorkItems.map(issue => (
              <GithubIssue
                key={issue.id}
                workItem={issue}
                action={Action.Add}
                onClick={() => onIssueAdded(issue)}
                secondaryAction={Action.Ignore}
                onSecondaryClick={() => onWorkItemIgnored(issue)}
              />
            ))}
          </div>
        ) : (
          <div className="mr-4">
            <EmptyState />
          </div>
        )}
        <div className="mr-4">
          <Callout>{T("payment.form.workItems.issues.moreCallout", { count: SEARCH_MAX_DAYS_COUNT })}</Callout>
        </div>
      </QueryWrapper>
    </div>
  );
}
