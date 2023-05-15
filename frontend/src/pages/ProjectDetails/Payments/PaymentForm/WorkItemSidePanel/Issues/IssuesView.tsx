import { useEffect, useMemo, useState } from "react";
import GithubIssue, { Action, WorkItem } from "src/components/GithubIssue";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
import Link from "src/icons/Link";
import EmptyState from "src/pages/ProjectDetails/Payments/PaymentForm/WorkItemSidePanel/EmptyState";
import Toggle from "src/pages/ProjectDetails/Payments/PaymentForm/WorkItemSidePanel/Toggle";
import OtherIssueInput from "./OtherIssueInput";
import FormToggle from "src/pages/ProjectDetails/Payments/PaymentForm/WorkItemSidePanel/OtherWorkForm/FormToggle";
import { useForm, useWatch } from "react-hook-form";
import EyeOffLine from "src/icons/EyeOffLine";
import FormInput from "src/components/FormInput";
import SearchLine from "src/icons/SearchLine";
import { useFormContext } from "react-hook-form";
import useFilteredWorkItems from "./useFilteredWorkItems";
import { chain, filter, some } from "lodash";
import useUnpaidIssues from "./useUnpaidIssues";
import { Type } from "src/__generated/graphql";

type Props = {
  projectId: string;
  contributorId: number;
  workItems: WorkItem[];
  onWorkItemAdded: (workItem: WorkItem) => void;
  onWorkItemIgnored: (workItem: WorkItem) => void;
  onWorkItemUnignored: (workItem: WorkItem) => void;
};

export default function IssuesView({
  projectId,
  contributorId,
  workItems,
  onWorkItemAdded,
  onWorkItemIgnored,
  onWorkItemUnignored,
}: Props) {
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
    if (searchEnabled === false) resetField("search-issues");
  }, [searchEnabled]);

  const showIgnoredItemsName = "show-ignored-items";
  const { control } = useForm({ defaultValues: { [showIgnoredItemsName]: false } });
  const showIgnoredItems = useWatch({
    control,
    name: showIgnoredItemsName,
  });

  const { data: unpaidIssues } = useUnpaidIssues({
    projectId,
    authorId: contributorId,
    type: Type.Issue,
  });

  const issues: WorkItem[] = useMemo(
    () => chain(unpaidIssues).differenceBy(workItems, "id").value(),
    [unpaidIssues, workItems]
  );

  const visibleIssues = showIgnoredItems ? issues : filter(issues, { ignored: false });

  const searchPattern = watch("search-issues");
  const filteredIssues = useFilteredWorkItems({ pattern: searchPattern, workItems: visibleIssues });

  return (
    <div className="flex flex-col gap-4 overflow-hidden -mr-4 h-full">
      <div className="flex flex-col gap-3 mr-4">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-3">
            <Toggle
              enabled={addOtherIssueEnabled}
              setEnabled={setAddOtherIssueEnabled}
              icon={<Link />}
              label={T("payment.form.workItems.issues.addOther.toggle")}
              testId="add-other-issue-toggle"
            />
            {issues.length > 0 && (
              <Toggle
                enabled={searchEnabled}
                setEnabled={setSearchEnabled}
                icon={<SearchLine />}
                label={T("payment.form.workItems.issues.search")}
                testId="search-toggle"
              />
            )}
          </div>
          {some(issues, { ignored: true }) && (
            <div className="flex flex-row items-center gap-2 text-greyscale-50 font-walsheim font-normal text-sm">
              <EyeOffLine />
              {T("payment.form.workItems.showIgnored")}
              <FormToggle name={showIgnoredItemsName} control={control} />
            </div>
          )}
        </div>
        {addOtherIssueEnabled && <OtherIssueInput projectId={projectId} onWorkItemAdded={onIssueAdded} />}
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
            inputProps={{ autoFocus: true }}
          />
        )}
      </div>
      {filteredIssues.length > 0 ? (
        <div
          data-testid="elligible-issues"
          className="flex flex-col gap-3 h-full p-px pr-4 overflow-auto scrollbar-thin scrollbar-w-2 scrollbar-thumb-spaceBlue-500 scrollbar-thumb-rounded"
        >
          {filteredIssues.map(issue => (
            <GithubIssue
              key={issue.id}
              workItem={issue}
              action={Action.Add}
              onClick={() => onIssueAdded(issue)}
              secondaryAction={issue.ignored ? Action.UnIgnore : Action.Ignore}
              onSecondaryClick={() => (issue.ignored ? onWorkItemUnignored(issue) : onWorkItemIgnored(issue))}
              ignored={issue.ignored}
            />
          ))}
        </div>
      ) : (
        <div className="mr-4">
          <EmptyState />
        </div>
      )}
    </div>
  );
}
