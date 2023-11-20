import { ReactElement, forwardRef, useEffect, useState } from "react";
import { useForm, useFormContext, useWatch } from "react-hook-form";
import { Virtuoso } from "react-virtuoso";
import { GithubUserFragment, WorkItemType, useGithubUserByIdQuery } from "src/__generated/graphql";
import FormInput from "src/components/FormInput";
import FormToggle from "src/components/FormToggle";
import GithubIssue, { Action, GithubIssueProps } from "src/components/GithubCard/GithubIssue/GithubIssue";
import GithubPullRequest, {
  GithubPullRequestProps,
} from "src/components/GithubCard/GithubPullRequest/GithubPullRequest";
import { useIntl } from "src/hooks/useIntl";
import { useShowToaster } from "src/hooks/useToaster";
import EyeOffLine from "src/icons/EyeOffLine";
import Link from "src/icons/Link";
import SearchLine from "src/icons/SearchLine";
import EmptyState from "src/pages/ProjectDetails/Rewards/RewardForm/WorkItemSidePanel/EmptyState";
import Toggle from "src/pages/ProjectDetails/Rewards/RewardForm/WorkItemSidePanel/Toggle";
import OtherIssueInput from "./OtherIssueInput";
import useFilteredContributions from "./useFilteredWorkItems";
import { RewardableWorkItem, contributionToWorkItem } from "./WorkItems";
import GithubCodeReview, { GithubCodeReviewProps } from "src/components/GithubCard/GithubCodeReview/GithubCodeReview";
import { RewardableItem } from "src/api/Project/queries";
import { ShowMore } from "src/components/Table/ShowMore";

const tabNames = {
  [WorkItemType.Issue]: "issues",
  [WorkItemType.PullRequest]: "pullRequests",
  [WorkItemType.CodeReview]: "codeReviews",
};

