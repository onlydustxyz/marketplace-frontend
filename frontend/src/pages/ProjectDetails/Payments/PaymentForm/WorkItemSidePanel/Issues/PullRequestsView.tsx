import { useEffect, useState } from "react";
import Callout from "src/components/Callout";
import GithubIssue, { Action, WorkItem } from "src/components/GithubIssue";
import QueryWrapper, { QueryResult } from "src/components/QueryWrapper";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
import Link from "src/icons/Link";
import EmptyState from "src/pages/ProjectDetails/Payments/PaymentForm/WorkItemSidePanel/EmptyState";
import Toggle from "src/pages/ProjectDetails/Payments/PaymentForm/WorkItemSidePanel/Toggle";
import OtherPrInput from "./OtherPrInput";
import { SEARCH_MAX_DAYS_COUNT } from "src/pages/ProjectDetails/Payments/PaymentForm";
import FormToggle from "src/pages/ProjectDetails/Payments/PaymentForm/WorkItemSidePanel/OtherWorkForm/FormToggle";
import { useForm, useWatch } from "react-hook-form";
import EyeOffLine from "src/icons/EyeOffLine";
import { useFormContext } from "react-hook-form";
import useFilteredWorkItems from "./useFilteredWorkItems";
import SearchLine from "src/icons/SearchLine";
import FormInput from "src/components/FormInput";
import { sortBy } from "lodash";

type Props<T, E> = {
  workItems: WorkItem[];
  ignoredItems: WorkItem[];
  onWorkItemAdded: (workItem: WorkItem) => void;
  onWorkItemIgnored: (workItem: WorkItem) => void;
  onWorkItemUnignored: (workItem: WorkItem) => void;
  query: QueryResult<T, E>;
};

export default function PullRequestsView<T, E>({
  workItems,
  ignoredItems,
  onWorkItemAdded,
  onWorkItemIgnored,
  onWorkItemUnignored,
  query,
}: Props<T, E>) {
  const { T } = useIntl();
  const { watch, resetField } = useFormContext();

  const [addOtherPrEnabled, setStateAddOtherPrEnabled] = useState(false);
  const [searchEnabled, setStateSearchEnabled] = useState(false);
  const setAddOtherPrEnabled = (value: boolean) => {
    setStateAddOtherPrEnabled(value);
    setStateSearchEnabled(false);
  };
  const setSearchEnabled = (value: boolean) => {
    setStateSearchEnabled(value);
    setStateAddOtherPrEnabled(false);
  };

  const showToaster = useShowToaster();

  const onIssueAdded = (item: WorkItem) => {
    onWorkItemAdded(item);
    showToaster(T("payment.form.workItems.pullRequests.addedToaster"));
  };

  useEffect(() => {
    if (searchEnabled === false) {
      resetField("search-prs");
    }
  }, [searchEnabled]);

  const showIgnoredItemsName = "show-ignored-items";
  const { control } = useForm({ defaultValues: { [showIgnoredItemsName]: false } });
  const showIgnoredItems = useWatch({
    control,
    name: showIgnoredItemsName,
  });

  const visibleItems = showIgnoredItems
    ? sortBy([...workItems, ...ignoredItems.map(item => ({ ...item, ignored: true }))], "createdAt")
    : workItems;

  const searchPattern = watch("search-issues");
  const filteredWorkItems = useFilteredWorkItems({ pattern: searchPattern, workItems: visibleItems });

  return (
    <div className="flex flex-col gap-4 overflow-hidden -mr-4 h-full">
      <div className="flex flex-col gap-3 mr-4">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-3">
            <Toggle
              enabled={addOtherPrEnabled}
              setEnabled={setAddOtherPrEnabled}
              icon={<Link />}
              label={T("payment.form.workItems.pullRequests.addOther.toggle")}
              testId="add-other-pr-toggle"
            />
            {workItems.length > 0 && (
              <Toggle
                enabled={searchEnabled}
                setEnabled={setSearchEnabled}
                icon={<SearchLine />}
                label={T("payment.form.workItems.pullRequests.search")}
                testId="search-toggle"
              />
            )}
          </div>
          {ignoredItems.length > 0 && (
            <div className="flex flex-row items-center gap-2 text-greyscale-50 font-walsheim font-normal text-sm">
              <EyeOffLine />
              {T("payment.form.workItems.showIgnored")}
              <FormToggle name={showIgnoredItemsName} control={control} />
            </div>
          )}
        </div>
        {addOtherPrEnabled && <OtherPrInput onWorkItemAdded={onIssueAdded} />}
        {searchEnabled && (
          <FormInput
            name="search-prs"
            placeholder={T("payment.form.workItems.pullRequests.searchPlaceholder")}
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
            data-testid="elligible-pulls"
            className="flex flex-col gap-3 h-full p-px pr-4 overflow-auto scrollbar-thin scrollbar-w-2 scrollbar-thumb-spaceBlue-500 scrollbar-thumb-rounded"
          >
            {filteredWorkItems.map(pr => (
              <GithubIssue
                key={pr.id}
                workItem={pr}
                action={Action.Add}
                onClick={() => onIssueAdded(pr)}
                secondaryAction={pr.ignored ? Action.UnIgnore : Action.Ignore}
                onSecondaryClick={() => (pr.ignored ? onWorkItemUnignored(pr) : onWorkItemIgnored(pr))}
              />
            ))}
          </div>
        ) : (
          <div className="mr-4">
            <EmptyState />
          </div>
        )}
        <div className="mr-4">
          <Callout>{T("payment.form.workItems.pullRequests.moreCallout", { count: SEARCH_MAX_DAYS_COUNT })}</Callout>
        </div>
      </QueryWrapper>
    </div>
  );
}
