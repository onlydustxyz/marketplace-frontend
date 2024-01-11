import { useFormContext, useFormState } from "react-hook-form";

import {
  RewardableWorkItem,
  issueToWorkItem,
  pullRequestToWorkItem,
} from "src/_pages/ProjectDetails/Rewards/RewardForm/WorkItemSidePanel/WorkItems/WorkItems";
import ProjectApi from "src/api/Project";
import { RewardableItem } from "src/api/Project/queries";
import useMutationAlert from "src/api/useMutationAlert";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import Input from "src/components/FormInput";
import { Spinner } from "src/components/Spinner/Spinner";
import { useIntl } from "src/hooks/useIntl";
import ErrorWarningLine from "src/icons/ErrorWarningLine";
import Link from "src/icons/Link";
import { WorkItemType } from "src/types";
import { cn } from "src/utils/cn";
import { REGEX_VALID_GITHUB_ISSUE_URL, REGEX_VALID_GITHUB_PULL_REQUEST_URL } from "src/utils/github";

type Props = {
  projectId: string;
  type: WorkItemType;
  addWorkItem: (workItem: RewardableWorkItem) => void;
};

export default function OtherIssueInput({ type, addWorkItem, projectId }: Props) {
  const { T } = useIntl();
  const inputName = type === WorkItemType.Issue ? "otherIssueLink" : "otherPullRequestLink";
  const tKey = type === WorkItemType.Issue ? "issues" : "pullRequests";

  const { watch, setError, resetField } = useFormContext();
  const { errors } = useFormState({ name: inputName });
  const otherIssueLink = watch(inputName);
  const error = errors[inputName];

  const {
    mutate: createOtherPullRequest,
    isPending: isPendingPullRequestCreation,
    ...restcreateOtherPullRequestMutation
  } = ProjectApi.mutations.useCreateOtherPullRequest({
    params: { projectId },
    options: {
      onSuccess: data => {
        addWorkItem(pullRequestToWorkItem(data));
        resetField(inputName);
      },
      onError: () => {
        setError(inputName, {
          type: "validate",
          message: T(`reward.form.contributions.${tKey}.addOther.invalidLink`),
        });
      },
    },
  });

  useMutationAlert({
    mutation: restcreateOtherPullRequestMutation,
    success: {
      message: T("reward.form.contributions.other.contribution.success"),
    },
    error: {
      message: T("reward.form.contributions.other.contribution.error"),
    },
  });

  const {
    mutate: createOtherIssue,
    isPending: isPendingIssueCreation,
    ...restcreateOtherIssueMutation
  } = ProjectApi.mutations.useCreateOtherIssue({
    params: { projectId },
    options: {
      onSuccess: data => {
        addWorkItem(issueToWorkItem(liveIssueToCached(data)));
        resetField(inputName);
      },
      onError: () => {
        setError(inputName, {
          type: "validate",
          message: T(`reward.form.contributions.${tKey}.addOther.invalidLink`),
        });
      },
    },
  });

  useMutationAlert({
    mutation: restcreateOtherIssueMutation,
    success: {
      message: T("reward.form.contributions.other.contribution.success"),
    },
    error: {
      message: T("reward.form.contributions.other.contribution.error"),
    },
  });

  const validateOtherIssue = () => {
    type === WorkItemType.Issue
      ? createOtherIssue({ githubIssueHtmlUrl: otherIssueLink })
      : createOtherPullRequest({ githubPullRequestHtmlUrl: otherIssueLink });
  };

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
            {isPendingPullRequestCreation || isPendingIssueCreation ? (
              <Spinner className="mx-[0.125rem]" />
            ) : (
              T("reward.form.contributions.add")
            )}
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