type ShowMoreProps = {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

type Props = {
  projectId: string;
  contributions: RewardableItem[];
  type: WorkItemType;
  addWorkItem: (workItem: RewardableWorkItem) => void;
  addContribution: (contribution: RewardableItem) => void;
  ignoreContribution: (contribution: RewardableItem) => void;
  unignoreContribution: (contribution: RewardableItem) => void;
  contributorId: number;
  /** NEW PROPS **/
  setIncludeIgnoredItems: (value: boolean) => void;
} & ShowMoreProps;

export default function View({
  projectId,
  contributions,
  type,
  addWorkItem,
  addContribution,
  ignoreContribution,
  unignoreContribution,
  contributorId,
  setIncludeIgnoredItems,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: Props) {
  const { T } = useIntl();
  const { watch, resetField } = useFormContext();
  const { data } = useGithubUserByIdQuery({
    variables: {
      githubUserId: contributorId,
    },
  });

  const tabName = tabNames[type];

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

  const addContributionWithToast = (item: RewardableItem) => {
    addContribution(item);
    showToaster(T(`reward.form.contributions.${tabName}.addedToaster`));
  };

  useEffect(() => {
    if (searchEnabled === false) resetField(`search-${tabName}`);
  }, [searchEnabled]);

  const showIgnoredItemsName = "show-ignored-items";
  const { control } = useForm({
    defaultValues: { [showIgnoredItemsName]: false },
  });
  const showIgnoredItems = useWatch({
    control,
    name: showIgnoredItemsName,
  });

  useEffect(() => {
    setIncludeIgnoredItems(showIgnoredItems);
  }, [showIgnoredItems]);

  // const visibleIssues = showIgnoredItems ? contributions : filter(contributions, { ignored: false });

  const searchPattern = watch(`search-${tabName}`);
  const filteredContributions = useFilteredContributions({ pattern: searchPattern, contributions });

  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden px-6">
      <div className="flex flex-col gap-3 pt-8">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-3">
            {tabName !== "codeReviews" ? (
              <Toggle
                enabled={addOtherIssueEnabled}
                setEnabled={setAddOtherIssueEnabled}
                icon={<Link />}
                label={T(`reward.form.contributions.${tabName}.addOther.toggle`)}
                testId={`add-other-${tabName}-toggle`}
              />
            ) : null}
            {contributions.length > 0 && (
              <Toggle
                enabled={searchEnabled}
                setEnabled={setSearchEnabled}
                icon={<SearchLine />}
                label={T(`reward.form.contributions.${tabName}.search`)}
                testId="search-toggle"
              />
            )}
          </div>
          <div className="flex flex-row items-center gap-2 font-walsheim text-sm font-normal text-greyscale-50">
            <EyeOffLine />

            <div className="inline lg:hidden xl:flex">{T("reward.form.contributions.showIgnored")}</div>
            <FormToggle name={showIgnoredItemsName} control={control} />
          </div>
        </div>
        {addOtherIssueEnabled && type !== WorkItemType.CodeReview && (
          <OtherIssueInput projectId={projectId} type={type} addWorkItem={addWorkItem} contributorId={contributorId} />
        )}
        {searchEnabled && (
          <FormInput
            name={`search-${tabName}`}
            placeholder={T(`reward.form.contributions.${tabName}.searchPlaceholder`)}
            withMargin={false}
            inputClassName="pl-10"
            prefixComponent={
              <div className="mt-0.5">
                <SearchLine className="text-xl text-spaceBlue-200" />
              </div>
            }
            inputProps={{ autoFocus: true }}
          />
        )}
      </div>

      {filteredContributions.length > 0 && data?.githubUsersByPk ? (
        <VirtualizedIssueList
          {...{
            contributions: filteredContributions as RewardableItem[],
            addContribution: addContributionWithToast,
            ignoreContribution,
            unignoreContribution,
            contributor: data?.githubUsersByPk,
            tabName,
            fetchNextPage,
            hasNextPage,
            isFetchingNextPage,
          }}
        />
      ) : (
        <EmptyState indexedAt={data?.githubRepos[0].indexedAt} />
      )}
    </div>
  );
}

const Scroller = forwardRef<HTMLDivElement>((props, ref) => (
  <div
    className="overflow-auto scrollbar-thin scrollbar-thumb-white/12 scrollbar-thumb-rounded scrollbar-w-1.5"
    {...props}
    ref={ref}
  />
));

Scroller.displayName = "Scroller";

const ListBuilder = (tabName: string) => {
  const ListComponent = forwardRef<HTMLDivElement>((props, ref) => (
    <div className="mr-1.5 flex flex-col gap-2 p-px" {...props} ref={ref} data-testid={`eligible-${tabName}`} />
  ));
  ListComponent.displayName = "List";
  return ListComponent;
};

type RewardItemType = GithubIssueProps | GithubPullRequestProps | GithubCodeReviewProps;

function getWorkItem(type: WorkItemType, props: RewardItemType): ReactElement | null {
  switch (type) {
    case WorkItemType.Issue:
      return <GithubIssue {...(props as GithubIssueProps)} />;
    case WorkItemType.PullRequest:
      return <GithubPullRequest {...(props as GithubPullRequestProps)} />;
    case WorkItemType.CodeReview:
      return <GithubCodeReview {...(props as GithubCodeReviewProps)} />;
    default:
      return null;
  }
}

interface VirtualizedIssueListProps {
  contributions: RewardableItem[];
  contributor: GithubUserFragment;
  addContribution: (contribution: RewardableItem) => void;
  ignoreContribution: (contribution: RewardableItem) => void;
  unignoreContribution: (contribution: RewardableItem) => void;
  tabName: string;
}

const VirtualizedIssueList = ({
  contributions,
  contributor,
  addContribution,
  ignoreContribution,
  unignoreContribution,
  tabName,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: VirtualizedIssueListProps & ShowMoreProps) => {
  const Footer = () => {
    if (hasNextPage) {
      return (
        <div className="my-4">
          <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} />
        </div>
      );
    }
    return <></>;
  };
  return (
    <Virtuoso
      data={contributions}
      endReached={fetchNextPage}
      components={{
        Scroller,
        List: ListBuilder(tabName),
        Footer,
      }}
      itemContent={(_, contribution) => {
        const workItem = contributionToWorkItem(contribution);
        if (!workItem) return;

        const sharedProps = {
          key: contribution.id,
          issue: workItem.githubIssue,
          pullRequest: workItem.githubPullRequest,
          codeReview: workItem.githubCodeReview,
          action: Action.Add,
          onClick: () => addContribution(contribution),
          secondaryAction: contribution.ignored ? Action.UnIgnore : Action.Ignore,
          onSecondaryClick: () =>
            contribution.ignored ? unignoreContribution(contribution) : ignoreContribution(contribution),
          ignored: !!contribution.ignored,
          addMarginTopForVirtuosoDisplay: true,
          contributor,
        };

        return getWorkItem(workItem.type, sharedProps as RewardItemType);
      }}
    />
  );
};
