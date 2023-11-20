import { cn } from "src/utils/cn";
import { useMemo } from "react";
import { useFormContext, useFormState } from "react-hook-form";
import { WorkItemType, useFetchIssueLazyQuery, useFetchPullRequestLazyQuery } from "src/__generated/graphql";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import Input from "src/components/FormInput";
import { useIntl } from "src/hooks/useIntl";
import Link from "src/icons/Link";
import {
  REGEX_VALID_GITHUB_ISSUE_URL,
  REGEX_VALID_GITHUB_PULL_REQUEST_URL,
  parseIssueLink,
  parsePullRequestLink,
} from "src/utils/github";
import {
  RewardableWorkItem,
  issueToWorkItem,
  pullRequestToWorkItem,
} from "src/pages/ProjectDetails/Rewards/RewardForm/WorkItemSidePanel/WorkItems/WorkItems";
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import { RewardableItem } from "src/api/Project/queries";

type Props = {
  projectId: string;
  type: WorkItemType;
  addWorkItem: (workItem: RewardableWorkItem) => void;
  contributorId: number;
};

export default function OtherIssueInput({ type, addWorkItem, contributorId }: Props) {
  const { T } = useIntl();
  const inputName = type === WorkItemType.Issue ? "otherIssueLink" : "otherPullRequestLink";
  const tKey = type === WorkItemType.Issue ? "issues" : "pullRequests";

  const [fetchIssue] = useFetchIssueLazyQuery({
    onCompleted: data => {
      if (data.fetchIssue) {
        // TODO dirty hack until we have a new REST endpoint with the RewardableItem shape
        addWorkItem(issueToWorkItem(liveIssueToCached(data.fetchIssue as unknown as RewardableItem)));
        resetField(inputName);
      } else {
        setError(inputName, {
          type: "validate",
          message: T(`reward.form.contributions.${tKey}.addOther.invalidLink`),
        });
      }
    },
    onError: () =>
      setError(inputName, {
        type: "validate",
        message: T(`reward.form.contributions.${tKey}.addOther.invalidLink`),
      }),
    context: {
      graphqlErrorDisplay: "none",
    },
  });

  const [fetchPullRequest] = useFetchPullRequestLazyQuery({
    onCompleted: data => {
      if (data.fetchPullRequest) {
        // TODO dirty hack until we have a new REST endpoint with the RewardableItem shape
        addWorkItem(pullRequestToWorkItem(data.fetchPullRequest.githubPullRequest as unknown as RewardableItem));
        resetField(inputName);
      } else {
        setError(inputName, {
          type: "validate",
          message: T(`reward.form.contributions.${tKey}.addOther.invalidLink`),
        });
      }
    },
    onError: () =>
      setError(inputName, {
        type: "validate",
        message: T(`reward.form.contributions.${tKey}.addOther.invalidLink`),
      }),
    context: {
      graphqlErrorDisplay: "none",
    },
  });

  const { watch, setError, resetField } = useFormContext();
  const { errors } = useFormState({ name: inputName });
  const otherIssueLink = watch(inputName);
  const error = errors[inputName];

  const { repoOwner, repoName, issueNumber } = useMemo(
    () => (type === WorkItemType.Issue ? parseIssueLink(otherIssueLink) : parsePullRequestLink(otherIssueLink)),
    [otherIssueLink]
  );

  const validateOtherIssue = () =>
    type === WorkItemType.Issue
      ? fetchIssue({
          variables: {
            repoOwner,
            repoName,
            issueNumber,
          },
        })
      : fetchPullRequest({
          variables: {
            repoOwner,
            repoName,
            prNumber: issueNumber,
            githubUserId: contributorId,
          },
        });

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-greyscale-50/12 p-4">
      <div className="font-walsheim text-base font-medium text-greyscale-50">
        {T(`reward.form.contributions.${tKey}.addOther.label`)}
      </div>

      <Input
        name={inputName}
        showValidationErrors={false}
        placeholder={T(`reward.form.contributions.${tKey}.addOther.placeholder`)}
        withMargin={false}
        options={{
          pattern: {
            value: type === WorkItemType.Issue ? REGEX_VALID_GITHUB_ISSUE_URL : REGEX_VALID_GITHUB_PULL_REQUEST_URL,
            message: T(`reward.form.contributions.${tKey}.addOther.notALink`),
          },
        }}
        inputClassName="pl-10"
        onKeyDown={event => event.key === "Enter" && validateOtherIssue()}
        prefixComponent={
          <div className="mt-0.5">
            <Link
              className={cn("text-xl", {
                "text-spaceBlue-200": !otherIssueLink,
                "text-greyscale-50": otherIssueLink && !error,
                "text-orange-500": error,
              })}
            />
          </div>
        }
        inputProps={{ autoFocus: true }}
      >
        <div onClick={validateOtherIssue} data-testid={`add-other-${tKey}-btn`}>
          <Button size={ButtonSize.LgLowHeight} type={ButtonType.Secondary} disabled={!otherIssueLink || !!error}>
            {T("reward.form.contributions.add")}
          </Button>
        </div>
      </Input>
      {error && (
        <div className="text-md text-orange-500">
          <ErrorWarningLine /> {error?.message?.toString()}
        </div>
      )}
    </div>
  );
}

type RewardableItemToCached = RewardableItem & {
  assigneeIds: number[];
  commentsCount: number;
};

export const liveIssueToCached = (issue: RewardableItem): RewardableItemToCached => ({
  ...issue,
  assigneeIds: [],
  commentsCount: 0,
});
